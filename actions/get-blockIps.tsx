import { BlockIps } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/block-ip`;

const getBlockIps = async (): Promise<BlockIps[]> => {
    try {
        const res = await fetch(URL);
        if (!res.ok) return [];
        return await res.json();
    } catch (error) {
        console.error("Error fetching block IPs:", error);
        return [];
    }
}

export default getBlockIps;