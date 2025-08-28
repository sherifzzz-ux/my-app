import { auth, signIn, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut, 
  Package, 
  CreditCard, 
  MapPin,
  Bell,
  Shield,
  Star,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import AccountDashboard from './components/AccountDashboard'

export default async function AccountPage() {
  const session = await auth()
  
  if (!session?.user) {
    // Rediriger vers la page d'authentification au lieu d'afficher le formulaire de connexion
    redirect('/auth')
  }

  return <AccountDashboard user={session.user} />
}
