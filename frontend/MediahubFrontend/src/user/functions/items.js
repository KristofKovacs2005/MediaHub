import { decodeBuffer } from "../util/decoder";
import { buildItemFormData } from "./formDataBuilder";
import { apiCall } from "./apiCall";
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

export async function handleDeleteItem(id) {
    try {
        const token = localStorage.getItem("authToken")
        const url = `http://localhost:3000/items/${id}`;
        return await apiCall(url, "DELETE",null,token);
    } catch (err) {
        alert("Váratlan hiba történt");
    }
}

export async function handleModifyItem(id, { i_name, author, i_description, amount, tags, imageFile }) {
    try {
        const token = localStorage.getItem("authToken");
        const url = `http://localhost:3000/items/${id}`;
        const formData = buildItemFormData({ i_name, author, i_description, amount, tags, imageFile });

        const res = await fetch(url, {
            method: "PATCH",
            headers: {
                "x-access-token": token || ""
            },
            body: formData
        });

        if (!res.ok) throw new Error("Hiba történt az elem módosítása során");

        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
            return await res.json(); // full updated item JSON
        }

        return null;
    } catch (err) {
        throw err;
    }
}

export async function handleInsertItem({ i_name, author, i_description, amount, tags, imageFile }) {
    try {
        const token = localStorage.getItem("authToken");
        const url = `http://localhost:3000/items`;
        const formData = buildItemFormData({ i_name, author, i_description, amount, tags, imageFile });

        const res = await fetch(url, {
            method: "POST", // must be POST for insert
            headers: {
                "x-access-token": token || ""
            },
            body: formData
        });

        if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Server error");
        }

        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
            return await res.json(); // full inserted item JSON
        }

        return null;
    } catch (err) {
        throw err;
    }
}