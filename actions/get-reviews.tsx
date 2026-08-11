import { Review } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/reviews`;

const getReviews = async (id: string): Promise<Review[]> => {
    try {
        const res = await fetch(`${URL}/${id}`);
        if (!res.ok) return [];
        return await res.json();
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return [];
    }
}

export default getReviews;