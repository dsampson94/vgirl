import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
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
        sales: {
          select: {
            id: true,
            buyerId: true,
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
  { params }: { params: { id: string } }
) {
  try {
    const { 
      caption, 
      visibility, 
      isForSale, 
      priceCents,
      maturity 
    } = await request.json()
    
    const post = await prisma.post.update({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    await prisma.post.delete({
      where: { id: params.id },
    })
    
    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
