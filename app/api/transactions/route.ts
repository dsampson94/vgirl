import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const type = searchParams.get('type')
    const limit = searchParams.get('limit') || '50'

    const where: any = {}
    if (userId) where.userId = userId
    if (type) where.type = type

    const transactions = await prisma.transaction.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
    })

    return NextResponse.json(transactions)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, amount, credits, paypalOrderId, type } = body

    // Validate required fields
    if (!userId || !amount || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create transaction record
    const transaction = await prisma.transaction.create({
      data: {
        userId,
        type,
        amountCents: Math.round(amount * 100), // Convert to cents
        description: paypalOrderId ? `PayPal Order: ${paypalOrderId}` : `${type} transaction`
      }
    })

    // If this is a credit purchase, update user credits
    if (type === 'CREDIT_PURCHASE' && credits) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          credits: {
            increment: credits
          }
        }
      })
    }

    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.error('Error creating transaction:', error)
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    )
  }
}
