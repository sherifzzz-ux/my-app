'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import { Textarea } from './textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Checkbox } from './checkbox'
import { RadioGroup, RadioGroupItem } from './radio-group'
import { FormField } from './form-field'
import { Alert, AlertDescription } from './alert'
import { Badge } from './badge'
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react'

export function FormValidationDemo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    category: '',
    newsletter: false,
    gender: '',
    rating: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateField = (name: string, value: string | boolean) => {
    const newErrors = { ...errors }
    
    switch (name) {
      case 'name':
        if (!value || (typeof value === 'string' && value.length < 2)) {
          newErrors.name = 'Le nom doit contenir au moins 2 caractères'
        } else {
          delete newErrors.name
        }
        break
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value || (typeof value === 'string' && !emailRegex.test(value))) {
          newErrors.email = 'Veuillez entrer une adresse email valide'
        } else {
          delete newErrors.email
        }
        break
      case 'phone':
        const phoneRegex = /^[0-9+\-\s()]+$/
        if (value && typeof value === 'string' && !phoneRegex.test(value)) {
          newErrors.phone = 'Format de téléphone invalide'
        } else {
          delete newErrors.phone
        }
        break
      case 'message':
        if (!value || (typeof value === 'string' && value.length < 10)) {
          newErrors.message = 'Le message doit contenir au moins 10 caractères'
        } else {
          delete newErrors.message
        }
        break
      case 'category':
        if (!value) {
          newErrors.category = 'Veuillez sélectionner une catégorie'
        } else {
          delete newErrors.category
        }
        break
      case 'gender':
        if (!value) {
          newErrors.gender = 'Veuillez sélectionner votre genre'
        } else {
          delete newErrors.gender
        }
        break
    }
    
    setErrors(newErrors)
  }

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Validation complète
    const requiredFields = ['name', 'email', 'message', 'category', 'gender']
    const newErrors: Record<string, string> = {}
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = 'Ce champ est requis'
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    // Simulation d'envoi
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        category: '',
        newsletter: false,
        gender: '',
        rating: ''
      })
      setErrors({})
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFieldState = (fieldName: string) => {
    if (errors[fieldName]) return 'error'
    if (formData[fieldName as keyof typeof formData] && !errors[fieldName]) return 'success'
    return 'default'
  }

  return (
    <div className="space-y-8">
      {/* Formulaire principal */}
      <Card>
        <CardHeader>
          <CardTitle>📝 Formulaire avec Validation Visuelle</CardTitle>
          <CardDescription>
            Démonstration des composants de formulaire avec validation en temps réel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom */}
            <FormField
              label="Nom complet"
              required
              state={getFieldState('name')}
              error={errors.name}
              success={formData.name && !errors.name ? 'Nom valide' : undefined}
            >
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Votre nom complet"
                className="focus-ring"
              />
            </FormField>

            {/* Email */}
            <FormField
              label="Adresse email"
              required
              state={getFieldState('email')}
              error={errors.email}
              success={formData.email && !errors.email ? 'Email valide' : undefined}
            >
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="votre@email.com"
                className="focus-ring"
              />
            </FormField>

            {/* Téléphone */}
            <FormField
              label="Téléphone (optionnel)"
              state={getFieldState('phone')}
              error={errors.phone}
              helper="Format: +33 1 23 45 67 89"
            >
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+33 1 23 45 67 89"
                className="focus-ring"
              />
            </FormField>

            {/* Catégorie */}
            <FormField
              label="Catégorie"
              required
              state={getFieldState('category')}
              error={errors.category}
              success={formData.category && !errors.category ? 'Catégorie sélectionnée' : undefined}
            >
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger className="focus-ring">
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="soins-visage">Soins du visage</SelectItem>
                  <SelectItem value="maquillage">Maquillage</SelectItem>
                  <SelectItem value="cheveux">Cheveux</SelectItem>
                  <SelectItem value="parfums">Parfums</SelectItem>
                  <SelectItem value="corps-bain">Corps & Bain</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            {/* Genre */}
            <FormField
              label="Genre"
              required
              state={getFieldState('gender')}
              error={errors.gender}
              success={formData.gender && !errors.gender ? 'Genre sélectionné' : undefined}
            >
              <RadioGroup value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="femme" id="femme" />
                  <Label htmlFor="femme">Femme</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="homme" id="homme" />
                  <Label htmlFor="homme">Homme</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="autre" id="autre" />
                  <Label htmlFor="autre">Autre</Label>
                </div>
              </RadioGroup>
            </FormField>

            {/* Message */}
            <FormField
              label="Message"
              required
              state={getFieldState('message')}
              error={errors.message}
              success={formData.message && !errors.message ? 'Message valide' : undefined}
              helper="Décrivez votre demande en détail"
            >
              <Textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Votre message..."
                rows={4}
                className="focus-ring"
              />
            </FormField>

            {/* Newsletter */}
            <FormField
              label="Newsletter"
              helper="Recevez nos dernières offres et nouveautés"
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => handleInputChange('newsletter', checked as boolean)}
                />
                <Label htmlFor="newsletter">Je souhaite recevoir la newsletter</Label>
              </div>
            </FormField>

            {/* Bouton de soumission */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {Object.keys(errors).length > 0 && (
                  <Badge variant="destructive">
                    {Object.keys(errors).length} erreur(s)
                  </Badge>
                )}
                {Object.keys(formData).filter(key => formData[key as keyof typeof formData]).length > 0 && (
                  <Badge variant="secondary">
                    {Object.keys(formData).filter(key => formData[key as keyof typeof formData]).length} champ(s) rempli(s)
                  </Badge>
                )}
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting || Object.keys(errors).length > 0}
                className="hover-scale focus-ring"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  'Envoyer le formulaire'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* États de validation */}
      <Card>
        <CardHeader>
          <CardTitle>✅ États de Validation</CardTitle>
          <CardDescription>
            Différents états visuels pour la validation des formulaires
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {submitStatus === 'success' && (
            <Alert className="border-success bg-success/10">
              <CheckCircle className="h-4 w-4 text-success" />
              <AlertDescription className="text-success">
                Formulaire envoyé avec succès ! Merci pour votre message.
              </AlertDescription>
            </Alert>
          )}

          {submitStatus === 'error' && (
            <Alert className="border-destructive bg-destructive/10">
              <XCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive">
                Une erreur est survenue lors de l'envoi. Veuillez réessayer.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Alert>
              <CheckCircle className="h-4 w-4 text-success" />
              <AlertDescription>
                État de succès - Champ valide
              </AlertDescription>
            </Alert>
            <Alert className="border-destructive bg-destructive/10">
              <XCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive">
                État d'erreur - Champ invalide
              </AlertDescription>
            </Alert>
            <Alert className="border-accent bg-accent/10">
              <AlertCircle className="h-4 w-4 text-accent" />
              <AlertDescription className="text-accent">
                État d'avertissement - Attention requise
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
