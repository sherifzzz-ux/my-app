import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Badge } from '@/components/ui/badge'
import AddToCartButton from '@/components/product/AddToCartButton'
import { formatCFA } from '@/lib/utils'
import { ProductCard } from '@/components/ui/ProductCard'

type tSearchParams = { [key: string]: string | string[] | undefined }

const ALLOWED_PAGE_SIZES = [16, 32, 48] as const

function toNumber(value: string | string[] | undefined, fallback: number): number {
  if (Array.isArray(value)) return parseInt(value[0] ?? '', 10) || fallback
  return parseInt(value ?? '', 10) || fallback
}

function toString(value: string | string[] | undefined, fallback = ''): string {
  return Array.isArray(value) ? (value[0] ?? fallback) : (value ?? fallback)
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<tSearchParams>
}) {
  const sp = await searchParams
  const q = toString(sp.q)
  const cat = toString(sp.cat)
  const sub = toString(sp.sub)
  const brand = toString(sp.brand)
  const sort = toString(sp.sort, 'recent')
  const page = Math.max(1, toNumber(sp.page, 1))
  const requestedPerPage = toNumber(sp.perPage, ALLOWED_PAGE_SIZES[0])
  const perPage = (ALLOWED_PAGE_SIZES as readonly number[]).includes(requestedPerPage)
    ? requestedPerPage
    : ALLOWED_PAGE_SIZES[0]

  type CategoryOption = { id: string; slug: string; name: string }
  const categories: CategoryOption[] = await prisma.category.findMany({
    select: { id: true, slug: true, name: true },
    orderBy: { name: 'asc' },
  })

  const andFilters: unknown[] = []
  if (q) {
    andFilters.push({
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ],
    })
  }
  if (cat) andFilters.push({ category: { slug: cat } })
  if (sub) andFilters.push({ subcategory: { slug: sub } })
  if (brand) andFilters.push({ brand: { slug: brand } })
  const where = andFilters.length ? { AND: andFilters } : undefined

  type ProductOrderBy = NonNullable<Parameters<typeof prisma.product.findMany>[0]>['orderBy']
  const orderBy: ProductOrderBy =
    sort === 'priceAsc'
      ? ({ priceCents: 'asc' } as ProductOrderBy)
      : sort === 'priceDesc'
        ? ({ priceCents: 'desc' } as ProductOrderBy)
        : sort === 'nameAsc'
          ? ({ name: 'asc' } as ProductOrderBy)
          : sort === 'nameDesc'
            ? ({ name: 'desc' } as ProductOrderBy)
            : sort === 'dateAsc'
              ? ({ createdAt: 'asc' } as ProductOrderBy)
              : sort === 'featured'
                ? ({ isFeatured: 'desc' } as ProductOrderBy)
                : sort === 'rating'
                  ? ({ rating: 'desc' } as ProductOrderBy)
                  : sort === 'idAsc'
                    ? ({ id: 'asc' } as ProductOrderBy)
                    : sort === 'idDesc'
                      ? ({ id: 'desc' } as ProductOrderBy)
                      : sort === 'relevance' && q
                        ? ({
                            _relevance: {
                              fields: ['name', 'description'],
                              search: q,
                              sort: 'desc',
                            },
                          } as unknown as ProductOrderBy)
                        : ({ createdAt: 'desc' } as ProductOrderBy)

  const totalCount = await prisma.product.count({ where: where as never })
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage))
  const skip = (page - 1) * perPage

  type ProductCard = {
    id: string
    name: string
    imageUrl: string | null
    priceCents: number
    oldPriceCents?: number | null
    stock: number
    category: { name: string }
  }
  const products: ProductCard[] = await prisma.product.findMany({
    where: where as never,
    orderBy,
    skip,
    take: perPage,
    select: {
      id: true,
      name: true,
      imageUrl: true,
      priceCents: true,
      oldPriceCents: true,
      stock: true,
      category: { select: { name: true } },
    },
  })

  function makeUrl(nextPage: number) {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (cat) params.set('cat', cat)
    if (sub) params.set('sub', sub)
    if (brand) params.set('brand', brand)
    if (sort && sort !== 'recent') params.set('sort', sort)
    if (perPage && perPage !== ALLOWED_PAGE_SIZES[0]) params.set('perPage', String(perPage))
    params.set('page', String(nextPage))
    return `/catalog?${params.toString()}`
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <Breadcrumb
        items={[{ label: 'Accueil', href: '/' }, { label: 'Catalogue' }]}
        className="mb-6"
      />

      <form action="/catalog" method="get" className="mb-6 grid gap-3 md:grid-cols-5">
        <input
          type="text"
          name="q"
          placeholder="Rechercher un produit..."
          defaultValue={q}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        />
        <select
          name="cat"
          defaultValue={cat}
          aria-label="Filtrer par catégorie"
          title="Filtrer par catégorie"
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">Toutes catégories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          name="sort"
          defaultValue={sort}
          aria-label="Trier les produits"
          title="Trier les produits"
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="recent">Plus récents</option>
          <option value="priceAsc">Prix: croissant</option>
          <option value="priceDesc">Prix: décroissant</option>
          <option value="nameAsc">Nom: A → Z</option>
          <option value="nameDesc">Nom: Z → A</option>
          <option value="dateAsc">Plus anciens</option>
          <option value="featured">Mise en avant</option>
          <option value="rating">Meilleure note</option>
          <option value="idAsc">Product ID: croissant</option>
          <option value="idDesc">Product ID: décroissant</option>
          <option value="relevance">Pertinence</option>
          <option value="random">Aléatoire</option>
        </select>
        <select
          name="perPage"
          defaultValue={String(perPage)}
          aria-label="Produits par page"
          title="Produits par page"
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          {ALLOWED_PAGE_SIZES.map((n) => (
            <option key={n} value={n}>
              {n} / page
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="h-10 rounded-md bg-zinc-900 text-white text-sm px-4 hover:bg-zinc-800"
        >
          Appliquer
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {(sort === 'random'
          ? [...products].sort((a, b) => {
              // deterministic pseudo-random shuffle by page to keep UX predictable
              const seed = page * 1337
              const ha = (a.id.charCodeAt(0) + seed) % 101
              const hb = (b.id.charCodeAt(0) + seed) % 101
              return ha - hb
            })
          : products
        ).map((p) => (
          <ProductCard 
            key={p.id} 
            product={p}
            showWishlist={true}
            showRating={false}
            showDescription={false}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        <a
          className="px-3 py-2 rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50"
          href={page > 1 ? makeUrl(1) : undefined}
        >
          «
        </a>
        <a
          className="px-3 py-2 rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50"
          href={page > 1 ? makeUrl(page - 1) : undefined}
        >
          Précédent
        </a>
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
              <a
                key={p}
                className={`px-3 py-2 rounded-md border text-sm ${isCurrent ? 'bg-zinc-900 text-white' : ''}`}
                href={isCurrent ? undefined : makeUrl(p)}
                aria-current={isCurrent ? 'page' : undefined}
              >
                {p}
              </a>
            )
          })}
        <a
          className="px-3 py-2 rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50"
          href={page < totalPages ? makeUrl(page + 1) : undefined}
        >
          Suivant
        </a>
        <a
          className="px-3 py-2 rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50"
          href={page < totalPages ? makeUrl(totalPages) : undefined}
        >
          »
        </a>
      </div>
    </div>
  )
}
