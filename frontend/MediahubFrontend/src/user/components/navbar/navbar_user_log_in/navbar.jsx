import "./navbar.css";
import userIcon from '../../../../assets/circle-user-pic.png';
import { useState } from "react";
import { Link, redirect } from "react-router-dom";

export function Navbar_User_Log_In() {

    // Read username from localStorage
    const username = localStorage.getItem('username') || '';
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        // Clear token and user info
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        localStorage.removeItem('status');
        if(window.location.pathname == "/"){
            window.location.reload();
            return;
        }
        redirect("/"); // Redirect to frontpage
    };

    return (
        <nav className="appNavbar">
            <section className="navbarSection1">
                <Link to="/" className="navLink"><h3>MediaHub</h3></Link>
            </section>

            <section className="navbarSection2">
                {/* Links for logged-in user */}
                <Link to="/termekek" className="navLink">Termékek</Link>
                <Link to="/lista" className="navLink">Lista</Link>

                {/* User profile */}
                <div className="userProfile" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <p>{username || "Profil"} <img className="userIcon" src={userIcon} alt="user" /></p>

                    {dropdownOpen && (
                        <div className="dropdownMenu">
                            <button disabled className="dropdownItem button_text">Beállítások</button>
                            <button className="dropdownItem button_text" onClick={handleLogout}>Kilépés</button>
                        </div>
                    )}
                </div>
            </section>
        </nav>
    );
}