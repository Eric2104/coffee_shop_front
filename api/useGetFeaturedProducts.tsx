import { useEffect, useState } from "react"

export function useGetFeaturedProduct(){
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/coffee-app/coffees?filters%5Bfeatured%5D%5B%24eq%5D=true`
    const [result, setResult]=useState(null)
    const [loading, setLoading] =useState(true)
    const [error, setError] =useState('')

    useEffect(()=>{
        (async () => {
            try {
                const res = await fetch(url)
                const json = await res.json()
                setResult(json)
                setLoading(false)
            } catch (error:any) {
                setError(error)
                setLoading(false)
            }
        })()
    },[url])

    return {loading, error, result}
}