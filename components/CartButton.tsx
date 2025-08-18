"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

export default function CartButton() {
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link href="/cart" className="relative p-2" aria-label="Panier">
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 ? (
        <span
          className="absolute -right-1 -top-1 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] leading-[18px] text-center px-1"
          aria-label={`${itemCount} article${itemCount > 1 ? "s" : ""} dans le panier`}
        >
          {itemCount}
        </span>
      ) : null}
    </Link>
  );
}


