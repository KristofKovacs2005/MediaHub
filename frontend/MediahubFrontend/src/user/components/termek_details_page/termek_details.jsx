export function TermekDetails({ item, tags }) {
	const stockNumber = Number(item.amount) || 0;//biztosra megy hogy a item.amount szám legyen, ha nem parse-olható akkor 0 lesz belőle
	const itemStock = stockNumber > 0 ? true:false; // ha stockNumber nagyobb mint 0 akkor true lesz az itemStock értéke, egyébként false
	return (
		<section className="detailsSection">
			<div className="container-lg">
				<div className="row g-4 align-items-start">
					{/* Image Column */}
					<div className="col-lg-4 col-md-5 d-flex justify-content-center">
						<img 
							src={"http://localhost:3000" + (item.img_url || "/uploads/images.jpeg")} 
							alt={item.i_name} 
							className="detailsImage img-fluid"
						/>
					</div>

					{/* Details Column */}
					<div className="col-lg-8 col-md-7">
						<h1 className="detailsTitle mb-3">{item.i_name || "Nincs cím"}</h1>

						<p className="detailsCreator mb-2">
							<strong>Szerző:</strong> {item.author || "Ismeretlen"}
						</p>

						<p className="detailsDescription mb-3">
							{item.i_description || "Nincs leírás"}
						</p>
						<p>
							{itemStock ? (<span className="text-success">Raktáron: {item.amount} db</span>) : (
								<span className="text-danger">Nincs raktáron</span>
							)}
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
							<button className="btn btn-primary btn-lg btnBorrow" disabled={!itemStock}>
								Kölcsönzés
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}