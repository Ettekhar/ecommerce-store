import { AvatarImage } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/avatar`;

const getAvatarImages = async (): Promise<AvatarImage | null> => {
    try {
        const res = await fetch(`${URL}`);
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Error fetching avatar images:", error);
        return null;
    }
}

export default getAvatarImages;