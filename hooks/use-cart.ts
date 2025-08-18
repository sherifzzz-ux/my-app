"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  name: string;
  priceCents: number;
  imageUrl?: string | null;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1) => {
        const items = get().items.slice();
        const idx = items.findIndex((i) => i.productId === item.productId);
        if (idx >= 0) {
          items[idx] = { ...items[idx], quantity: items[idx].quantity + quantity };
        } else {
          items.push({ ...item, quantity });
        }
        set({ items });
      },
      removeItem: (productId) => set({ items: get().items.filter((i) => i.productId !== productId) }),
      setQuantity: (productId, quantity) => {
        const items = get().items.map((i) => (i.productId === productId ? { ...i, quantity: Math.max(1, quantity) } : i));
        set({ items });
      },
      clear: () => set({ items: [] }),
    }),
    { name: "mami-shop-cart" }
  )
);


