import { auth } from '@/lib/auth'
import ClientAddresses from './partials/ClientAddresses'

export default async function AddressesPage() {
  const session = await auth()
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <h1 className="text-xl font-semibold mb-4">Mes adresses</h1>
      {!session?.user ? (
        <div className="text-sm text-muted-foreground">
          Veuillez vous connecter pour gérer vos adresses.
        </div>
      ) : (
        <ClientAddresses />
      )}
    </div>
  )
}
