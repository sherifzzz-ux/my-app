import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const supabase = createServiceSupabaseClient()
    
    // Récupérer le profil utilisateur depuis la base de données
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Erreur lors de la récupération du profil:', error)
      return NextResponse.json({ 
        error: 'Erreur lors de la récupération du profil' 
      }, { status: 500 })
    }

    // Si pas de profil, créer un profil de base
    if (!profile) {
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert({
          id: session.user.id,
          email: session.user.email,
          name: session.user.name || '',
          first_name: session.user.name?.split(' ')[0] || '',
          last_name: session.user.name?.split(' ').slice(1).join(' ') || '',
          avatar_url: session.user.image,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (createError) {
        console.error('Erreur lors de la création du profil:', createError)
        return NextResponse.json({ 
          error: 'Erreur lors de la création du profil' 
        }, { status: 500 })
      }

      return NextResponse.json(newProfile)
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Erreur inattendue:', error)
    return NextResponse.json({ 
      error: 'Erreur inattendue' 
    }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await request.json()
    const { name, first_name, last_name, phone, address, city, postal_code, country, birth_date } = body

    // Validation des données
    if (!name || !first_name || !last_name) {
      return NextResponse.json({ 
        error: 'Nom, prénom et nom de famille sont requis' 
      }, { status: 400 })
    }

    const supabase = createServiceSupabaseClient()
    
    // Mettre à jour le profil
    const { data: updatedProfile, error } = await supabase
      .from('profiles')
      .upsert({
        id: session.user.id,
        email: session.user.email,
        name,
        first_name,
        last_name,
        phone: phone || null,
        address: address || null,
        city: city || null,
        postal_code: postal_code || null,
        country: country || 'France',
        birth_date: birth_date || null,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Erreur lors de la mise à jour du profil:', error)
      return NextResponse.json({ 
        error: 'Erreur lors de la mise à jour du profil' 
      }, { status: 500 })
    }

    return NextResponse.json(updatedProfile)
  } catch (error) {
    console.error('Erreur inattendue:', error)
    return NextResponse.json({ 
      error: 'Erreur inattendue' 
    }, { status: 500 })
  }
}
