import { checkStatus } from "../../util/auth";
import FlaggedCommentsTable from "./flaggedCommentsTable";
import { Footer } from "../footer/footer";
import { renderNavbar } from "../navbar/renderNavbar";

export default function FlaggedCommentsPage() {
    const status = checkStatus();

    // Only admins can see this page
    if (status !== 5) {
        return (
            <div className="pageMainDiv">
                {renderNavbar()}
                <div className="pageBelowNavbar">
                    <p>Hozzáférés megtagadva</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="pageMainDiv">
            {renderNavbar()}

            <div className="pageBelowNavbar">
                <h2>Bejelentett vélemények</h2>

                <FlaggedCommentsTable/>
            </div>

            <Footer />
        </div>
    );
}
