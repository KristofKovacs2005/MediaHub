import { Header } from "../header/header";
import { Link } from "react-router-dom";
import "./AdminBody.css";
import HeaderText from "../header/headerTextUser";

export default function AdminBody() {
    return (
        <div className="admin-body">
            <Header title={<HeaderText />} />

            <main className="dashboard">
                    <Link to="/felhasznalok" className="dashboard-card usersCard">
                        <div className="overlay">
                            <h2>Felhasználók</h2>
                        </div>
                    </Link>

                    <Link to="/bejelentesek" className="dashboard-card reports">
                        <div className="overlay">
                            <h2>Bejelentések</h2>
                        </div>
                    </Link>
            </main>
        </div>
    );
}