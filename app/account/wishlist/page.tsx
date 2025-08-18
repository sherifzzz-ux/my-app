"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/hooks/use-wishlist";
import { Button } from "@/components/ui/button";
import { formatCFA } from "@/lib/utils";

export default function WishlistPage() {
  const { items, remove, clear } = useWishlist((s) => ({ items: s.items, remove: s.remove, clear: s.clear }));
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Mes favoris</h1>
      {items.length === 0 ? (
        <div className="text-sm text-muted-foreground">
          Aucun favori pour le moment. <Link className="underline" href="/catalog">Découvrir le catalogue</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((i) => (
            <div key={i.productId} className="rounded-xl border p-4">
              {i.imageUrl ? (
                <Image src={i.imageUrl} alt={i.name} width={500} height={400} className="w-full h-auto mb-3 rounded-md" />
              ) : null}
              <div className="font-semibold line-clamp-2 min-h-[2.5rem]">{i.name}</div>
              <div className="text-sm mb-3">{formatCFA(i.priceCents)}</div>
              <div className="flex gap-2">
                <Link href={`/product/${i.productId}`} className="text-sm underline underline-offset-4">Voir le produit</Link>
                <Button variant="outline" onClick={() => remove(i.productId)} className="h-9">Retirer</Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {items.length > 0 ? (
        <Button variant="outline" className="mt-6" onClick={() => clear()}>Vider mes favoris</Button>
      ) : null}
    </div>
  );
}


