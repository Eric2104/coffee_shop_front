'use client'
import { useState } from "react"
import axios from "axios"
import { toast } from "@/hooks/use-toast"

export default function useDeleteCategory() {
    const [loadingDeleteCategory, setLoadingDeleteCategory] = useState(false)
    const [errorDeleteCateogry, setErrorDeleteCateogry] = useState('')

    const deleteCategory = async (id: number) => {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/coffee-app/categories/${id}`
        setLoadingDeleteCategory(true)
        setErrorDeleteCateogry('')
        try {
            await axios.delete(url)
            toast({
                title: "Éxito",
                description: "Elemento eliminado correctamente",
                variant: "default",
            })
        } catch (error: any) {
            setErrorDeleteCateogry(error.message)
            console.error('Error eliminando categoria:', error)
            toast({
                title: "Error",
                description: `Error eliminando elemento, asegurate de que no esté asociado a un café`,
                variant: "destructive",
            })
        } finally {
            setLoadingDeleteCategory(false)
        }
    }

    return { deleteCategory, loadingDeleteCategory, errorDeleteCateogry }
}