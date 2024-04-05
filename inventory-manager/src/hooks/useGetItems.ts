import { useEffect, useState } from "react";

export default function useGetItems(q?: string) {
    const [items, setItems] = useState<Product[] | null>(null);
    const [query, setQuery] = useState<string | undefined>(q);

    const getItems = async (q?: string) => {
        const response = await fetch(`http://127.0.0.1:8000/get_items/?q=${q || ''}`);
        const data = await response.json();

        const products = data.map((item: Array<unknown>) => {
            return ({
                name: item[0],
                description: item[1],
                category: item[2],
                stock: item[3]
            } as Product)
        })
        
        setItems(products);
    }

    useEffect(() => {
        getItems(q);
    },[]);

    useEffect(() => {
        getItems(query);
    },[query]);

    useEffect(() => {
        console.log(items)
    },[items])

    return { items, setQuery };
}