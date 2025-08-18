import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { HeroCarousel } from "@/components/HeroCarousel";

type ProductCard = {
  id: string;
  name: string;
  imageUrl: string | null;
  priceCents: number;
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
            <div className="text-xs text-muted-foreground mb-1">{p.category.name}</div>
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm">{(p.priceCents / 100).toFixed(2)} €</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
