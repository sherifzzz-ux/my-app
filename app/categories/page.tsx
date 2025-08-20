import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Breadcrumb } from '@/components/ui/breadcrumb'

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { subcategories: { orderBy: { name: 'asc' } } },
  })
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <Breadcrumb
        items={[{ label: 'Accueil', href: '/' }, { label: 'Catégories' }]}
        className="mb-6"
      />
      <h1 className="text-xl font-semibold mb-4">Catégories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c) => (
          <div key={c.id} className="rounded-xl border p-4">
            <div className="flex items-center justify-between mb-2">
              <Link href={`/catalog?cat=${c.slug}`} className="font-medium hover:underline">
                {c.name}
              </Link>
              <span className="text-xs text-muted-foreground">
                {c.subcategories.length} sous-catégories
              </span>
            </div>
            {c.subcategories.length ? (
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {c.subcategories.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/catalog?cat=${c.slug}&sub=${s.slug}`}
                      className="text-muted-foreground hover:underline"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-muted-foreground">Aucune sous-catégorie</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
