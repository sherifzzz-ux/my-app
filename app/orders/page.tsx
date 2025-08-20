import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { formatCFA } from '@/lib/utils'

export default async function OrdersPage() {
  const session = await auth()
  if (!session?.user?.email) {
    return (
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        <h1 className="text-xl font-semibold mb-4">Mes commandes</h1>
        <div className="text-sm text-muted-foreground">
          Veuillez vous connecter pour voir vos commandes.
        </div>
      </div>
    )
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  const orders = await prisma.order.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  })
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <h1 className="text-xl font-semibold mb-4">Mes commandes</h1>
      {orders.length === 0 ? (
        <div className="text-sm text-muted-foreground">Aucune commande.</div>
      ) : (
        <ul className="space-y-3">
          {orders.map((o) => (
            <li key={o.id} className="rounded-xl border p-4 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  #{o.id.slice(0, 8)} • {new Date(o.createdAt).toLocaleDateString('fr-FR')}
                </div>
                <div className="font-medium">{formatCFA(o.totalCents)}</div>
              </div>
              <div className="text-muted-foreground mt-1">{o.items.length} article(s)</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
