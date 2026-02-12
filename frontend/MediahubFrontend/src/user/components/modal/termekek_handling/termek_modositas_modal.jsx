import { useState } from "react";
import { useModifyTermek } from "./termekek_hooks";

export default function ModifyTermekModal({ termek, isClose, onSubmit }) {
    const { modifyTermek } = useModifyTermek();
    const [name, setName] = useState(termek.i_name);
    const [author, setAuthor] = useState(termek.author);
    const [description, setDescription] = useState(termek.i_description);
    const [tags, setTags] = useState(termek.tagek || "");
    const [file, setFile] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await modifyTermek(termek.i_id, { i_name: name, author, i_description: description, tags, file });
            alert("Elem módosítva!");
            onSubmit?.({ i_id: termek.i_id, i_name: name, author, i_description: description, tags, file });
        } catch (err) {
            console.error(err);
            alert("Hiba az elem módosításakor!");
        }
    };
    return (
        <div className="modalContent">
            <h3>Elem módosítása</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Név" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder="Szerző/Rendező" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <textarea placeholder="Leírás" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="text" placeholder="Tagek (vesszővel elválasztva)" value={tags} onChange={(e) => setTags(e.target.value)} />
                <input type="file" accept="image/png" onChange={(e) => setFile(e.target.files[0])} />
                <div className="adminButtonGroup">
                    <button type="submit" className="btn btn-success">Elfogadás</button>
                    <button type="button" className="btn btn-secondary" onClick={isClose}>Mégse</button>
                </div>
            </form>
        </div>
    )
}