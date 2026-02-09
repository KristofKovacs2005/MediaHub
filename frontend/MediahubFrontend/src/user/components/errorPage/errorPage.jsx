import { Link } from "react-router-dom";
import { Footer } from "../footer/footer";
import { renderNavbar } from "../navbar/renderNavbar";
export function ErrorPage() {
    return (
        <div className="errorPageMainDiv">
            {renderNavbar()}
            <div className="pageBelowNavbar">
                <h1>Hiba történt</h1>
            <p>Sajnáljuk, de valami hiba történt a kérés feldolgozása során. Kérjük, próbálja meg újra később.</p>
            <Link to="/" className="homeLink btn btn-secondary">Vissza a főoldalra</Link>
            </div>
            <Footer />
        </div>
    );
}