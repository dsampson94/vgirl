import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const contentPack = await prisma.contentPack.findUnique({
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

    if (!contentPack) {
      return NextResponse.json({ error: 'Content pack not found' }, { status: 404 })
    }

    return NextResponse.json(contentPack)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content pack' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { 
      title, 
      description, 
      priceCents, 
      downloadUrl, 
      coverImageUrl,
      maturity 
    } = await request.json()
    
    const contentPack = await prisma.contentPack.update({
      where: { id },
      data: {
        title,
        description,
        priceCents,
        downloadUrl,
        coverImageUrl,
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
    
    return NextResponse.json(contentPack)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update content pack' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.contentPack.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: 'Content pack deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete content pack' }, { status: 500 })
  }
}
