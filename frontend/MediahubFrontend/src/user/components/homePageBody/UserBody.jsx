import Header from "../sections/header";
import { TermekekSectionUser } from "../sections/termekekSection";

export function UserBody() {
    return (
        <div className="user-body">
            <Header />
            <main className="body-content">
                <TermekekSectionUser />
            </main>
        </div>
    );
}