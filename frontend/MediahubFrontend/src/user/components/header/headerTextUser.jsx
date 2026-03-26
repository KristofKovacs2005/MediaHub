import "./headerCss.css"

export default function HeaderText() {
    const username = localStorage.getItem('username')
    return (
        <div
            className="header-hero"
        >
            <div className="header-user-content">
                <h1 className="header-user-title">
                    Üdv újra, <span>{username}</span>!
                </h1>
            </div>
        </div>
    );
}