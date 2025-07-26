import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const vgirl = await prisma.vGirl.findUnique({
      where: { id: params.id },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
          },
        },
        posts: {
          select: {
            id: true,
            caption: true,
            mediaUrl: true,
            contentType: true,
            maturity: true,
            visibility: true,
            isForSale: true,
            priceCents: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        },
        contentPacks: {
          select: {
            id: true,
            title: true,
            description: true,
            priceCents: true,
            coverImageUrl: true,
            maturity: true,
            createdAt: true,
          },
        },
        _count: {
          select: {
            posts: true,
            subscribers: true,
          },
        },
      },
    })

    if (!vgirl) {
      return NextResponse.json({ error: 'VGirl not found' }, { status: 404 })
    }

    return NextResponse.json(vgirl)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch VGirl' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { 
      name, 
      bio, 
      avatarUrl, 
      personality, 
      tags, 
      maturity, 
      isFeatured 
    } = await request.json()
    
    const vgirl = await prisma.vGirl.update({
      where: { id: params.id },
      data: {
        name,
        bio,
        avatarUrl,
        personality,
        tags,
        maturity,
        isFeatured,
      },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    })
    
    return NextResponse.json(vgirl)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update VGirl' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.vGirl.delete({
      where: { id: params.id },
    })
    
    return NextResponse.json({ message: 'VGirl deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete VGirl' }, { status: 500 })
  }
}
