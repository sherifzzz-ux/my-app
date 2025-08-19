import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Marques</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((b) => (
          <Link key={b.id} href={`/brand/${b.slug}`} className="flex items-center justify-center rounded-lg border p-4 bg-white">
            {b.imageUrl ? (
              <Image src={b.imageUrl} alt={b.name} width={160} height={60} className="h-10 w-auto object-contain" />
            ) : (
              <span className="text-sm">{b.name}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}


