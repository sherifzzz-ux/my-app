'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Camera, 
  Save, 
  Edit3,
  Shield,
  Bell,
  Globe,
  Lock
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function ClientDetailsForm({
  initialName,
  email,
}: {
  initialName: string
  email: string
}) {
  const [name, setName] = useState(initialName)
  const [firstName, setFirstName] = useState(initialName.split(' ')[0] || '')
  const [lastName, setLastName] = useState(initialName.split(' ').slice(1).join(' ') || '')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('France')
  const [birthDate, setBirthDate] = useState('')
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)
  const { toast } = useToast()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    
    try {
      const res = await fetch('/api/account/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: `${firstName} ${lastName}`.trim(),
          firstName,
          lastName,
          phone,
          address,
          city,
          postalCode,
          country,
          birthDate
        }),
      })
      
      const data = await res.json()
      
      if (!res.ok) throw new Error(data?.error || 'Erreur lors de la sauvegarde')
      
      toast({
        title: "Succès !",
        description: "Votre profil a été mis à jour avec succès.",
        variant: "default",
      })
      
      setEditing(false)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inattendue'
      toast({
        title: "Erreur",
        description: message,
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* En-tête du profil */}
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                  {firstName.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="secondary"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <CardTitle className="text-2xl">Profil personnel</CardTitle>
          <CardDescription>
            Gérez vos informations personnelles et vos préférences
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Formulaire principal */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Informations personnelles
              </CardTitle>
              <CardDescription>
                Vos informations de base et coordonnées
              </CardDescription>
            </div>
            <Button
              variant={editing ? "outline" : "default"}
              onClick={() => setEditing(!editing)}
              disabled={saving}
            >
              {editing ? (
                <>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Annuler
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Modifier
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Informations de base */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={!editing}
                  placeholder="Votre prénom"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={!editing}
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="email"
                    value={email}
                    disabled
                    className="bg-muted"
                  />
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Shield className="w-3 h-3 mr-1" />
                    Vérifié
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!editing}
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthDate">Date de naissance</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  disabled={!editing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Pays</Label>
                <Input
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  disabled={!editing}
                  placeholder="France"
                />
              </div>
            </div>

            <Separator />

            {/* Adresse */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!editing}
                  placeholder="123 Rue de la Paix"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={!editing}
                    placeholder="Paris"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Code postal</Label>
                  <Input
                    id="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    disabled={!editing}
                    placeholder="75001"
                  />
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            {editing && (
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditing(false)}
                  disabled={saving}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <>
                      <Save className="w-4 h-4 mr-2 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Enregistrer
                    </>
                  )}
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Préférences et sécurité */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Préférences de communication
            </CardTitle>
            <CardDescription>
              Gérez vos notifications et préférences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Emails promotionnels</p>
                <p className="text-sm text-muted-foreground">Recevoir des offres spéciales</p>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                Activé
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notifications push</p>
                <p className="text-sm text-muted-foreground">Suivi des commandes</p>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                Activé
              </Badge>
            </div>
            <Button variant="outline" className="w-full">
              Gérer les préférences
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Sécurité du compte
            </CardTitle>
            <CardDescription>
              Protégez votre compte et vos données
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Authentification 2FA</p>
                <p className="text-sm text-muted-foreground">Double vérification</p>
              </div>
              <Badge variant="outline" className="bg-orange-100 text-orange-800">
                Non activé
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dernière connexion</p>
                <p className="text-sm text-muted-foreground">Aujourd'hui à 14:30</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Gérer la sécurité
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
