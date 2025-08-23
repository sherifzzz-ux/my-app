"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  name: string;
  brand?: string;
  priceCents: number;
  originalPriceCents?: number;
  imageUrl?: string | null;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  // Core cart actions
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  // UI state
  setIsOpen: (open: boolean) => void;
  // Computed properties
  totalItems: number;
  subtotal: number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item, quantity = 1) => {
        const items = get().items.slice();
        const idx = items.findIndex((i) => i.productId === item.productId);
        if (idx >= 0) {
          items[idx] = { ...items[idx], quantity: items[idx].quantity + quantity };
        } else {
          items.push({ ...item, quantity });
        }
        set({ items, isOpen: true });
      },
      removeItem: (productId) => set({ items: get().items.filter((i) => i.productId !== productId) }),
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.productId !== productId) });
          return;
        }
        const items = get().items.map((i) => (i.productId === productId ? { ...i, quantity: Math.max(1, quantity) } : i));
        set({ items });
      },
      clear: () => set({ items: [] }),
      setIsOpen: (open) => set({ isOpen: open }),
      get totalItems() {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
      get subtotal() {
        return get().items.reduce((sum, item) => sum + (item.priceCents * item.quantity), 0);
      },
    }),
    { 
      name: "mami-shop-cart",
      partialize: (state) => ({ items: state.items }) // Only persist items, not UI state
    }
  )
);


