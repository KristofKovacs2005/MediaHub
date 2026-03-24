import { apiCall } from "./apiCall";

export async function fetchTags(setTags, setError) {
    try {
        const data = await apiCall("http://localhost:3000/tags");
        setTags(data);
    } catch (err) {
        setError(err.message || "Unknown error fetching tags");
    }
}