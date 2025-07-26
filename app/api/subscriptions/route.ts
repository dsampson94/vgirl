import { NextRequest, NextResponse } from '    const { 
      userId, 
      vgirlId, 
      tier,
      priceCents, 
      creatorCutCents, 
      appCutCents, 
      renewsAt 
    } = await request.json()
    
    const subscription = await prisma.subscription.create({
      data: {
        userId,
        vgirlId,
        tier,
        priceCents,
        creatorCutCents,
        appCutCents,
        renewsAt: new Date(renewsAt),
      },rt { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const vgirlId = searchParams.get('vgirlId')
    const active = searchParams.get('active')

    const where: any = {}
    if (userId) where.userId = userId
    if (vgirlId) where.vgirlId = vgirlId
    if (active !== null) where.active = active === 'true'

    const subscriptions = await prisma.subscription.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        vgirl: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { startedAt: 'desc' },
    })

    return NextResponse.json(subscriptions)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { 
      userId, 
      vgirlId, 
      priceCents, 
      creatorCutCents, 
      appCutCents,
      renewsAt 
    } = await request.json()
    
    const subscription = await prisma.subscription.create({
      data: {
        userId,
        vgirlId,
        priceCents,
        creatorCutCents,
        appCutCents,
        renewsAt: new Date(renewsAt),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        vgirl: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    })
    
    return NextResponse.json(subscription, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 })
  }
}
