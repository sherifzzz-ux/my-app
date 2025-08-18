"use client";

import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/use-wishlist";

export default function AddToWishlistButton({
  productId,
  name,
  priceCents,
  imageUrl,
}: {
  productId: string;
  name: string;
  priceCents: number;
  imageUrl?: string | null;
}) {
  const toggle = useWishlist((s) => s.toggle);
  const has = useWishlist((s) => s.has(productId));
  return (
    <Button
      variant={has ? "ghost" : "outline"}
      onClick={() => toggle({ productId, name, priceCents, imageUrl })}
      className="h-11 px-4"
    >
      {has ? "Retirer des favoris" : "Ajouter aux favoris"}
    </Button>
  );
}


