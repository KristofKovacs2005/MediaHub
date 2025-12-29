import "./navbar.css";
import userIcon from '../../../assets/circle-user-pic.png';
export function Navbar(){
    return(
        <nav className="appNavbar">
            <section className="navbarSection1">
                <h3>MediaHub</h3>
            </section>
            <section className="navbarSection2">
                <a><p>Bejelentkezés</p></a>
                <a><p>Regisztráció</p></a>
                <p><img className="userIcon" src={userIcon} alt="user"/></p>
            </section>
        </nav>
    )
}