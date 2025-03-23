'use client'
import { useState } from "react"
import axios from "axios"
import { toast } from "@/hooks/use-toast"

export default function useDeleteOrigin() {
    const [loadingDeleteOrigin, setLoadingDeleteOrigin] = useState(false)
    const [errorDeleteOrigin, setErrorDeleteOrigin] = useState('')

    const deleteOrigin = async (id: number) => {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/coffee-app/origin/${id}`
        setLoadingDeleteOrigin(true)
        setErrorDeleteOrigin('')
        try {
            await axios.delete(url)
            toast({
                title: "Éxito",
                description: "Elemento eliminado correctamente",
                variant: "default",
            })
        } catch (error: any) {
            setErrorDeleteOrigin(error.message)
            console.error('Error eliminando origin:', error)
            toast({
                title: "Error",
                description: `Error eliminando elemento, asegurate de que no esté asociado a un café`,
                variant: "destructive",
            })
        } finally {
            setLoadingDeleteOrigin(false)
        }
    }

    return { deleteOrigin, loadingDeleteOrigin, errorDeleteOrigin }
}