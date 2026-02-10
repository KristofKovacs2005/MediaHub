import "./navbar.css";
import { useNavigate, Link } from "react-router-dom";

export function Navbar_Librarian() {
    const navigate = useNavigate();

    // Read username from localStorage
    const username = localStorage.getItem('username') || '';

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

                {/* User profile */}
                <div className="dropdown userProfile">

            <p className="dropdown-toggle" data-bs-toggle="dropdown"  data-bs-offset="10,20">
              {username || "Profil"}{" "}
            </p>
          <ul className="dropdown-menu" data-bs-theme="dark">
            <li>
              <button
                className="dropdownItem dropdown-item button_text logOutButton"
                onClick={handleLogout}
              >
                Kilépés
              </button>
            </li>
          </ul>
        </div>
            </section>
        </nav>
    );
}