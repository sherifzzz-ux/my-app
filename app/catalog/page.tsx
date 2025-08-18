import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Breadcrumb } from "@/components/ui/breadcrumb";

type tSearchParams = { [key: string]: string | string[] | undefined };

const PAGE_SIZE = 12;

function toNumber(value: string | string[] | undefined, fallback: number): number {
  if (Array.isArray(value)) return parseInt(value[0] ?? "", 10) || fallback;
  return parseInt(value ?? "", 10) || fallback;
}

function toString(value: string | string[] | undefined, fallback = ""): string {
  return Array.isArray(value) ? value[0] ?? fallback : value ?? fallback;
}

export default async function CatalogPage({ searchParams }: { searchParams: Promise<tSearchParams> }) {
  const sp = await searchParams;
  const q = toString(sp.q);
  const cat = toString(sp.cat);
  const sub = toString(sp.sub);
  const brand = toString(sp.brand);
  const sort = toString(sp.sort, "recent");
  const page = Math.max(1, toNumber(sp.page, 1));

  type CategoryOption = { id: string; slug: string; name: string };
  const categories: CategoryOption[] = await prisma.category.findMany({
    select: { id: true, slug: true, name: true },
    orderBy: { name: "asc" },
  });

  const andFilters: unknown[] = [];
  if (q) {
    andFilters.push({
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ],
    });
  }
  if (cat) andFilters.push({ category: { slug: cat } });
  if (sub) andFilters.push({ subcategory: { slug: sub } });
  if (brand) andFilters.push({ brand: { slug: brand } });
  const where = andFilters.length ? { AND: andFilters } : undefined;

  const orderBy =
    sort === "priceAsc"
      ? { priceCents: "asc" as const }
      : sort === "priceDesc"
      ? { priceCents: "desc" as const }
      : sort === "nameAsc"
      ? { name: "asc" as const }
      : sort === "nameDesc"
      ? { name: "desc" as const }
      : { createdAt: "desc" as const };

  const totalCount = await prisma.product.count({ where: where as never });
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const skip = (page - 1) * PAGE_SIZE;

  type ProductCard = {
    id: string;
    name: string;
    imageUrl: string | null;
    priceCents: number;
    category: { name: string };
  };
  const products: ProductCard[] = await prisma.product.findMany({
    where: where as never,
    orderBy,
    skip,
    take: PAGE_SIZE,
    select: {
      id: true,
      name: true,
      imageUrl: true,
      priceCents: true,
      category: { select: { name: true } },
    },
  });

  function makeUrl(nextPage: number) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (cat) params.set("cat", cat);
    if (sub) params.set("sub", sub);
    if (brand) params.set("brand", brand);
    if (sort && sort !== "recent") params.set("sort", sort);
    params.set("page", String(nextPage));
    return `/catalog?${params.toString()}`;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Catalogue" }]} className="mb-6" />

      <form action="/catalog" method="get" className="mb-6 grid gap-3 md:grid-cols-4">
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
        </select>
        <button type="submit" className="h-10 rounded-md bg-zinc-900 text-white text-sm px-4 hover:bg-zinc-800">
          Appliquer
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="rounded-xl border p-4">
            {p.imageUrl ? (
              <Image src={p.imageUrl} alt={p.name} width={500} height={400} className="w-full h-auto mb-3 rounded-md" />
            ) : null}
            <div className="text-xs text-muted-foreground mb-1">{p.category.name}</div>
            <div className="font-semibold mb-1 line-clamp-2 min-h-[2.5rem]">{p.name}</div>
            <div className="text-sm">{(p.priceCents / 100).toFixed(2)} €</div>
            <div className="mt-3 flex gap-2">
              <Link href={`/product/${p.id}`} className="text-sm underline underline-offset-4">
                Voir les détails
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        <a
          className="px-3 py-2 rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50"
          href={page > 1 ? makeUrl(page - 1) : undefined}
        >
          Précédent
        </a>
        <span className="text-sm text-muted-foreground">
          Page {page} / {totalPages}
        </span>
        <a
          className="px-3 py-2 rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50"
          href={page < totalPages ? makeUrl(page + 1) : undefined}
        >
          Suivant
        </a>
      </div>
    </div>
  );
}


