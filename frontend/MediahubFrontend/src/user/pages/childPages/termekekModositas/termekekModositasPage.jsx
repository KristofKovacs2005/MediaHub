import { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../../../components/modal/modal";
import ConfirmModifyItem from "../../../components/modal/confirmModifyItem/confirmModifyItem.jsx";
import { handleModifyItem } from "../../../functions/items";
import { useLocation } from "react-router-dom";
export function TermekModositas() {
    const { id } = useParams() || {};
	const location = useLocation();
    const { item, tags } = location.state || {};

    const [iName, setIName] = useState(item?.i_name || "");
    const [author, setAuthor] = useState(item?.author || "");
    const [iDescription, setIDescription] = useState(item?.i_description || "");
    const [amount, setAmount] = useState(Number(item?.amount) || 0);
    const [itemTags, setItemTags] = useState(tags || []);
    const [image, setImage] = useState(item?.img_url || "/uploads/images.jpeg");
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState(null);

    const itemStock = amount > 0;

    const MAX_SIZE = 3 * 1024 * 1024; // 3MB

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > MAX_SIZE) {
            alert("A kép túl nagy! Maximum 3MB.");
            return;
        }

        setImageFile(file);
        setImage(URL.createObjectURL(file));
    };

    // Handle tag add/remove
    const handleTagChange = (index, value) => {
        const newTags = [...itemTags];
        newTags[index] = value;
        setItemTags(newTags);
    };

    const addTag = () => setItemTags([...itemTags, ""]);
    const removeTag = (index) => setItemTags(itemTags.filter((_, i) => i !== index));

    // Handle submit
    const handleSubmit = async () => {
        try {
            await handleModifyItem(id, {
                i_name: iName,
                author,
                i_description: iDescription,
                amount,
                tags: itemTags.join(","), // ⚠ comma-separated for backend
                imageFile
            });
            alert("Sikeres módosítás!");
            setIsOpenModal(false);
        } catch (err) {
            alert(err.message || "Hiba történt");
        }
    };

    return (
        <section className="detailsSection">
            <div className="container-lg">
                <div className="row g-4 align-items-start">
                    {/* Image column */}
                    <div className="col-lg-4 col-md-5 d-flex flex-column align-items-center">
                        <img
                            src={"http://localhost:3000" + image}
                            alt={iName}
                            className="detailsImage img-fluid mb-3"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="form-control"
                        />
                    </div>

                    {/* Details column */}
                    <div className="col-lg-8 col-md-7">
                        <input
                            type="text"
                            className="form-control mb-3"
                            value={iName}
                            onChange={(e) => setIName(e.target.value)}
                            placeholder="Termék neve"
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Szerző"
                        />
                        <textarea
                            className="form-control mb-3"
                            value={iDescription}
                            onChange={(e) => setIDescription(e.target.value)}
                            placeholder="Leírás"
                            rows={4}
                        />
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
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => removeTag(index)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={addTag}
                            >
                                Új tag hozzáadása
                            </button>
                        </div>

                        <button className="btn btn-success" onClick={() => setIsOpenModal(true)}>
                            Módosítás
                        </button>

                        <Modal isOpen={isOpenModal} isClose={() => setIsOpenModal(false)}>
                            <ConfirmModifyItem
                                termek={{ i_name: iName }}
                                isClose={() => setIsOpenModal(false)}
                                onConfirm={handleSubmit}
                            />
                        </Modal>
                    </div>
                </div>
            </div>
        </section>
    );
}