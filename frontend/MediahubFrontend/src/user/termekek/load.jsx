export default async function LoadItems({ name, tags, setLoading, setError, setItems } = {}) {
    const base = "http://localhost:3000/items";
    const sp = new URLSearchParams();

    if (name) sp.set("name", `%${name}%`);
    if (tags) sp.set("tags", tags);

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