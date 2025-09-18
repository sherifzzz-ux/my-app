import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AccountDashboard from './components/AccountDashboard'

export default async function AccountPage() {
  const session = await auth()
  
  if (!session?.user) {
    // Rediriger vers la page d'authentification au lieu d'afficher le formulaire de connexion
    redirect('/auth')
  }

  return <AccountDashboard user={session.user} />
}
