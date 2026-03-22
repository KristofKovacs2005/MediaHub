import "./statCss.css";

export function StatCard({ value, title, image, color }) {
    return (
        <div
            className="stat-card"
            style={{
                borderLeft: `5px solid ${color || '#3498db'}`,
            }}
        >
            <div className="stat-content">
                <p className="stat-value">{value}</p>
                <p className="stat-title">{title}</p>
            </div>
            {image && <img src={image} alt={title} className="stat-image" />}
        </div>
    );
}