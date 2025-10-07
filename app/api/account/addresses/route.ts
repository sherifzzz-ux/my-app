import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const supabase = createServiceSupabaseClient()
    
    // Récupérer toutes les adresses de l'utilisateur
    const { data: addresses, error } = await supabase
      .from('user_addresses' as any)
      .select('*')
      .eq('userId', session.user.id)
      .order('isDefault', { ascending: false })
      .order('createdAt', { ascending: false })

    if (error) {
      console.error('Erreur lors de la récupération des adresses:', error)
      return NextResponse.json({ 
        error: 'Erreur lors de la récupération des adresses' 
      }, { status: 500 })
    }

    return NextResponse.json(addresses || [])
  } catch (error) {
    console.error('Erreur inattendue:', error)
    return NextResponse.json({ 
      error: 'Erreur inattendue' 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      type, 
      first_name, 
      last_name, 
      company, 
      address_line1, 
      address_line2, 
      city, 
      postal_code, 
      country, 
      phone, 
      is_default 
    } = body

    // Validation des données
    if (!type || !first_name || !last_name || !address_line1 || !city || !postal_code || !country) {
      return NextResponse.json({ 
        error: 'Tous les champs obligatoires doivent être remplis' 
      }, { status: 400 })
    }

    const supabase = createServiceSupabaseClient()
    
    // Si c'est l'adresse par défaut, désactiver les autres
    if (is_default) {
      await supabase
        .from('user_addresses' as any)
        .update({ isDefault: false })
        .eq('userId', session.user.id)
    }

    // Créer la nouvelle adresse
    const { data: newAddress, error } = await supabase
      .from('user_addresses' as any)
      .insert({
        userId: session.user.id,
        name: `${first_name} ${last_name}`,
        phone: phone || '',
        city,
        addressLine1: address_line1,
        addressLine2: address_line2 || '',
        isDefault: is_default || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Erreur lors de la création de l\'adresse:', error)
      return NextResponse.json({ 
        error: 'Erreur lors de la création de l\'adresse' 
      }, { status: 500 })
    }

    return NextResponse.json(newAddress)
  } catch (error) {
    console.error('Erreur inattendue:', error)
    return NextResponse.json({ 
      error: 'Erreur inattendue' 
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      id,
      type, 
      first_name, 
      last_name, 
      company, 
      address_line1, 
      address_line2, 
      city, 
      postal_code, 
      country, 
      phone, 
      is_default 
    } = body

    if (!id) {
      return NextResponse.json({ 
        error: 'ID de l\'adresse requis' 
      }, { status: 400 })
    }

    const supabase = createServiceSupabaseClient()
    
    // Vérifier que l'adresse appartient à l'utilisateur
    const { data: existingAddress } = await supabase
      .from('user_addresses' as any)
      .select('id')
      .eq('id', id)
      .eq('userId', session.user.id)
      .single()

    if (!existingAddress) {
      return NextResponse.json({ 
        error: 'Adresse non trouvée' 
      }, { status: 404 })
    }

    // Si c'est l'adresse par défaut, désactiver les autres
    if (is_default) {
      await supabase
        .from('user_addresses' as any)
        .update({ is_default: false })
        .eq('userId', session.user.id)
        .neq('id', id)
    }

    // Mettre à jour l'adresse
    const { data: updatedAddress, error } = await supabase
      .from('user_addresses' as any)
      .update({
        name: `${first_name} ${last_name}`,
        phone: phone || '',
        city,
        addressLine1: address_line1,
        addressLine2: address_line2 || '',
        isDefault: is_default || false,
        updatedAt: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Erreur lors de la mise à jour de l\'adresse:', error)
      return NextResponse.json({ 
        error: 'Erreur lors de la mise à jour de l\'adresse' 
      }, { status: 500 })
    }

    return NextResponse.json(updatedAddress)
  } catch (error) {
    console.error('Erreur inattendue:', error)
    return NextResponse.json({ 
      error: 'Erreur inattendue' 
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const addressId = searchParams.get('id')
    
    if (!addressId) {
      return NextResponse.json({ 
        error: 'ID de l\'adresse requis' 
      }, { status: 400 })
    }

    const supabase = createServiceSupabaseClient()
    
    // Vérifier que l'adresse appartient à l'utilisateur
    const { data: existingAddress } = await supabase
      .from('user_addresses' as any)
      .select('id, isDefault')
      .eq('id', addressId)
      .eq('userId', session.user.id)
      .single()

    if (!existingAddress) {
      return NextResponse.json({ 
        error: 'Adresse non trouvée' 
      }, { status: 404 })
    }

    // Supprimer l'adresse
    const { error } = await supabase
      .from('user_addresses' as any)
      .delete()
      .eq('id', addressId)

    if (error) {
      console.error('Erreur lors de la suppression de l\'adresse:', error)
      return NextResponse.json({ 
        error: 'Erreur lors de la suppression de l\'adresse' 
      }, { status: 500 })
    }

    // Si c'était l'adresse par défaut, définir une autre comme défaut
    if (existingAddress && 'isDefault' in existingAddress && existingAddress.isDefault) {
      const { data: newDefaultAddress } = await supabase
        .from('user_addresses' as any)
        .select('id')
        .eq('userId', session.user.id)
        .limit(1)
        .single()

      if (newDefaultAddress && 'id' in newDefaultAddress) {
        await supabase
          .from('user_addresses' as any)
          .update({ isDefault: true })
          .eq('id', newDefaultAddress.id)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur inattendue:', error)
    return NextResponse.json({ 
      error: 'Erreur inattendue' 
    }, { status: 500 })
  }
}
