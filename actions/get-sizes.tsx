import { Size } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

const getSizes = async (): Promise<Size[]> => {
    try {
        const res = await fetch(URL);
        if (!res.ok) return [];
        return await res.json();
    } catch (error) {
        console.error("Error fetching sizes:", error);
        return [];
    }
}

export default getSizes;