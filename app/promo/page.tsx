import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { formatCFA } from '@/lib/utils'

export default async function PromoPage() {
  const products = await prisma.product.findMany({
    where: { oldPriceCents: { not: null } },
    orderBy: { updatedAt: 'desc' },
  })
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <Breadcrumb
        items={[{ label: 'Accueil', href: '/' }, { label: 'Promotions' }]}
        className="mb-6"
      />
      <h1 className="text-xl font-semibold mb-4">Promotions</h1>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <li key={p.id} className="rounded-xl border p-4">
            {p.imageUrl ? (
              <Image
                src={p.imageUrl}
                alt={p.name}
                width={500}
                height={400}
                className="w-full h-auto mb-3 rounded-md"
              />
            ) : null}
            <div className="font-semibold line-clamp-2 min-h-[2.5rem]">{p.name}</div>
            <div className="text-sm">
              <span className="text-muted-foreground line-through mr-2">
                {formatCFA(p.oldPriceCents ?? 0)}
              </span>
              <span className="font-medium">{formatCFA(p.priceCents)}</span>
            </div>
            <div className="mt-3">
              <Link href={`/product/${p.id}`} className="text-sm underline underline-offset-4">
                Voir les détails
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
