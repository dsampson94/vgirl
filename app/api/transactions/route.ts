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
    const { 
      userId, 
      type, 
      amountCents, 
      description
    } = await request.json()
    
    const transaction = await prisma.transaction.create({
      data: {
        userId,
        type,
        amountCents,
        description,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    })
    
    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 })
  }
}
