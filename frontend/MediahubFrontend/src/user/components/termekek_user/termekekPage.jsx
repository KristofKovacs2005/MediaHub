import { renderNavbar } from "../navbar/renderNavbar";
import TermekekUser from "./termekLista_User";
import "./termekek.css";
import { Footer } from "../footer/footer";
import { Outlet } from "react-router-dom";

export default function TermekekPage() {
    return (
        <div className="termekekPageMainDiv">
            {renderNavbar()}
            <div className="termekekPageContent">
                <TermekekUser />
            </div>
            <Footer />
            <Outlet />
        </div>
    );
}