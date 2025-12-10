import React, { useEffect, useState } from "react";
import Termek from "./termek";

export default function Termekek() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// filter UI state
	const [nameFilter, setNameFilter] = useState("");
	const [tagsFilter, setTagsFilter] = useState("");

	// core loader; accepts an optional params object { name, tags }
	async function load(params = {}) {
		const base = "http://localhost:3000/items";
		const sp = new URLSearchParams();

		// backend expects 'name' to be a LIKE pattern, so put wildcards
		if (params.name) sp.set("name", `%${params.name}%`);
		// backend expects 'tags' as CSV (it will split and wrap with % internally)
		if (params.tags) sp.set("tags", params.tags);

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

			// normalize i_description once here
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

	// initial load (no filters)
	useEffect(() => {
		load();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// UI handlers
	function applyFilters() {
		load({ name: nameFilter.trim(), tags: tagsFilter.trim() });
	}
	function clearFilters() {
		setNameFilter("");
		setTagsFilter("");
		load();
	}

	if (loading) return <section>Loading items…</section>;
	if (error) return <section>Error loading items: {error}</section>;

	return (
		<>
		<section>
			<h2>Products</h2>
			
			{/* Filter UI */}
			<div style={{ marginBottom: 12, display: "flex", gap: 8 }}>
				<input
					placeholder="Search name..."
					value={nameFilter}
					onChange={(e) => setNameFilter(e.target.value)}
				/>
				<input
					placeholder="Tags (comma separated)"
					value={tagsFilter}
					onChange={(e) => setTagsFilter(e.target.value)}
				/>
				<button className="filter-btn" onClick={applyFilters}>Szűrés</button>
				<button className="filter-btn" onClick={clearFilters}>Clear</button>
			</div>
		</section>
		<section className="termekekSection">
			{items.length === 0 ? (
				<p>No items found.</p>
			) : (
				<section className="kartyakSection">
					{items.map((it, idx) => (
						<Termek
							key={it?.i_id ?? it?.id ?? idx}
							author={it?.author}
							i_name={it?.i_name}
							img_url={it?.img_url}
							i_description={it?.i_description}
						/>
					))}
				</section>
			)}
		</section>
		</>
	);
}