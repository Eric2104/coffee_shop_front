'use client'
import { ResultType } from "@/types/filters"
import { useEffect, useState } from "react"


export default function useGetProductField() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/coffee-app/origin`
    const [result, setResult]=useState<ResultType | null>(null)
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