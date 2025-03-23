import { useEffect, useState, useCallback } from "react";

export function useGetCategories() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/coffee-app/categories`;
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(url);
            const json = await res.json();
            setResult(json);
            setLoading(false);
        } catch (error: any) {
            setError(error);
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { loading, error, result, refetch: fetchData };
}