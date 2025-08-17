import Image from "next/image";
import { prisma } from "@/lib/prisma";

async function getProducts() {
  return prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 12,
  });
}

export default async function Home() {
  const products = await getProducts();
  return (
    <div className="max-w-5xl mx-auto p-8">
      <header className="flex items-center gap-3 mb-8">
        <Image className="dark:invert" src="/next.svg" alt="Logo" width={120} height={26} />
        <h1 className="text-2xl font-semibold">Mami Shop</h1>
      </header>
      <main>
        <h2 className="text-xl font-medium mb-4">Produits récents</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <li key={p.id} className="rounded-lg border p-4">
              {p.imageUrl ? (
                <Image src={p.imageUrl} alt={p.name} width={400} height={300} className="w-full h-auto mb-3" />
              ) : null}
              <div className="text-sm text-gray-500 mb-1">{p.category.name}</div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm">{(p.priceCents / 100).toFixed(2)} €</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
