import Modal from "../../../components/modal/modal";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function TermekModositas({ item, tags }) {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const { id } = useParams() || {};

	// Local state for inputs
	const [iName, setIName] = useState(item.i_name || "");
	const [author, setAuthor] = useState(item.author || "");
	const [iDescription, setIDescription] = useState(item.i_description || "");
	const [amount, setAmount] = useState(Number(item.amount) || 0);
	const [itemTags, setItemTags] = useState(tags || []);
	const [image, setImage] = useState(item.img_url || "/uploads/images.jpeg"); // store image URL
	const [imageFile, setImageFile] = useState(null); // store actual file if needed

	const itemStock = amount > 0;

	// Handle tag input changes
	const handleTagChange = (index, value) => {
		const newTags = [...itemTags];
		newTags[index] = value;
		setItemTags(newTags);
	};

	// Add new tag
	const addTag = () => setItemTags([...itemTags, ""]);

	// Remove tag
	const removeTag = (index) => {
		const newTags = itemTags.filter((_, i) => i !== index);
		setItemTags(newTags);
	};

	// Handle image change
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);
			setImage(URL.createObjectURL(file)); // update preview
		}
	};

	return (
		<section className="detailsSection">
			<div className="container-lg">
				<div className="row g-4 align-items-start">
					{/* Image Column */}
					<div className="col-lg-4 col-md-5 d-flex flex-column align-items-center">
						<img 
							src={image.startsWith("http") ? "http://localhost:3000" + image : image} 
							alt={iName} 
							className="detailsImage img-fluid mb-3"
						/>
						{/* File input to change image */}
						<input 
							type="file" 
							accept="image/*" 
							onChange={handleImageChange} 
							className="form-control"
						/>
					</div>

					{/* Details Column */}
					<div className="col-lg-8 col-md-7">
						{/* Editable Name */}
						<input
							type="text"
							className="form-control mb-3"
							value={iName}
							onChange={(e) => setIName(e.target.value)}
							placeholder="Termék neve"
						/>

						{/* Editable Author */}
						<input
							type="text"
							className="form-control mb-2"
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
							placeholder="Szerző"
						/>

						{/* Editable Description */}
						<textarea
							className="form-control mb-3"
							value={iDescription}
							onChange={(e) => setIDescription(e.target.value)}
							placeholder="Leírás"
							rows={4}
						/>

						{/* Editable Amount */}
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

						{/* Editable Tags */}
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
							<button type="button" className="btn btn-secondary btn-sm" onClick={addTag}>Új tag hozzáadása</button>
						</div>

						{/* Modal wrapper */}
						<Modal isOpen={isOpenModal} isClose={() => setIsOpenModal(false)}>
							{/* You can put anything inside the modal if needed */}
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