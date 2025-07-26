import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const vgirlId = searchParams.get('vgirlId')
    const maturity = searchParams.get('maturity')

    const where: any = {}
    if (vgirlId) where.vgirlId = vgirlId
    if (maturity) where.maturity = maturity

    const contentPacks = await prisma.contentPack.findMany({
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
        _count: {
          select: {
            purchases: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(contentPacks)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content packs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { 
      vgirlId, 
      title, 
      description, 
      priceCents, 
      downloadUrl, 
      coverImageUrl,
      maturity 
    } = await request.json()
    
    const contentPack = await prisma.contentPack.create({
      data: {
        vgirlId,
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
    
    return NextResponse.json(contentPack, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create content pack' }, { status: 500 })
  }
}
