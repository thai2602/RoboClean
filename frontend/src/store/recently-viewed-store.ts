import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ViewedItem {
  id: string;
  name: string;
  price: number;
  sku: string;
  image: string;
}

interface RecentlyViewedState {
  items: ViewedItem[];
  addViewedItem: (product: ViewedItem) => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      items: [],
      addViewedItem: (product) => {
        const items = get().items;
        // Filter out duplicate if it exists, to place it at the beginning of the list
        const filtered = items.filter((item) => item.id !== product.id);
        
        // Add to beginning and limit to 5 items
        const updated = [product, ...filtered].slice(0, 5);
        
        set({ items: updated });
      },
    }),
    {
      name: "roboclean-recently-viewed",
    }
  )
);
