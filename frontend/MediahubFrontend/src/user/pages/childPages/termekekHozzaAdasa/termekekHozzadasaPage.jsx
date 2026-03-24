import Modal from "../modal/modal";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function TermekDetails() {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const { id } = useParams() || {};

	// Empty initial state for a new product
	const [iName, setIName] = useState(""); // termék neve
	const [author, setAuthor] = useState(""); // szerző
	const [iDescription, setIDescription] = useState(""); // leírás
	const [amount, setAmount] = useState(0); // mennyiség
	const [itemTags, setItemTags] = useState([]); // címkék
	const [image, setImage] = useState(""); // kép URL
	const [imageFile, setImageFile] = useState(null); // kép fájl

	const itemStock = amount > 0;

	// Tag handlers
	const handleTagChange = (index, value) => {
		const newTags = [...itemTags];
		newTags[index] = value;
		setItemTags(newTags);
	};

	const addTag = () => setItemTags([...itemTags, ""]);
	const removeTag = (index) => setItemTags(itemTags.filter((_, i) => i !== index));

	// Image handler
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);
			setImage(URL.createObjectURL(file));
		}
	};

	return (
		<section className="detailsSection">
			<div className="container-lg">
				<div className="row g-4 align-items-start">
					{/* Image Column */}
					<div className="col-lg-4 col-md-5 d-flex flex-column align-items-center">
						<img 
							src={image || "/uploads/images.jpeg"} 
							alt="Termék képe" 
							className="detailsImage img-fluid mb-3"
						/>
						<input 
							type="file" 
							accept="image/*" 
							onChange={handleImageChange} 
							className="form-control"
						/>
					</div>

					{/* Details Column */}
					<div className="col-lg-8 col-md-7">
						{/* Name input */}
						<input
							type="text"
							className="form-control mb-3"
							value={iName}
							onChange={(e) => setIName(e.target.value)}
							placeholder="Termék neve"
						/>

						{/* Author input */}
						<input
							type="text"
							className="form-control mb-2"
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
							placeholder="Szerző"
						/>

						{/* Description input */}
						<textarea
							className="form-control mb-3"
							value={iDescription}
							onChange={(e) => setIDescription(e.target.value)}
							placeholder="Leírás"
							rows={4}
						/>

						{/* Amount input */}
						<input
							type="number"
							className="form-control mb-3"
							value={amount}
							onChange={(e) => setAmount(Number(e.target.value))}
							min={0}
							placeholder="Mennyiség"
						/>
						<p>
							{itemStock ? (
								<span className="text-success">Raktáron: {amount} db</span>
							) : (
								<span className="text-danger">Nincs raktáron</span>
							)}
						</p>

						{/* Tags */}
						<div className="mb-3">
							{itemTags.map((tag, index) => (
								<div key={index} className="d-flex mb-2">
									<input
										type="text"
										className="form-control me-2"
										value={tag}
										onChange={(e) => handleTagChange(index, e.target.value)}
										placeholder="Tag"
									/>
									<button type="button" className="btn btn-danger" onClick={() => removeTag(index)}>
										X
									</button>
								</div>
							))}
							<button type="button" className="btn btn-secondary btn-sm" onClick={addTag}>
								Új tag hozzáadása
							</button>
						</div>

						{/* Modal */}
						<Modal isOpen={isOpenModal} isClose={() => setIsOpenModal(false)}>
							<div className="p-3">
								<h5>Modal tartalom</h5>
								<p>Itt bármit megjeleníthetsz.</p>
							</div>
						</Modal>
					</div>
				</div>
			</div>
		</section>
	);
}