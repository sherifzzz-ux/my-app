import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Badge } from "@/components/ui/badge";
import AddToCartButton from "@/components/product/AddToCartButton";
import { formatCFA } from "@/lib/utils";

type ProductCard = {
  id: string;
  name: string;
  imageUrl: string | null;
  priceCents: number;
  oldPriceCents?: number | null;
  category: { name: string };
};

async function getProducts(): Promise<ProductCard[]> {
  return prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 12,
    select: {
      id: true,
      name: true,
      imageUrl: true,
      priceCents: true,
      oldPriceCents: true,
      category: { select: { name: true } },
    },
  });
}

export default async function Home() {
  const products = await getProducts();
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <HeroCarousel className="mb-10" />
      <h2 className="text-xl font-medium mb-4">Produits récents</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <li key={p.id} className="rounded-xl border p-4">
            {p.imageUrl ? (
              <Image src={p.imageUrl} alt={p.name} width={500} height={400} className="w-full h-auto mb-3 rounded-md" />
            ) : null}
            {p.oldPriceCents ? (
              <div className="mb-2">
                <Badge variant="destructive">Promo</Badge>
              </div>
            ) : null}
            <div className="text-xs text-muted-foreground mb-1">{p.category.name}</div>
            <div className="font-semibold line-clamp-2 min-h-[2.5rem]">{p.name}</div>
            <div className="text-sm">
              {p.oldPriceCents ? (
                <>
                  <span className="text-muted-foreground line-through mr-2">{formatCFA(p.oldPriceCents)}</span>
                  <span className="font-medium">{formatCFA(p.priceCents)}</span>
                </>
              ) : (
                <span className="font-medium">{formatCFA(p.priceCents)}</span>
              )}
            </div>
            <div className="mt-3 flex gap-2">
              <AddToCartButton productId={p.id} name={p.name} priceCents={p.priceCents} imageUrl={p.imageUrl ?? undefined} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
