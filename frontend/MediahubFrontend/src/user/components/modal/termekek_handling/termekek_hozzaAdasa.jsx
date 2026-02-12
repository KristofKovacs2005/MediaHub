import { useState } from "react";
import { useInsertTermek } from "./termekek_hooks";

export default function InsertTermekModal({ isClose, onSubmit }) {
    const { insertTermek } = useInsertTermek();
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("Kérem töltsön fel egy képet!");
        if (file.type !== "image/png") return alert("Csak PNG fájl engedélyezett!");

        try {
            await insertTermek({ i_name: name, author, i_description: description, tags, file });
            alert("Elem hozzáadva!");
            onSubmit?.({ i_name: name, author, i_description: description, tags, file });
        } catch (err) {
            console.error(err);
            alert("Hiba az elem hozzáadásakor!");
        }
    };

    return (
        <div className="modalContent">
            <h3>Új elem hozzáadása</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Név" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder="Szerző/Rendező" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <textarea placeholder="Leírás" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="text" placeholder="Tagek (vesszővel elválasztva)" value={tags} onChange={(e) => setTags(e.target.value)} />
                <input type="file" accept="image/png" onChange={(e) => setFile(e.target.files[0])} required />
                <div className="adminButtonGroup">
                    <button type="submit" className="btn btn-success">Hozzáadás</button>
                    <button type="button" className="btn btn-secondary" onClick={isClose}>Mégse</button>
                </div>
            </form>
        </div>
    );
}