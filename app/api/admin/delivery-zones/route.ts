/**
 * Admin Delivery Zones API Route
 * GET - List all delivery zones
 * POST - Create a new delivery zone
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/server/auth'

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const zones = await prisma.deliveryZone.findMany({
      orderBy: [
        { order: 'asc' },
        { name: 'asc' },
      ],
    })

    return NextResponse.json(zones)
  } catch (error) {
    console.error('Error fetching delivery zones:', error)
    return NextResponse.json(
      { error: 'Failed to fetch delivery zones' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { name, ville, isActive, order } = body

    if (!name || !ville) {
      return NextResponse.json(
        { error: 'Name and ville are required' },
        { status: 400 }
      )
    }

    const zone = await prisma.deliveryZone.create({
      data: {
        name,
        ville,
        isActive: isActive ?? true,
        order: order ?? 0,
      },
    })

    return NextResponse.json(zone)
  } catch (error) {
    console.error('Error creating delivery zone:', error)
    return NextResponse.json(
      { error: 'Failed to create delivery zone' },
      { status: 500 }
    )
  }
}
