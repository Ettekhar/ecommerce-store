import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProducts = async (id: string): Promise<Product | null> => {
    try {
        const res = await fetch(`${URL}/${id}`);
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

export default getProducts;