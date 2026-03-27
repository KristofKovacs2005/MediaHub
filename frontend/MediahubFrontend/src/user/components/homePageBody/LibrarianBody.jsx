import { Header } from "../header/header";
import { Link } from "react-router-dom";
import "./LibrarianBody.css";
import HeaderText from "../header/headerTextUser.jsx";

export default function LibrarianBody() {
    return (
        <div className="guest-body">
            <Header title={<HeaderText/>}/>

            <main className="dashboardLibrarian">
                <div className="top-row">
                    <Link to="/termek_details" className="dashboard-card products">
                        <div className="overlay">
                            <h2>Termékek kezelése</h2>
                        </div>
                    </Link>

                    <Link to="/kolcsonzesek" className="dashboard-card orders">
                        <div className="overlay">
                            <h2>Kölcsönzések</h2>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
}