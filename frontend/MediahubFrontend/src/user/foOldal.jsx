import "./foOldal.css";
import { Footer } from "./components/footer/footer";
import Termekek from "./termekek/items/termekek";
import { Carousel } from "./components/carousel/carousel";
import Hero from "./components/hero/hero";
import { Navbar } from "./components/navbar/navbar_not_logged_in/navbar";
import { Navbar_User_Log_In } from "./components/navbar/navbar_user_log_in/navbar";
import { Navbar_Librarian } from "./components/navbar/navbar_librarian/navbar";
import { Navbar_Admin } from "./components/navbar/navbar_admin/navbar";

export default function FoOldal() {

    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");

    // Convert jogosultság to number
    const status = Number(localStorage.getItem("status"));

    const renderNavbar = () => {

        // Guest
        if (!token) {
            return <Navbar />;
        }

        // Suspended user
        if (status === 3) {
            return <Navbar />; // or special banned navbar
        }

        // User or warned user
        if (status === 1 || status === 2) {
            return <Navbar_User_Log_In userName={username} />;
        }

        // Librarian
        if (status === 4) {
            return <Navbar_Librarian userName={username} />;
        }

        // Moderator/Admin
        if (status === 5) {
            return <Navbar_Admin userName={username} />;
        }

        return <Navbar />;
    };

    return (
        <div className="foOldalMainDiv">

            {renderNavbar()}

            <div className="pageBelowNavbar">
                <Hero />
                <Carousel />
                <Termekek />
            </div>

            <Footer />
        </div>
    );
}
