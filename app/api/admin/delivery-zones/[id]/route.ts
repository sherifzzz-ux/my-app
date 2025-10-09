/**
 * Admin Single Delivery Zone API Route
 * PATCH - Update a delivery zone
 * DELETE - Delete a delivery zone
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await context.params
    const body = await req.json()
    const { name, ville, isActive, order } = body

    const zone = await prisma.deliveryZone.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(ville && { ville }),
        ...(isActive !== undefined && { isActive }),
        ...(order !== undefined && { order }),
      },
    })

    return NextResponse.json(zone)
  } catch (error) {
    console.error('Error updating delivery zone:', error)
    return NextResponse.json(
      { error: 'Failed to update delivery zone' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await context.params

    await prisma.deliveryZone.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting delivery zone:', error)
    return NextResponse.json(
      { error: 'Failed to delete delivery zone' },
      { status: 500 }
    )
  }
}
