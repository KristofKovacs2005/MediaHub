import { Header } from "../header/header";
import { TermekekSectionUser } from "../sections/termekekSection";

export default function UserBody() {
    return (
        <div className="user-body">
            <Header />
            <main className="body-content">
                <TermekekSectionUser />
            </main>
        </div>
    );
}