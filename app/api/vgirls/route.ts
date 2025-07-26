import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ownerId = searchParams.get('ownerId')
    const featured = searchParams.get('featured')
    const maturity = searchParams.get('maturity')

    const where: any = {}
    if (ownerId) where.ownerId = ownerId
    if (featured === 'true') where.isFeatured = true
    if (maturity) where.maturity = maturity

    const vgirls = await prisma.vGirl.findMany({
      where,
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
            mediaUrl: true,
            contentType: true,
            maturity: true,
            visibility: true,
            createdAt: true,
          },
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            posts: true,
            subscribers: true,
          },
        },
      },
      orderBy: { popularity: 'desc' },
    })

    return NextResponse.json(vgirls)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch VGirls' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { 
      ownerId, 
      name, 
      bio, 
      avatarUrl, 
      personality, 
      tags, 
      creationCostCents, 
      maturity 
    } = await request.json()
    
    const vgirl = await prisma.vGirl.create({
      data: {
        ownerId,
        name,
        bio,
        avatarUrl,
        personality,
        tags: tags || [],
        creationCostCents,
        maturity: maturity || 'SAFE',
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
    
    return NextResponse.json(vgirl, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create VGirl' }, { status: 500 })
  }
}
