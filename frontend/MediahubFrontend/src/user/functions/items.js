import { decodeBuffer } from "../util/decoder";
export async function fetchItems({ name, tags, author, setLoading, setError, setItems } = {}) {
    const base = "http://localhost:3000/items";
    const sp = new URLSearchParams();
    if (name) sp.set("name", `%${name}%`);
    if (tags) sp.set("tags", tags);
    if (author) sp.set("author", author);
    const url = sp.toString() ? `${base}?${sp.toString()}` : base;
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
            const text = await res.text().catch(() => null);
            throw new Error(`Failed to load items (${res.status}) ${text || ""}`);
        }
        const contentType = res.headers.get("content-type") || "";
        const data = contentType.includes("application/json") ? await res.json() : [];
        const raw = Array.isArray(data) ? data : [];
        const normalized = raw.map(item => ({
                    ...item,
                    i_description: item.i_description ? decodeBuffer(item.i_description) : ""
                }));
        setItems(normalized);
    } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message || "Unknown error");
    } finally {
        setLoading(false);
    }
    return () => controller.abort();
}