import { useNavigate } from "react-router-dom";
import "./termekek.css";

export default function TermekCard({ i_id, author, i_name, img_url, i_description }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (i_id) {
            navigate(`/termekek/${i_id}`);
        }
    };

    return (
        <div className="termekDiv" onClick={handleClick} style={{ cursor: "pointer" }}>
            <img src={"http://localhost:3000" + img_url} alt={i_name} title={i_name} />
            <h2>{i_name}</h2>
            <p><strong>Author:</strong> {author}</p>
            <p><strong>Description:</strong> {i_description}</p>
        </div>
    );
}