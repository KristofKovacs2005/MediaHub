export default async function LoadItems({ name, tags, setLoading, setError, setItems } = {}) {
    const base = "http://localhost:3000/items";// Base URL for fetching items
    const sp = new URLSearchParams();// Initialize URLSearchParams to build query string

    if (name) sp.set("name", `%${name}%`);// Add name to query parameters if provided
    if (tags) sp.set("tags", tags);// Add tags to query parameters if provided

    const url = sp.toString() ? `${base}?${sp.toString()}` : base;

    const controller = new AbortController();// Create an AbortController to handle fetch cancellation
    setLoading(true);// Indicate that loading has started
    setError(null);// Clear any previous errors

    try {
        const res = await fetch(url, { signal: controller.signal });// Fetch data with abort signal
        if (!res.ok) {
            const text = await res.text().catch(() => null);// Attempt to read error text
            throw new Error(`Failed to load items (${res.status}) ${text || ""}`);// Throw error if response is not ok
        }
        const contentType = res.headers.get("content-type") || "";// Get content type from response headers
        const data = contentType.includes("application/json") ? await res.json() : [];// Parse JSON if content type is correct
        const raw = Array.isArray(data) ? data : [];// Ensure data is an array

        // Normalize i_description field

        const normalized = raw.map((it) => {
            const desc =
                typeof it?.i_description === "object" && it?.i_description?.data
                    ? String.fromCharCode(...it.i_description.data)
                    : it?.i_description || "";
            return { ...it, i_description: desc };
        });

        setItems(normalized);
    } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message || "Unknown error");
    } finally {
        setLoading(false);
    }

    return () => controller.abort();
}