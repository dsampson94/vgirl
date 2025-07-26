import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: params.id },
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
            personality: true,
          },
        },
        messages: {
          select: {
            id: true,
            sender: true,
            content: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 })
    }

    return NextResponse.json(conversation)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch conversation' }, { status: 500 })
  }
}
