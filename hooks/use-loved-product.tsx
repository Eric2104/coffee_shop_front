import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { ProductType } from "@/types/product";
import { toast } from '@/hooks/use-toast'

interface UseLovedProductsType {
    lovedItems: ProductType[],
    addLoveItem: (data: ProductType) => void
    removeLovedItem: (id: String) => void
}

export const useLovedProducts = create(persist<UseLovedProductsType>((set, get) => ({
    lovedItems: [],
    addLoveItem: (data: ProductType) => {
        const currentLovedItems = get().lovedItems;
        const existingItem = currentLovedItems.find((item) => item.id === data.id)

        if (existingItem) {
            return toast({
                title: "El producto ya existe en la lista 💔",
                variant: "destructive"
            })
        }

        set({
            lovedItems: [...get().lovedItems, data]
        })
        toast({
            title: " Producto añadido a la lista 🧡"
        })
    },
    removeLovedItem: (slug: String) => {
        set({ lovedItems: [...get().lovedItems.filter((item) => item.slug !== slug)] })
        toast({
            title: "Producto se ha eliminado de la lista ❤️‍🔥"
        })
    }
}), {
    name: "loved-products-storage",
    storage: createJSONStorage(() => localStorage)
}))