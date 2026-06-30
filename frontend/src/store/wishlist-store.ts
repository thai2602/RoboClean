import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  sku: string;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
  toggleWishlist: (product: WishlistItem) => void;
  hasItem: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleWishlist: (product) => {
        const items = get().items;
        const exists = items.some((item) => item.id === product.id);

        if (exists) {
          set({
            items: items.filter((item) => item.id !== product.id),
          });
        } else {
          set({ items: [...items, product] });
        }
      },
      hasItem: (id) => {
        return get().items.some((item) => item.id === id);
      },
    }),
    {
      name: "roboclean-wishlist",
    }
  )
);
