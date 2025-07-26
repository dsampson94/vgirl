import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const vgirlId = searchParams.get('vgirlId')

    const where: any = {}
    if (userId) where.userId = userId
    if (vgirlId) where.vgirlId = vgirlId

    const conversations = await prisma.conversation.findMany({
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
        messages: {
          select: {
            id: true,
            sender: true,
            content: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(conversations)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, vgirlId } = await request.json()
    
    // Check if conversation already exists
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        userId,
        vgirlId,
      },
    })

    if (existingConversation) {
      return NextResponse.json(existingConversation)
    }

    const conversation = await prisma.conversation.create({
      data: {
        userId,
        vgirlId,
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
    
    return NextResponse.json(conversation, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 })
  }
}
