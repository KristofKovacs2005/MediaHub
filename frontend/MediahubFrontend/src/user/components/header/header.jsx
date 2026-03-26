import headerImage from "../../../assets/ELTE-konyvtar.png";
import "./headerCss.css";
export function Header({ title, subtitle }) {
    
    return (
        <header
            className="header-hero"
            style={{ backgroundImage: `url(${headerImage})` }}
        >
            <div className="header-content">
                {title}

                {subtitle && (
                    <p className="header-subtitle">{subtitle}</p>
                )}
            </div>
        </header>
    );
}