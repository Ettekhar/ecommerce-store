import { SiteSettings } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/siteSetting`;

const getSiteInfos = async (): Promise<SiteSettings[]> => {
    try {
        const res = await fetch(`${URL}`);
        if (!res.ok) return [];
        return await res.json();
    } catch (error) {
        console.error("Error fetching site settings:", error);
        return [];
    }
}

export default getSiteInfos;