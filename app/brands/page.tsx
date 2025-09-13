import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { fallbackBrands } from '@/lib/fallback-data'
import { Grid } from '@/components/ui/responsive-grid'
import { TouchTarget } from '@/components/ui/touch-target'
import { Button } from '@/components/ui/button'

type tSearchParams = { [key: string]: string | string[] | undefined }

function toString(value: string | string[] | undefined, fallback = ''): string {
  return Array.isArray(value) ? (value[0] ?? fallback) : (value ?? fallback)
}

function toNumber(value: string | string[] | undefined, fallback: number): number {
  if (Array.isArray(value)) return parseInt(value[0] ?? '', 10) || fallback
  return parseInt(value ?? '', 10) || fallback
}

const PAGE_SIZE = 24

export default async function BrandsPage({
  searchParams,
}: {
  searchParams: Promise<tSearchParams>
}) {
  const sp = await searchParams
  const q = toString(sp.q)
  const sort = toString(sp.sort, 'nameAsc')
  const page = Math.max(1, toNumber(sp.page, 1))
  const orderBy = sort === 'nameDesc' ? { name: 'desc' as const } : { name: 'asc' as const }
  const where = q ? { name: { contains: q, mode: 'insensitive' as const } } : undefined
  const totalCount = await prisma.brand.count({ where: where as never })
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  // Utiliser les fallbackBrands pour avoir les images des marques
  const items = fallbackBrands
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <Breadcrumb
        items={[{ label: 'Accueil', href: '/' }, { label: 'Marques' }]}
        className="mb-6"
      />
      <h1 className="text-xl font-semibold mb-4">Marques</h1>
      <form action="/brands" className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-2">
        <input
          name="q"
          placeholder="Rechercher une marque..."
          defaultValue={q}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        />
        <select
          name="sort"
          defaultValue={sort}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          aria-label="Trier les marques"
          title="Trier les marques"
        >
          <option value="nameAsc">Nom: A → Z</option>
          <option value="nameDesc">Nom: Z → A</option>
        </select>
        <Button size="mobile">
          Appliquer
        </Button>
      </form>
      <Grid variant="brands" gap="md">
        {items.map((b) => (
          <TouchTarget key={b.id} size="default">
            <Link
              href={`/catalog?brand=${b.slug}`}
              className="flex flex-col items-center justify-center rounded-lg border p-4 bg-white hover:shadow-md transition-shadow h-full"
            >
              {b.imageUrl ? (
                <Image
                  src={b.imageUrl}
                  alt={b.name}
                  width={160}
                  height={60}
                  className="h-12 w-auto object-contain mb-2"
                />
              ) : (
                <div className="h-12 w-full flex items-center justify-center mb-2">
                  <span className="text-xs text-gray-500 text-center">{b.name}</span>
                </div>
              )}
              <span className="text-xs text-gray-600 text-center font-medium">{b.name}</span>
            </Link>
          </TouchTarget>
        ))}
      </Grid>
      <div className="flex items-center justify-center gap-2 mt-8">
        <TouchTarget size="sm">
          <Link
            className="px-3 py-2 rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-50"
            href={page > 1 ? `/brands?page=1&q=${encodeURIComponent(q)}&sort=${sort}` : '#'}
          >
            «
          </Link>
        </TouchTarget>
        <TouchTarget size="sm">
          <Link
            className="px-3 py-2 rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-50"
            href={
              page > 1
                ? `/brands?page=${page - 1}&q=${encodeURIComponent(q)}&sort=${sort}`
                : '#'
            }
          >
            Précédent
          </Link>
        </TouchTarget>
        {Array.from({ length: totalPages })
          .slice(0, 200)
          .map((_, idx) => {
            const p = idx + 1
            const isCurrent = p === page
            const isEdge = p <= 2 || p > totalPages - 2
            const isNear = Math.abs(p - page) <= 2
            if (!(isEdge || isNear))
              return idx === 2 || idx === totalPages - 3 ? (
                <span key={p} className="px-2">
                  …
                </span>
              ) : null
            return (
              <TouchTarget key={p} size="sm">
                <Link
                  className={`px-3 py-2 rounded-md border text-sm hover:bg-gray-50 ${isCurrent ? 'bg-zinc-900 text-white hover:bg-zinc-800' : ''}`}
                  href={
                    !isCurrent
                      ? `/brands?page=${p}&q=${encodeURIComponent(q)}&sort=${sort}`
                      : '#'
                  }
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {p}
                </Link>
              </TouchTarget>
            )
          })}
        <TouchTarget size="sm">
          <Link
            className="px-3 py-2 rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-50"
            href={
              page < totalPages
                ? `/brands?page=${page + 1}&q=${encodeURIComponent(q)}&sort=${sort}`
                : '#'
            }
          >
            Suivant
          </Link>
        </TouchTarget>
        <TouchTarget size="sm">
          <Link
            className="px-3 py-2 rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-50"
            href={
              page < totalPages
                ? `/brands?page=${totalPages}&q=${encodeURIComponent(q)}&sort=${sort}`
                : '#'
            }
          >
            »
          </Link>
        </TouchTarget>
      </div>
    </div>
  )
}
