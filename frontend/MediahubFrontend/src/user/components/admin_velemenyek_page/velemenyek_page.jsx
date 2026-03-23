import { authLoader } from "../../util/auth";
import FlaggedCommentsTable from "./flaggedCommentsTable";
import { Footer } from "../footer/footer";
import  RenderNavbar  from "../navbar/renderNavbar";

export default function FlaggedCommentsPage() {
    const status = authLoader({ minRole: 5 });

    // Only admins can see this page
    if (status !== 5) {
        return (
            <div className="pageMainDiv">
                <RenderNavbar />
                <div className="pageBelowNavbar">
                    <p>Hozzáférés megtagadva</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="pageMainDiv">
            <RenderNavbar />

            <div className="pageBelowNavbar">
                <h2>Bejelentett vélemények</h2>

                <FlaggedCommentsTable/>
            </div>

            <Footer />
        </div>
    );
}
