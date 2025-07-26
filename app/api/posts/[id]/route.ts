import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        vgirl: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            owner: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
        purchases: {
          select: {
            id: true,
            userId: true,
            priceCents: true,
            createdAt: true,
          },
        },
      },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { 
      caption, 
      visibility, 
      isForSale, 
      priceCents,
      maturity 
    } = await request.json()
    
    const post = await prisma.post.update({
      where: { id },
      data: {
        caption,
        visibility,
        isForSale,
        priceCents,
        maturity,
      },
      include: {
        vgirl: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            owner: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    })
    
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.post.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
