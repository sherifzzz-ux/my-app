"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  productId: string;
  name: string;
  brand?: string;
  priceCents: number;
  originalPriceCents?: number;
  imageUrl?: string | null;
  rating?: number;
  inStock?: boolean;
  category?: string;
  addedDate?: string;
}

interface WishlistState {
  items: WishlistItem[];
  // Core actions
  add: (item: WishlistItem) => void;
  remove: (productId: string) => void;
  toggle: (item: WishlistItem) => void;
  has: (productId: string) => boolean;
  clear: () => void;
  // Advanced actions
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  // Computed properties
  wishlistCount: number;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => {
        if (get().items.some((i) => i.productId === item.productId)) return;
        const itemWithDate = {
          ...item,
          addedDate: new Date().toISOString()
        };
        set({ items: [...get().items, itemWithDate] });
      },
      remove: (productId) => set({ items: get().items.filter((i) => i.productId !== productId) }),
      toggle: (item) => {
        const exists = get().items.some((i) => i.productId === item.productId);
        if (exists) {
          set({ items: get().items.filter((i) => i.productId !== item.productId) });
        } else {
          const itemWithDate = {
            ...item,
            addedDate: new Date().toISOString()
          };
          set({ items: [...get().items, itemWithDate] });
        }
      },
      has: (productId) => get().items.some((i) => i.productId === productId),
      clear: () => set({ items: [] }),
      // Aliases for Frontend compatibility
      addToWishlist: (item) => get().add(item),
      removeFromWishlist: (productId) => get().remove(productId),
      isInWishlist: (productId) => get().has(productId),
      get wishlistCount() {
        return get().items.length;
      },
    }),
    { name: "mami-shop-wishlist" }
  )
);


