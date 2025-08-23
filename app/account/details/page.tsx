import { auth } from '@/lib/auth'
import ClientDetailsForm from './partials/ClientDetailsForm'

export default async function AccountDetailsPage() {
  const session = await auth()
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <h1 className="text-xl font-semibold mb-4">Détails du compte</h1>
      {!session?.user ? (
        <div className="text-sm text-muted-foreground">
          Veuillez vous connecter pour voir vos informations.
        </div>
      ) : (
        <ClientDetailsForm initialName={session.user.name ?? ''} email={session.user.email ?? ''} />
      )}
    </div>
  )
}
