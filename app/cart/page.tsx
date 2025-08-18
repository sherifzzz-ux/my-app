"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, removeItem, setQuantity, clear } = useCart();
  const totalCents = items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Panier</h1>

      {items.length === 0 ? (
        <div className="text-sm text-muted-foreground">
          Votre panier est vide. <Link className="underline" href="/catalog">Continuer les achats</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((i) => (
              <div key={i.productId} className="flex items-center gap-4 rounded-xl border p-4">
                {i.imageUrl ? (
                  <Image src={i.imageUrl} alt={i.name} width={96} height={96} className="rounded-md" />
                ) : (
                  <div className="h-24 w-24 rounded-md bg-muted" />
                )}
                <div className="flex-1">
                  <div className="font-medium">{i.name}</div>
                  <div className="text-sm text-muted-foreground">{(i.priceCents / 100).toFixed(2)} €</div>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor={`qty-${i.productId}`} className="sr-only">Quantité pour {i.name}</label>
                  <input
                    type="number"
                    min={1}
                    id={`qty-${i.productId}`}
                    placeholder="Quantité"
                    title={`Quantité pour ${i.name}`}
                    aria-label={`Quantité pour ${i.name}`}
                    value={i.quantity}
                    onChange={(e) => setQuantity(i.productId, Number(e.target.value) || 1)}
                    className="h-10 w-20 rounded-md border border-input bg-background px-3 text-sm"
                  />
                  <Button variant="outline" onClick={() => removeItem(i.productId)}>Supprimer</Button>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border p-4 h-fit">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Sous-total</div>
              <div className="font-medium">{(totalCents / 100).toFixed(2)} €</div>
            </div>
            <Button className="w-full mt-4">Passer au paiement</Button>
            <Button variant="outline" className="w-full mt-2" onClick={() => clear()}>Vider le panier</Button>
          </div>
        </div>
      )}
    </div>
  );
}


