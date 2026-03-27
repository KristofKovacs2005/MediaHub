import { useState, useEffect } from "react";
import Modal from "../../components/modal/modal";
import ConfirmNewItem from "../../components/modal/confirmItemModal/confirmnewItem/confirmNewItem";
import { handleInsertItem } from "../../functions/items";
import { fetchTags } from "../../functions/tags";
import "./termekekHozzadasaPage.css"
import { useNavigate } from "react-router-dom";

export function TermekHozzadas() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const navigate = useNavigate();

    // Product inputs
    const [iName, setIName] = useState("");
    const [author, setAuthor] = useState("");
    const [iDescription, setIDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [image, setImage] = useState("/uploads/images.jpeg");
    const [imageFile, setImageFile] = useState(null);

    // Tag state
    const [availableTags, setAvailableTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        const getTags = async () => {
            await fetchTags(setAvailableTags, () => {});
        };
        getTags();
    }, []);

    const handleTagClick = (tag) => {
        if (!selectedTags.includes(tag)) setSelectedTags(prev => [...prev, tag]);
    };

    const handleTagRemove = (tag) => {
        setSelectedTags(prev => prev.filter(t => t !== tag));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        try {
            await handleInsertItem({
                i_name: iName,
                author,
                i_description: iDescription,
                amount,
                tags: selectedTags,
                imageFile
            });
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
                <img src={image} alt={iName} className="termekModImage" />
                <input type="file" accept="image/*" onChange={handleImageChange} className="termekModInputFile" />
            </div>

            {/* Details column */}
            <div className="termekModDetailsColumn">
                <input type="text" className="termekModInput" value={iName} onChange={(e) => setIName(e.target.value)} placeholder="Termék neve" />
                <input type="text" className="termekModInput" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Szerző" />
                <textarea className="termekModTextarea" value={iDescription} onChange={(e) => setIDescription(e.target.value)} placeholder="Leírás" rows={4} />
                <input type="number" className="termekModInput" value={amount} onChange={(e) => setAmount(Number(e.target.value))} min={0} placeholder="Mennyiség" />

                {/* Selected tags */}
                <div className="termekModTags mb-3">
                    {selectedTags.map(tag => (
                        <span key={tag} className="tagRow">
                            <button type="button" className="termekModButton" style={{ backgroundColor: "#dc3545" }} onClick={() => handleTagRemove(tag)}>
                                {tag} ×
                            </button>
                        </span>
                    ))}
                </div>

                {/* Available tags */}
                <div className="availableTags mb-3">
                    <p>Választható címkék:</p>
                    {availableTags.map(tagObj => {
                        const isSelected = selectedTags.includes(tagObj.t_name);
                        return (
                            <button key={tagObj.t_id} type="button" className="termekModButton"
                                style={{
                                    margin: "2px",
                                    backgroundColor: isSelected ? "#6c757d" : "#0d6efd",
                                    color: "#fff"
                                }}
                                onClick={() => handleTagClick(tagObj.t_name)}
                                disabled={isSelected}
                            >
                                {tagObj.t_name} {isSelected ? "✓" : ""}
                            </button>
                        )
                    })}
                </div>

                {/* Submit button */}
                <div className="modButtonRow">
                    <button className="termekModButton" onClick={() => setIsOpenModal(true)}>Új termék hozzáadása</button>
                </div>

                <Modal isOpen={isOpenModal} isClose={() => setIsOpenModal(false)}>
                    <ConfirmNewItem termek={{ i_name: iName }} isClose={() => setIsOpenModal(false)} onConfirm={handleSubmit} />
                </Modal>
            </div>
        </section>
    );
}