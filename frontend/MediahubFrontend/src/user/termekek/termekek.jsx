import React, { useEffect, useState } from "react";
import LoadItems from "./load";
import { applyFilters, clearFilters } from "./filterFunction.jsx";
import FilterUI from "./filterUI";
import TermekekSection from "./termekekSection";

export default function Termekek() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [nameFilter, setNameFilter] = useState("");
	const [tagsFilter, setTagsFilter] = useState("");

	// initial load (no filters)
	useEffect(() => {
		LoadItems({ setLoading, setItems, setError });
	}, []);

	if (loading) return <section>Loading items…</section>;
	if (error) return <section>Error loading items: {error}</section>;

	return (
		<div className="termekekMainDiv">
			<FilterUI
				applyFilters={applyFilters}
				clearFilters={clearFilters}
				nameFilter={nameFilter}
				setNameFilter={setNameFilter}
				tagsFilter={tagsFilter}
				setTagsFilter={setTagsFilter}
				setLoading={setLoading}
				setItems={setItems}
				setError={setError}
			/>
			<TermekekSection items={items} />
		</div>
	);
}