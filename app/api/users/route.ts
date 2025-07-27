import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        credits: true,
        balanceCents: true,
        bio: true,
        country: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, username, passwordHash, role, bio, country } = await request.json()
    
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: passwordHash,
        role: role || 'USER',
        bio,
        country,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        credits: true,
        balanceCents: true,
        bio: true,
        country: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
