import "./navbar.css";
import userIcon from '../../../../assets/circle-user-pic.png';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function Navbar_Admin() {
    const navigate = useNavigate();

    // Read username from localStorage
    const username = localStorage.getItem('username') || '';
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        // Clear token and user info
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        localStorage.removeItem('status');
        navigate("/"); // Redirect to frontpage
    };

    return (
        <nav className="appNavbar">
            <section className="navbarSection1">
                <h3>MediaHub</h3>
            </section>

            <section className="navbarSection2">
                {/* Links for logged-in user */}
                <Link to="/termekek" className="navLink">Termékek</Link>
                <Link to="/termek_details" className="navLink">Új termék</Link>
                <Link to="/rendelesek" className="navLink">Kölcsönzések</Link>
                <Link to="/felhasznalok" className="navLink">Felhasználók</Link>

                {/* User profile */}
                <div className="userProfile" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <p>{username || "Profil"} <img className="userIcon" src={userIcon} alt="user" /></p>

                    {dropdownOpen && (
                        <div className="dropdownMenu">
                            <button disabled className="dropdownItem">Beállítások</button>
                            <button className="dropdownItem" onClick={handleLogout}>Kilépés</button>
                        </div>
                    )}
                </div>
            </section>
        </nav>
    );
}