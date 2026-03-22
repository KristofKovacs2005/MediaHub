// Unified Navbar component for all roles
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ userRole, userName, onLogout }) => {
  const navigate = useNavigate();
  // Standardized menu items per role
  const menus = {
    admin: [
      { label: 'Főoldal', link: '/' },
      { label: 'Termékek kezelése', link: '/termek_details' },
      { label: 'Bejelentések', link: '/bejelentesek' },
    ],
    librarian: [
      { label: 'Főoldal', link: '/' },
      { label: 'Termékek', link: '/termekek' },
      { label: 'Termékek kezelése', link: '/termek_details' },
    ],
    user: [
      { label: 'Főoldal', link: '/' },
      { label: 'Termékek', link: '/termekek' },
    ],
    guest: [
      { label: 'Főoldal', link: '/' },
      { label: 'Bejelentkezés', link: '/login' },
      { label: 'Regisztráció', link: '/register' },
    ],
  };

  const menu = menus[userRole] || menus['guest'];

  const handleLogout = () => {
    localStorage.clear();
    if (window.location.pathname === "/") {
      window.location.reload();
      return;
    }
    navigate("/");
    if (onLogout) onLogout();
  };

  return (
    <nav className="appNavbar">
      <section className="navbarSection1">
        <Link to="/" className="navLink">
          <h3>MediaHub</h3>
        </Link>
      </section>
      <section className="navbarSection2">
        {menu.map((item) => (
          <Link key={item.label} to={item.link} className="navLink">
            {item.label}
          </Link>
        ))}
        {userName && (
          <div className="dropdown userProfile">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {userName}
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li>
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </section>
    </nav>
  );
};

export default Navbar;
