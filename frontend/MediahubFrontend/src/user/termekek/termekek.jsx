import React, { useEffect, useState } from "react";
import Termek from "./termek";

export default function Termekek() {
	const [items, setItems] = useState([]);// State to hold fetched items
	const [loading, setLoading] = useState(true);// Loading state
	const [error, setError] = useState(null);// Error state

	useEffect(() => {// Fetch items from the backend API
		const url = `http://localhost:3000/items`;// Adjust the URL as needed
		const controller = new AbortController();// For aborting fetch on unmount

		async function load() {// Load items from the API
			try {// Start loading
				setLoading(true);// Reset error state
				const res = await fetch(url, { signal: controller.signal });// Fetch data
				if (!res.ok) {// Handle non-OK responses
					const text = await res.text().catch(() => null);// Try to get response text
					throw new Error(`Failed to load items (${res.status}) ${text || ""}`);// Throw error with status and text
				}
				const contentType = res.headers.get("content-type") || "";// Get content type
				const data = contentType.includes("application/json") ? await res.json() : null;// Parse JSON if applicable
				setItems(Array.isArray(data) ? data : []);// Update items state
			} catch (err) {// Handle errors
				if (err.name === "AbortError") return;// Ignore abort errors
				setError(err.message || "Unknown error");// Set error message
			} finally {// Finalize loading state
				setLoading(false);// Stop loading
			}
		}

		load();// Initiate loading
		return () => controller.abort();// Cleanup on unmount
	}, []);

	if (loading) return <section>Loading items…</section>;// Show loading state
	if (error) return <section>Error loading items: {error}</section>;// Show error state

	return (
    <section className="mainTermekekSection">
        <h2>Products</h2>
        <section className="termekekSection">
        {items.length === 0 && <p>No items found.</p>}
        {items.length > 0 && items.map((it, idx) => {
        const desc = typeof it?.i_description === "object" && it?.i_description?.data
            ? String.fromCharCode(...it.i_description.data)
            : it?.i_description || "";
        return (
            <Termek
                key={it?.i_id ?? it?.id ?? idx}
                i_id={it?.i_id}
                author={it?.author}
                i_name={it?.i_name}
                img_url={it?.img_url}
                i_description={desc}
            />  
            );
    })}
    </section>
    </section>);
}