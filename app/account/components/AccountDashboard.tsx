'use client'

import { useState, useEffect } from 'react'
import { User, ShoppingBag, Heart, Settings, LogOut, Package, CreditCard, MapPin, Bell, Shield, Star, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { 
  useUserStats, 
  useUserOrders, 
  useUserFavorites, 
  useRemoveFromFavorites 
} from '@/hooks/use-account'
import StatsCards from './StatsCards'

interface User {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

export default function AccountDashboard({ user }: { user: User }) {
  const { toast } = useToast()
  
  // Hooks React Query optimisés
  const { data: stats, isLoading: statsLoading, error: statsError } = useUserStats()
  const { data: ordersData, isLoading: ordersLoading } = useUserOrders('all', 3, 0)
  const { data: favoritesData, isLoading: favoritesLoading } = useUserFavorites(3, 0)
  const removeFromFavorites = useRemoveFromFavorites()

  // Gestion des erreurs
  useEffect(() => {
    if (statsError) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les statistiques",
        variant: "error",
      })
    }
  }, [statsError, toast])

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
      
      if (res.ok) {
        window.location.href = '/'
      } else {
        throw new Error('Erreur lors de la déconnexion')
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
      toast({
        title: "Erreur",
        description: "Impossible de se déconnecter",
        variant: "error",
      })
    }
  }

  const handleRemoveFavorite = async (favoriteId: string) => {
    try {
      await removeFromFavorites.mutateAsync({ favoriteId })
      toast({
        title: "Succès",
        description: "Produit retiré des favoris",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de retirer le produit des favoris",
        variant: "error",
      })
    }
  }

  const recentOrders = ordersData?.orders || []
  const recentFavorites = favoritesData?.favorites || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header avec informations utilisateur */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20 border-4 border-primary/20">
                <AvatarImage src={user.image || undefined} />
                <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                  {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Bonjour, {user.name || 'Utilisateur'} !
                </h1>
                <p className="text-muted-foreground text-lg">
                  {user.email}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                    <Star className="w-3 h-3 mr-1" />
                    Client Premium
                  </Badge>
                  <Badge variant="outline">
                    <Shield className="w-3 h-3 mr-1" />
                    Compte vérifié
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" size="lg">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
              <Button onClick={handleSignOut} variant="destructive" size="lg">
                <LogOut className="w-4 h-4 mr-2" />
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>

        {/* Statistiques optimisées */}
        <StatsCards stats={stats || null} loading={statsLoading} />

        {/* Tabs principaux */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-12 bg-background/50 backdrop-blur-sm border">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Vue d'ensemble</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Commandes</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Favoris</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Adresses</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Paramètres</span>
            </TabsTrigger>
          </TabsList>

          {/* Contenu des tabs */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Dernières commandes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Dernières commandes
                  </CardTitle>
                  <CardDescription>
                    Suivez vos commandes récentes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {ordersLoading ? (
                    <div className="space-y-3">
                      {Array.from({ length: 2 }).map((_, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 animate-pulse">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-muted rounded-full"></div>
                            <div className="space-y-2">
                              <div className="h-4 bg-muted rounded w-32"></div>
                              <div className="h-3 bg-muted rounded w-24"></div>
                            </div>
                          </div>
                          <div className="w-16 h-6 bg-muted rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : recentOrders.length > 0 ? (
                    <div className="space-y-3">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <Package className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Commande #{order.id}</p>
                              <p className="text-sm text-muted-foreground">{order.estimatedDelivery}</p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {order.statusText}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Aucune commande pour le moment</p>
                    </div>
                  )}
                  <Button variant="outline" className="w-full mt-4">
                    Voir toutes les commandes
                  </Button>
                </CardContent>
              </Card>

              {/* Favoris récents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Favoris récents
                  </CardTitle>
                  <CardDescription>
                    Vos produits préférés
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {favoritesLoading ? (
                    <div className="space-y-3">
                      {Array.from({ length: 2 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 animate-pulse">
                          <div className="w-12 h-12 bg-muted rounded-lg"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-muted rounded w-32"></div>
                            <div className="h-3 bg-muted rounded w-20"></div>
                          </div>
                          <div className="w-8 h-8 bg-muted rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : recentFavorites.length > 0 ? (
                    <div className="space-y-3">
                      {recentFavorites.map((favorite) => (
                        <div key={favorite.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                            <Heart className="w-6 h-6 text-pink-500" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{favorite.product.name}</p>
                            <p className="text-sm text-muted-foreground">€{favorite.product.finalPrice.toFixed(2)}</p>
                          </div>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleRemoveFavorite(favorite.id)}
                            disabled={removeFromFavorites.isPending}
                          >
                            <Heart className="w-4 h-4 text-pink-500 fill-current" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Heart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Aucun favori pour le moment</p>
                    </div>
                  )}
                  <Button variant="outline" className="w-full mt-4">
                    Voir tous les favoris
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
                <CardDescription>
                  Accédez rapidement aux fonctionnalités principales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Package className="w-6 h-6" />
                    <span className="text-sm">Suivre une commande</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <CreditCard className="w-6 h-6" />
                    <span className="text-sm">Moyens de paiement</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <MapPin className="w-6 h-6" />
                    <span className="text-sm">Gérer les adresses</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Bell className="w-6 h-6" />
                    <span className="text-sm">Notifications</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Historique des commandes</CardTitle>
                <CardDescription>
                  Consultez et suivez toutes vos commandes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Fonctionnalité en cours de développement</p>
                  <p className="text-sm">Bientôt disponible !</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes favoris</CardTitle>
                <CardDescription>
                  Retrouvez tous vos produits préférés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Fonctionnalité en cours de développement</p>
                  <p className="text-sm">Bientôt disponible !</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes adresses</CardTitle>
                <CardDescription>
                  Gérez vos adresses de livraison et de facturation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Fonctionnalité en cours de développement</p>
                  <p className="text-sm">Bientôt disponible !</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres du compte</CardTitle>
                <CardDescription>
                  Personnalisez votre profil et vos préférences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Settings className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Fonctionnalité en cours de développement</p>
                  <p className="text-sm">Bientôt disponible !</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
