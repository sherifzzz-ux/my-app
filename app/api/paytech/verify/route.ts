/**
 * PayTech Payment Verification API Route
 * Verifies payment status with PayTech
 */

import { NextRequest, NextResponse } from 'next/server'
import { verifyPaytechPayment } from '@/lib/paytech/api'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      )
    }

    // Vérifier le paiement avec PayTech
    const result = await verifyPaytechPayment(token)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      {
        error: 'Failed to verify payment',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
