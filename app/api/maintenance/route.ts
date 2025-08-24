import { NextResponse } from 'next/server'
import { createServiceSupabaseClient } from '@/lib/supabase'

export const runtime = 'nodejs'

export async function GET() {
  const supabase = createServiceSupabaseClient()
  try {
    const { data } = await supabase.from('site_settings').select('maintenance_mode').limit(1)
    const maintenance = !!(data && data[0] && (data[0] as any).maintenance_mode)
    return NextResponse.json({ maintenance })
  } catch {
    return NextResponse.json({ maintenance: false })
  }
}


