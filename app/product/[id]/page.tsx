import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import AddToCartButton from "@/components/product/AddToCartButton";
import type { Review, User } from "@prisma/client";

type ReviewWithUser = Review & { user: User };

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      reviews: {
        include: { user: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });
  if (!product) return notFound();
  const similar = await prisma.product.findMany({
    where: { categoryId: product.categoryId, NOT: { id: product.id } },
    orderBy: { createdAt: "desc" },
    take: 8,
    include: { category: true },
  });
  const avgRating = product.reviews.length
    ? product.reviews.reduce(
        (sum: number, r: ReviewWithUser) => sum + r.rating,
        0,
      ) / product.reviews.length
    : null;
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Catalogue", href: "/catalog" },
          { label: product.name },
        ]}
        className="mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product.imageUrl ? (
            <Image src={product.imageUrl} alt={product.name} width={800} height={800} className="w-full h-auto rounded-xl" />
          ) : null}
        </div>
        <div>
          <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
          <div className="text-sm text-muted-foreground mb-4">{product.category.name}</div>
          <div className="text-xl font-semibold mb-6">{(product.priceCents / 100).toFixed(2)} €</div>
          {product.description ? <p className="text-sm leading-6 mb-6 whitespace-pre-line">{product.description}</p> : null}
          {avgRating !== null ? (
            <div className="mb-6 text-sm">
              Note moyenne: {avgRating.toFixed(1)} / 5
              <span className="ml-2 text-yellow-600" aria-hidden>
                {"★".repeat(Math.round(avgRating))}
                {"☆".repeat(5 - Math.round(avgRating))}
              </span>
              <span className="ml-2 text-muted-foreground">({product.reviews.length} avis)</span>
            </div>
          ) : (
            <div className="mb-6 text-sm text-muted-foreground">Aucun avis pour le moment</div>
          )}
          <AddToCartButton
            productId={product.id}
            name={product.name}
            priceCents={product.priceCents}
            imageUrl={product.imageUrl}
          />
        </div>
      </div>

      {product.reviews.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Avis</h2>
          <ul className="space-y-4">
            {product.reviews.slice(0, 5).map((r: ReviewWithUser) => (
              <li key={r.id} className="rounded-xl border p-4">
                <div className="flex items-center gap-2 text-sm mb-1">
                  <span className="font-medium">{r.user.name ?? r.user.email}</span>
                  <span className="text-yellow-600" aria-hidden>
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </span>
                </div>
                {r.comment ? <p className="text-sm text-muted-foreground">{r.comment}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {similar.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Produits similaires</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similar.map((p) => (
              <li key={p.id} className="rounded-xl border p-4">
                {p.imageUrl ? (
                  <Image src={p.imageUrl} alt={p.name} width={500} height={400} className="w-full h-auto mb-3 rounded-md" />
                ) : null}
                <div className="text-xs text-muted-foreground mb-1">{p.category.name}</div>
                <div className="font-semibold line-clamp-2 min-h-[2.5rem]">{p.name}</div>
                <div className="text-sm">{(p.priceCents / 100).toFixed(2)} €</div>
                <div className="mt-3">
                  <Link href={`/product/${p.id}`} className="text-sm underline underline-offset-4">
                    Voir les détails
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}


