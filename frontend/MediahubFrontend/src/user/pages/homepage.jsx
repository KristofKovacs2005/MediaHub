import RenderNavbar from "../components/navbar/renderNavbar";
import GuestBody from "../components/homePageBody/GuestBody.jsx";
import AdminBody from "../components/homePageBody/AdminBody.jsx";
import UserBody from "../components/homePageBody/UserBody.jsx";
import LibrarianBody from "../components/homePageBody/LibrarianBody.jsx";
import Footer from "../components/footer/footer.jsx";

export default function HomePage() {
    const userRole = localStorage.getItem('status') || 'guest';

    let BodyComponent;

    switch (userRole) {
        case '1':
        case '2':
            BodyComponent = UserBody;
            break;
        case '4':
            BodyComponent = LibrarianBody;
            break;
        case '5':
            BodyComponent = AdminBody;
            break;
        default:
            BodyComponent = GuestBody;
    }

    return (
        <div className="home-page-container">
            <RenderNavbar />
            <main className="body-content">
                <BodyComponent />
            </main>
            <Footer />
        </div>
    );
}