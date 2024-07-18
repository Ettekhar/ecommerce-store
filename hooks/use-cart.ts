import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";
import toast from "react-hot-toast";

interface CartStore {
    items: Product[];
    addItem: (data: Product) => void;
    reduceItem: (id: string) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
    getItemQuantity: (id: string) => number;
}

const useCart = create(
    persist<CartStore>(
        (set, get) => ({
            items: [],
            addItem: (data: Product) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.id === data.id);

                if (existingItem) {
                    if (existingItem.quantity! < data.stock) {
                        set({
                            items: currentItems.map((item) =>
                                item.id === data.id
                                    ? { ...item, quantity: item.quantity! + 1 }
                                    : item
                            ),
                        });
                        toast.success("Item quantity increased.");
                    } else {
                        toast.error("Not enough stock available.");
                    }
                } else {
                    set({ items: [...get().items, { ...data, quantity: 1 }] });
                    toast.success("Item added to cart.");
                }
            },
            reduceItem: (id: string) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.id === id);

                if (existingItem && existingItem.quantity! > 1) {
                    set({
                        items: currentItems.map((item) =>
                            item.id === id
                                ? { ...item, quantity: item.quantity! - 1 }
                                : item
                        ),
                    });
                    toast.success("Item quantity decreased.");
                } else {
                    set({ items: currentItems.filter((item) => item.id !== id) });
                    toast.success("Item removed from the cart.");
                }
            },
            removeItem: (id: string) => {
                set({ items: get().items.filter((item) => item.id !== id) });
                toast.success("Item removed from the cart.");
            },
            removeAll: () => set({ items: [] }),
            getItemQuantity: (id: string) => {
                const item = get().items.find((item) => item.id === id);
                return item ? item.quantity! : 0;
            },
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCart;
