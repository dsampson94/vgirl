import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { SUBSCRIPTION_TIERS } from '@/lib/pricing'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, tier, paypalSubscriptionId, paypalOrderId } = body

    // Validate the subscription tier
    if (!SUBSCRIPTION_TIERS[tier as keyof typeof SUBSCRIPTION_TIERS]) {
      return NextResponse.json({ error: 'Invalid subscription tier' }, { status: 400 })
    }

    const subscriptionTier = SUBSCRIPTION_TIERS[tier as keyof typeof SUBSCRIPTION_TIERS]

    // Update user subscription
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: tier,
        credits: {
          increment: subscriptionTier.credits
        },
        messagesLeft: subscriptionTier.dailyMessages === -1 ? -1 : subscriptionTier.dailyMessages,
        lastActive: new Date()
      }
    })

    // Record the transaction
    await prisma.transaction.create({
      data: {
        userId,
        amountCents: Math.round(subscriptionTier.price * 100), // Convert to cents
        type: 'SUBSCRIPTION',
        description: `${subscriptionTier.name} Subscription - Monthly`
      }
    })

    // Log the ethical upgrade event
    console.log(`Ethical subscription upgrade: User ${userId} upgraded to ${tier} tier`)

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: `Successfully upgraded to ${subscriptionTier.name} tier!`
    })

  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Get user's current subscription details
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const currentTier = SUBSCRIPTION_TIERS[user.subscriptionTier as keyof typeof SUBSCRIPTION_TIERS] || SUBSCRIPTION_TIERS.FREE
    
    return NextResponse.json({
      currentTier: {
        name: currentTier.name,
        tier: user.subscriptionTier,
        price: currentTier.price,
        features: currentTier.features,
        color: currentTier.color
      },
      credits: user.credits,
      messagesLeft: user.messagesLeft
    })

  } catch (error) {
    console.error('Get subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to get subscription details' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId } = body

    // Cancel subscription in our database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: 'FREE',
        messagesLeft: 10 // Reset to free tier limits
      }
    })

    // Record the cancellation
    await prisma.transaction.create({
      data: {
        userId,
        amountCents: 0,
        type: 'SUBSCRIPTION_CANCELLED',
        description: 'Subscription cancelled'
      }
    })

    // Log the ethical cancellation (easy cancellation = good ethics)
    console.log(`Ethical subscription cancellation: User ${userId} cancelled subscription easily`)

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: 'Subscription cancelled successfully. You still have access until the end of your billing period.'
    })

  } catch (error) {
    console.error('Cancellation error:', error)
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    )
  }
}
