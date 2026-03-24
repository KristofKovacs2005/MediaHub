export async function apiCall(url, method = "GET", bodyObject = null, token = null) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["x-access-token"] = token;

    try {
        const res = await fetch(url, { method, headers, body: bodyObject ? JSON.stringify(bodyObject) : null });

        if (!res.ok) {
            let errMsg = "Hiba történt";
            const contentType = res.headers.get("content-type") || "";

            if (contentType.includes("application/json")) {
                const errData = await res.json().catch(() => ({}));
                errMsg = errData.message || errMsg;
            } else {
                // fallback for plain text
                const text = await res.text().catch(() => "");
                if (text) errMsg = text;
            }

            throw new Error(errMsg);
        }

        // return JSON if possible
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) return await res.json();
        return null; // no content
    } catch (err) {
        console.error("API error:", err);
        throw err;
    }
}