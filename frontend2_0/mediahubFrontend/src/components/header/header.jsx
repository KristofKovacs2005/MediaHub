import React from "react";
import { Link, useNavigate } from "react-router-dom"; // if you use React Router
import "./headerCss.css";

export function Header({ title, subtitle, image, cta }) {
    const navigate = useNavigate();
    return (
        <header className="header-hero" style={{ backgroundImage: `url(${image})` }}>
            <div className="header-content">
                <h1 className="header-title">{title}</h1>
                {subtitle && <p className="header-subtitle">{subtitle}</p>}
                {cta && (
                    <Link to={cta.link} className="header-cta-button">
                        {cta.text}
                    </Link>
                )}
                <button className="register-btn" onClick={() => navigate('/register')}>
                    Regisztrálás
                </button>
            </div>
        </header>
    );
}