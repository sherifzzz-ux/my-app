import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

export const GET = handler.handlers.GET
export const POST = handler.handlers.POST
export const runtime = 'nodejs'
