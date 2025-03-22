//Debo aprender como funciona esto, solo hice lo que dice el video

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ProductType } from "@/types/product"
import { toast } from '@/hooks/use-toast'

interface CartStore {
    items: ProductType[],
    addItem: (data: ProductType) => void
    removeItem: (id: String) => void
    removeAll: () => void
}

export const useCart = create(persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: ProductType) => {

        const currentItems = get().items
        //const existingItem = currentItems.find((item) => item.id === data.id)
        const existingItem = currentItems.find((item) => item.slug === data.slug)
        console.log(existingItem)
        if (existingItem) {
            return toast({
                title: "El producto ya existe en el carrito.",
                variant: "destructive"
            })
        }

        set({
            items: [...get().items, data]
        })
        toast({
            title: "Producto añadido al carrito 🛍️"
        })
    },
    // removeItem: (id: number) => {
    //     set({ items: [...get().items.filter((item) => item.id !== id)] })
    //     toast({
    //         title: "Producto eliminado del carrito 🗑️"
    //     })
    removeItem: (slug: String) => {
        set({ items: [...get().items.filter((item) => item.slug !== slug)] })
        toast({
            title: "Producto eliminado del carrito 🗑️"
        })
    },

    removeAll: () => set({ items: [] })
}), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
}))
