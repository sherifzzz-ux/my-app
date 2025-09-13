'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Shield, 
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    acceptTerms: false
  })
  
  const router = useRouter()
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulation de connexion (à remplacer par votre logique d'authentification)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue ! Vous allez être redirigé vers votre espace personnel.",
        variant: "default",
      })

      // Redirection vers la page compte après connexion
      setTimeout(() => {
        router.push('/account')
      }, 1500)

    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect.",
        variant: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur de validation",
        description: "Les mots de passe ne correspondent pas.",
        variant: "error",
      })
      return
    }

    if (!formData.acceptTerms) {
      toast({
        title: "Conditions requises",
        description: "Vous devez accepter les conditions d'utilisation.",
        variant: "error",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulation d'inscription (à remplacer par votre logique d'inscription)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.",
        variant: "default",
      })

      // Basculer vers l'onglet de connexion
      setActiveTab('login')
      setFormData({
        email: formData.email,
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        acceptTerms: false
      })

    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: "Impossible de créer votre compte. Veuillez réessayer.",
        variant: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToHome = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header avec bouton retour */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBackToHome}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Informations et avantages */}
          <div className="lg:w-1/2 space-y-6">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Rejoignez Flawless Beauty
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Créez votre compte pour accéder à votre espace personnel et profiter de nos services exclusifs.
              </p>
            </div>

            {/* Avantages */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <CheckCircle className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Suivi des commandes</h3>
                  <p className="text-sm text-muted-foreground">Suivez vos commandes en temps réel</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-foreground">Sécurité garantie</h3>
                  <p className="text-sm text-muted-foreground">Vos données sont protégées</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-purple-50 border border-purple-200">
                <User className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="font-semibold text-foreground">Profil personnalisé</h3>
                  <p className="text-sm text-muted-foreground">Gérez vos préférences et adresses</p>
                </div>
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Clients satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support client</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Sécurisé</div>
              </div>
            </div>
          </div>

          {/* Formulaire de connexion/inscription */}
          <div className="lg:w-1/2 w-full max-w-md mx-auto">
            <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-sm">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Accès à votre espace</CardTitle>
                  <CardDescription>
                    Connectez-vous ou créez votre compte
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Connexion</TabsTrigger>
                    <TabsTrigger value="register">Inscription</TabsTrigger>
                  </TabsList>

                  {/* Onglet Connexion */}
                  <TabsContent value="login" className="mt-6 space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="votre@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password">Mot de passe</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="login-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Votre mot de passe"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="pl-10 pr-10"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="remember-me"
                            className="rounded border-gray-300"
                            title="Se souvenir de moi"
                            aria-label="Se souvenir de moi"
                          />
                          <Label htmlFor="remember-me" className="text-sm">
                            Se souvenir de moi
                          </Label>
                        </div>
                        <Button variant="link" className="text-sm p-0 h-auto">
                          Mot de passe oublié ?
                        </Button>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Connexion...
                          </div>
                        ) : (
                          'Se connecter'
                        )}
                      </Button>
                    </form>

                    <Separator className="my-6" />

                    {/* Connexion sociale */}
                    <div className="space-y-3">
                      <p className="text-center text-sm text-muted-foreground">
                        Ou connectez-vous avec
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="w-full">
                          <div className="w-5 h-5 bg-blue-600 rounded mr-2"></div>
                          Facebook
                        </Button>
                        <Button variant="outline" className="w-full">
                          <div className="w-5 h-5 bg-red-600 rounded mr-2"></div>
                          Google
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Onglet Inscription */}
                  <TabsContent value="register" className="mt-6 space-y-4">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="register-firstname">Prénom</Label>
                          <Input
                            id="register-firstname"
                            type="text"
                            placeholder="Prénom"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-lastname">Nom</Label>
                          <Input
                            id="register-lastname"
                            type="text"
                            placeholder="Nom"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="votre@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-password">Mot de passe</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="register-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Créez un mot de passe"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="pl-10 pr-10"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-confirm-password">Confirmer le mot de passe</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="register-confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirmez votre mot de passe"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className="pl-10 pr-10"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="accept-terms"
                          checked={formData.acceptTerms}
                          onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                          className="rounded border-gray-300"
                          title="Accepter les conditions d'utilisation et la politique de confidentialité"
                          aria-label="Accepter les conditions d'utilisation et la politique de confidentialité"
                          required
                        />
                        <Label htmlFor="accept-terms" className="text-sm">
                          J'accepte les{' '}
                          <Button variant="link" className="text-sm p-0 h-auto">
                            conditions d'utilisation
                          </Button>
                          {' '}et la{' '}
                          <Button variant="link" className="text-sm p-0 h-auto">
                            politique de confidentialité
                          </Button>
                        </Label>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Création du compte...
                          </div>
                        ) : (
                          'Créer mon compte'
                        )}
                      </Button>
                    </form>

                    <Separator className="my-6" />

                    {/* Inscription sociale */}
                    <div className="space-y-3">
                      <p className="text-center text-sm text-muted-foreground">
                        Ou inscrivez-vous avec
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="w-full">
                          <div className="w-5 h-5 bg-blue-600 rounded mr-2"></div>
                          Facebook
                        </Button>
                        <Button variant="outline" className="w-full">
                          <div className="w-5 h-5 bg-red-600 rounded mr-2"></div>
                          Google
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
