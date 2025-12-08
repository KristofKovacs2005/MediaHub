export default function Termek({ i_id, author, i_name, img_url, i_description }) {
    return (
        <div className="termekDiv">
            <img src={img_url} alt={i_name} title={i_name} />
            <h2>{i_name}</h2>
            <p><strong>ID:</strong> {i_id}</p>
            <p><strong>Author:</strong> {author}</p>
            <p><strong>Description:</strong> {i_description}</p>
        </div>
    );
}