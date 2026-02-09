export function TermekDetails({ item, tags }) {
	return (
		<section className="detailsSection">
			<div className="container-lg">
				<div className="row g-4 align-items-start">
					{/* Image Column */}
					<div className="col-lg-4 col-md-5 d-flex justify-content-center">
						<img 
							src={item.item_image || "/default-image.png"} 
							alt={item.item_name} 
							className="detailsImage img-fluid"
						/>
					</div>

					{/* Details Column */}
					<div className="col-lg-8 col-md-7">
						<h1 className="detailsTitle mb-3">{item.item_name || "Nincs cím"}</h1>

						<p className="detailsCreator mb-2">
							<strong>Szerző:</strong> {item.owner_name || "Ismeretlen"}
						</p>

						<p className="detailsDescription mb-3">
							{item.item_description || "Nincs leírás"}
						</p>

						{tags && tags.length > 0 && (
							<div className="detailsTags mb-3">
								{tags.map((tag) => (
									<span key={tag} className="badge bg-dark me-2 p-2">
										{tag}
									</span>
								))}
							</div>
						)}

						<div className="detailsActions">
							<button className="btn btn-primary btn-lg btnBorrow">
								Kölcsönzés
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}