import { Navbar } from "./navbar_not_logged_in/navbar";
import { Navbar_User_Log_In } from "./navbar_user_log_in/navbar";
import { Navbar_Librarian } from "./navbar_librarian/navbar";
import { Navbar_Admin } from "./navbar_admin/navbar";

export default function RenderNavbar() {
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");
    const status = Number(localStorage.getItem("status")) || 0;

    if (!token) return <Navbar />;
    if (status === 3) return <Navbar />;

    if (status === 1 || status === 2) {
        return <Navbar_User_Log_In userName={username} />;
    }

    if (status === 4) {
        return <Navbar_Librarian userName={username} />;
    }

    if (status === 5) {
        return <Navbar_Admin userName={username} />;
    }

    return <Navbar />;
}