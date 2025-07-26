import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        credits: true,
        balanceCents: true,
        isVerified: true,
        bio: true,
        country: true,
        createdAt: true,
        updatedAt: true,
        vGirls: {
          select: {
            id: true,
            name: true,
            bio: true,
            avatarUrl: true,
            maturity: true,
            popularity: true,
            isFeatured: true,
            createdAt: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { username, bio, country, credits, balanceCents } = await request.json()
    
    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        username,
        bio,
        country,
        credits,
        balanceCents,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        credits: true,
        balanceCents: true,
        isVerified: true,
        bio: true,
        country: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.user.delete({
      where: { id: params.id },
    })
    
    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
