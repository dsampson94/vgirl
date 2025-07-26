import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get('conversationId')
    const limit = searchParams.get('limit') || '50'

    if (!conversationId) {
      return NextResponse.json({ error: 'conversationId is required' }, { status: 400 })
    }

    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        conversation: {
          select: {
            id: true,
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
        },
      },
      orderBy: { createdAt: 'asc' },
      take: parseInt(limit),
    })

    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { conversationId, sender, content } = await request.json()
    
    if (!['user', 'vgirl'].includes(sender)) {
      return NextResponse.json({ error: 'Invalid sender type' }, { status: 400 })
    }

    const message = await prisma.message.create({
      data: {
        conversationId,
        sender,
        content,
      },
      include: {
        conversation: {
          select: {
            id: true,
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
        },
      },
    })
    
    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 })
  }
}
