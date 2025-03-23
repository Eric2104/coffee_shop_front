'use client'
import { useState } from "react"
import axios from "axios"
import { toast } from "@/hooks/use-toast"


export default function useDeleteCoffee() {
    const [loadingDeleteCoffee, setLoadingDeleteCoffee] = useState(false)
    const [errorDeleteCoffee, setErrorDeleteCoffee] = useState('')

    const deleteCoffee = async (id: number) => {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/coffee-app/coffees/${id}`
        setLoadingDeleteCoffee(true)
        setErrorDeleteCoffee('')
        try {
            await axios.delete(url)
            toast({
                title: "Éxito",
                description: "Elemento eliminado correctamente",
                variant: "default",
            })
        } catch (error: any) {
            setErrorDeleteCoffee(error.message)
            console.error('Error eliminando café:', error)
            toast({
                title: "Error",
                description: `Error eliminando elemento`,
                variant: "destructive",
            })
        } finally {
            setLoadingDeleteCoffee(false)
        }
    }

    return { deleteCoffee, loadingDeleteCoffee, errorDeleteCoffee }
}