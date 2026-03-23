import Header from "../sections/header";
import { Footer } from "../../../../../../frontend2_0/mediahubFrontend/src/components/footer/footer";
import { TermekekSectionUser } from "../sections/termekekSection";

export function UserBody() {
    return (
        <div className="user-body">
            <Header />
            <main className="body-content">
                <TermekekSectionUser />
            </main>
            <Footer />
        </div>
    );
}