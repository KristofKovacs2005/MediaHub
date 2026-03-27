import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import Modal from "../../components/modal/modal.jsx";
import ConfirmModifyItem from "../../components/modal/confirmItemModal/confirmModifyItem/confirmModifyItem.jsx";
import { handleModifyItem } from "../../functions/items.js";
import { fetchTags } from "../../functions/tags.js";
import "./termekekModositas.css"

export function TermekModositas() {
    const { id } = useParams() || {};
    const navigate = useNavigate();
    const location = useLocation();
    const { item, tags } = location.state || {};

    // Product details
    const [iName, setIName] = useState(item?.i_name || "");
    const [author, setAuthor] = useState(item?.author || "");
    const [iDescription, setIDescription] = useState(item?.i_description || "");
    const [amount, setAmount] = useState(Number(item?.amount) || 0);
    const [image, setImage] = useState(item?.img_url || "/uploads/images.jpeg");
    const [imageFile, setImageFile] = useState(null);

    // Modal state
    const [isOpenModal, setIsOpenModal] = useState(false);

    // Tags
    const [itemTags, setItemTags] = useState(
        Array.isArray(tags)
            ? tags.map(t => typeof t === "object" ? t.t_name : t)
            : tags?.split(",").map(t => t.trim()) || []
    );
    const [availableTags, setAvailableTags] = useState([]);

    const itemStock = amount > 0;
    const MAX_SIZE = 3 * 1024 * 1024; // 3MB

    // Fetch available tags
    useEffect(() => {
        const getTags = async () => {
            await fetchTags(setAvailableTags, () => {});
        };
        getTags();
    }, []);

    // Image change
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

    // Add tag (like FilterBar)
    const addTagFromDropdown = (tagName) => {
        setItemTags(prev => prev.includes(tagName) ? prev : [...prev, tagName]);
    };

    // Remove tag
    const removeTag = (tagName) => {
        setItemTags(prev => prev.filter(t => t !== tagName));
    };

    // Submit
    const handleSubmit = async () => {
        // Map tag names to IDs for backend
        const tagIDs = itemTags
            .map(name => availableTags.find(t => t.t_name === name)?.t_id)
            .filter(Boolean);

        try {
            await handleModifyItem(id, {
                i_name: iName,
                author,
                i_description: iDescription,
                amount,
                tags: tagIDs, // send IDs
                imageFile
            });
            alert("Sikeres módosítás!");
            setIsOpenModal(false);
            navigate("/termek_details");
        } catch (err) {
            alert(err.message || "Hiba történt");
        }
    };

    return (
        <section className="termekModSection">
            {/* Image column */}
            <div className="termekModImageColumn">
                <img
                    src={image ? "http://localhost:3000" + image : image}
                    alt={iName}
                    className="termekModImage"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="termekModInputFile"
                />
            </div>

            {/* Details column */}
            <div className="termekModDetailsColumn">
                <input
                    type="text"
                    className="termekModInput"
                    value={iName}
                    onChange={(e) => setIName(e.target.value)}
                    placeholder="Termék neve"
                />
                <input
                    type="text"
                    className="termekModInput"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Szerző"
                />
                <textarea
                    className="termekModTextarea"
                    value={iDescription}
                    onChange={(e) => setIDescription(e.target.value)}
                    placeholder="Leírás"
                    rows={4}
                />
                <input
                    type="number"
                    className="termekModInput"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min={0}
                    placeholder="Mennyiség"
                />

                <p className="termekModStock">
                    {itemStock ? (
                        <span className="text-success">Raktáron: {amount} db</span>
                    ) : (
                        <span className="text-danger">Nincs raktáron</span>
                    )}
                </p>

                {/* Existing tags (removable only) */}
                <div className="termekModTags mb-3">
                    {itemTags.map((tag) => (
                        <span key={tag} className="tagRow">
                            <button
                                type="button"
                                className="termekModButton"
                                style={{ backgroundColor: "#dc3545" }}
                                onClick={() => removeTag(tag)}
                            >
                                {tag} ×
                            </button>
                        </span>
                    ))}
                </div>

                {/* Available tags dropdown */}
                <div className="availableTags mb-3">
                    <p>Választható címkék:</p>
                    {availableTags.map((tag) => {
                        const isSelected = itemTags.includes(tag.t_name);
                        return (
                            <button
                                key={tag.t_id}
                                type="button"
                                className="termekModButton"
                                style={{
                                    margin: "2px",
                                    backgroundColor: isSelected ? "#6c757d" : "#0d6efd",
                                    color: "#fff"
                                }}
                                onClick={() => addTagFromDropdown(tag.t_name)}
                                disabled={isSelected}
                            >
                                {tag.t_name} {isSelected ? "✓" : ""}
                            </button>
                        );
                    })}
                </div>

                {/* Submit buttons */}
                <div className="modButtonRow">
                    <button
                        className="termekModButton"
                        onClick={() => setIsOpenModal(true)}
                    >
                        Módosítás
                    </button>
                    <Link to={`/termek_details`} className="btn btn-primary termekModButton">
                        Vissza
                    </Link>
                </div>

                <Modal isOpen={isOpenModal} isClose={() => setIsOpenModal(false)}>
                    <ConfirmModifyItem
                        termek={{ i_name: iName }}
                        isClose={() => setIsOpenModal(false)}
                        onConfirm={handleSubmit}
                    />
                </Modal>
            </div>
        </section>
    );
}