import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const vgirlId = searchParams.get('vgirlId')
    const contentType = searchParams.get('contentType')
    const maturity = searchParams.get('maturity')
    const visibility = searchParams.get('visibility')
    const limit = searchParams.get('limit') || '20'

    const where: any = {}
    if (vgirlId) where.vgirlId = vgirlId
    if (contentType) where.contentType = contentType
    if (maturity) where.maturity = maturity
    if (visibility) where.visibility = visibility

    const posts = await prisma.post.findMany({
      where,
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
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
    })

    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { 
      vgirlId, 
      caption, 
      mediaUrl, 
      promptUsed,
      contentType, 
      maturity, 
      visibility, 
      isForSale, 
      priceCents 
    } = await request.json()
    
    const post = await prisma.post.create({
      data: {
        vgirlId,
        caption,
        mediaUrl,
        promptUsed,
        contentType,
        visibility: visibility || 'PUBLIC',
        isForSale: isForSale || false,
        priceCents,
        maturity: maturity || 'SFW',
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
    
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
