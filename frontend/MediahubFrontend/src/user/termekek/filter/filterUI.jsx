export default function filterUi({ applyFilters, clearFilters, nameFilter, setNameFilter, tagsFilter, setTagsFilter, setLoading, setItems, setError }) {
    return (
        <section>
				{/* Filter UI */}
				<div className="filter-row">
					<input
						className="filter-input"
						placeholder="Search name..."
						value={nameFilter}
						onChange={(e) => setNameFilter(e.target.value)}
						aria-label="Search by name"
					/>
					<input
						className="filter-input"
						placeholder="Tags (comma separated)"
						value={tagsFilter}
						onChange={(e) => setTagsFilter(e.target.value)}
						aria-label="Filter by tags"
					/>
					<button className="filter-btn" onClick={() => applyFilters({ nameFilter, tagsFilter, setLoading, setItems, setError })}>Szűrés</button>
					<button className="filter-btn" onClick={() => clearFilters({ setNameFilter, setTagsFilter, setLoading, setItems, setError })}>Clear</button>
				</div>
		</section>
    )
}