import "./foOldal.css";
import { Footer } from "./components/footer/footer";
import { Outlet } from "react-router-dom";
import { renderNavbar } from "./components/navbar/renderNavbar";

export default function FoOldal() {
    return (
        <div className="foOldalMainDiv">

            {renderNavbar()}

            <Outlet />

            <Footer />
        </div>
    );
}
