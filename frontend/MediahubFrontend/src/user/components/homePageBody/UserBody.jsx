import { Header } from "../header/header";
import { TermekekSectionUser } from "../sections/termekekSection";
import HeaderText from "../header/headerTextUser";
import "./UserBody.css"
export default function UserBody() {
    return (
        <div className="user-body">
            <Header title={<HeaderText/>}/>
            <div className="section-divider"></div>
            <main className="body-content">
                <TermekekSectionUser />
            </main>
        </div>
    );
}