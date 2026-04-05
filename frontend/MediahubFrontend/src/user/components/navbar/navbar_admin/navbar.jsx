import "./navbar.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export function Navbar_Admin() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Read username from localStorage
  const username = localStorage.getItem('username') || '';

  const handleLogout = () => {
    // Clear token and user info
    localStorage.clear()
    if (window.location.pathname == "/") {
      window.location.reload();
      return;
    }
    navigate("/") // Redirect to frontpage
  };

  return (
    <nav className={`appNavbar ${isMobileMenuOpen ? "mobileNavOpen" : ""}`}>
      <section className="navbarSection1">
        <Link to="/" className="navLink">
          <h3>MediaHub</h3>
        </Link>
        <button
          className="navbarMenuToggle"
          type="button"
          aria-label="Menü megnyitása"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          <span className="navbarMenuIcon" />
          <span className="navbarMenuIcon" />
          <span className="navbarMenuIcon" />
        </button>
      </section>

      <section className="navbarSection2">
        {/* Links for logged-in user */}
        <Link to="/termekek" className="navLink" onClick={() => setIsMobileMenuOpen(false)}>Termékek</Link>
        <Link to="/bejelentesek" className="navLink" onClick={() => setIsMobileMenuOpen(false)}>Bejelentések</Link>
        <Link to="/felhasznalok" className="navLink" onClick={() => setIsMobileMenuOpen(false)}>Felhasználók</Link>
        {/* User profile */}
        <div className="dropdown userProfile">

          <p className="dropdown-toggle" data-bs-toggle="dropdown" data-bs-offset="10,20">
            {username || "Profil"}{" "}
          </p>
          <ul className="dropdown-menu" data-bs-theme="dark">
            <li>
              <button
                className="dropdownItem dropdown-item button_text logOutButton"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
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