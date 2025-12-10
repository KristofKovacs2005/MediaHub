export default function Termek({ author, i_name, img_url, i_description }) {
    return (
        <div className="termekDiv">
            <img src={img_url} alt={i_name} title={i_name} />
            <h2>{i_name}</h2>
            <p><strong>Author:</strong> {author}</p>
            <p><strong>Description:</strong> {i_description}</p>
        </div>
    );
}