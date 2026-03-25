import { useState, useEffect } from "react";
import Modal from "../../../components/modal/modal";
import ConfirmNewItem from "../../../components/modal/confirmnewItem/confirmNewItem";
import { handleInsertItem } from "../../../functions/items";
import { fetchTags } from "../../../functions/tags";
import "./termekekHozzadasaPage.css"

export function TermekHozzadas() {
    const [isOpenModal, setIsOpenModal] = useState(false);

    // Product inputs
    const [iName, setIName] = useState("");
    const [author, setAuthor] = useState("");
    const [iDescription, setIDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState(null)

    // Tag state
    const [availableTags, setAvailableTags] = useState([]); // local state
    const [selectedTags, setSelectedTags] = useState([]);


    useEffect(() => {
        const getTags = async () => {
            await fetchTags(setAvailableTags, setError);
        };

        getTags();
    }, []);

    const handleTagClick = (tag) => {
        if (!selectedTags.includes(tag)) setSelectedTags((prev) => [...prev, tag]);
    };

    const handleTagRemove = (tag) => {
        setSelectedTags((prev) => prev.filter((t) => t !== tag));
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
        const newItem = await handleInsertItem({
            i_name: iName,           // snake_case for DB
            author,
            i_description: iDescription,
            amount,
            itemTags: selectedTags,  // make sure backend expects array of tag IDs or names
            imageFile
        });
        console.log("Inserted item:", newItem);
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
                        <img src={image || "/uploads/images.jpeg"} alt="Termék" className="detailsImage img-fluid mb-3" />
                        <input type="file" accept="image/*" onChange={handleImageChange} className="form-control" />
                    </div>

                    {/* Details column */}
                    <div className="col-lg-8 col-md-7">
                        <input type="text" className="form-control mb-3" value={iName} onChange={(e) => setIName(e.target.value)} placeholder="Termék neve" />
                        <input type="text" className="form-control mb-2" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Szerző" />
                        <textarea className="form-control mb-3" value={iDescription} onChange={(e) => setIDescription(e.target.value)} placeholder="Leírás" rows={4} />
                        <input type="number" className="form-control mb-3" value={amount} onChange={(e) => setAmount(Number(e.target.value))} min={0} placeholder="Mennyiség" />

                        {/* Tag box */}
                        {/* Tag box */}
                        <div className="tags-box">
                            {availableTags.map(tagObj => (
                                <button key={tagObj.t_id} className="tags" type="button" onClick={() => handleTagClick(tagObj.t_name)}>
                                    {tagObj.t_name}  {/* <-- THIS is the string, not the object */}
                                </button>
                            ))}
                        </div>

                        {/* Selected tags */}
                        <div className="selected-tags mb-3">
                            {selectedTags.map((tag) => (
                                <span key={tag} className="tag-chip">
                                    {tag}
                                    <button type="button" className="removeTagBtn" onClick={() => handleTagRemove(tag)}>×</button>
                                </span>
                            ))}
                        </div>

                        <button className="btn btn-success" onClick={() => setIsOpenModal(true)}>Új termék hozzáadása</button>

                        <Modal isOpen={isOpenModal} isClose={() => setIsOpenModal(false)}>
                            <ConfirmNewItem
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