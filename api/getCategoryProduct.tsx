import { useEffect, useState } from "react"

export function useGetCategoryProduct(slug: string | string[]){
    // const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[category][slug][$eq]=${slug}`
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/coffee-app/coffees?filters%5Bcategory%5D%5Bslug%5D%5B%24eq%5D=${slug}`;
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