import FlaggedCommentsTable from "../components/admin_velemenyek_page/flaggedCommentsTable";
import { Footer } from "../components/footer/footer";
import  RenderNavbar  from "../components/navbar/renderNavbar";
import "../components/admin_velemenyek_page/flaggedComments.css"

export default function FlaggedCommentsPage() {

    return (
        <div className="page-main">
            <RenderNavbar />

            <main className="page-content">
                <h2>Feljelentett vélemények</h2>
                <FlaggedCommentsTable />
            </main>

            <Footer />
        </div>
    );
}
