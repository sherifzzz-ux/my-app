"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { toast } from "@/components/ui/sonner";

export default function AddToCartButton({
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
  const add = useCart((s) => s.addItem);
  return (
    <Button
      onClick={() => {
        add({ productId, name, priceCents, imageUrl: imageUrl ?? undefined }, 1);
        toast.success("Ajouté au panier", { description: name });
      }}
      className="h-11 px-6"
    >
      Ajouter au panier
    </Button>
  );
}


