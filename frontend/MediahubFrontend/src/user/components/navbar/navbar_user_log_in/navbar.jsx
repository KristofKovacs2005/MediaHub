import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";

export function Navbar_User_Log_In() {
  // Read username from localStorage
  const username = localStorage.getItem("username") || "";

  const navigate = useNavigate()

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
    <nav className="appNavbar">
      <section className="navbarSection1">
        <Link to="/" className="navLink">
          <h3>MediaHub</h3>
        </Link>
      </section>

      <section className="navbarSection2">
        {/* Links for logged-in user */}
        <Link to="/termekek" className="navLink">
          Termékek
        </Link>

        {/* User profile */}

        <div className="dropdown userProfile">
          <p
            className="dropdown-toggle"
            data-bs-toggle="dropdown"
            data-bs-offset="10,20"
          >
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
