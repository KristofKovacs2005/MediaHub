import { renderNavbar } from '../components/navbar/renderNavbar';
import { Footer } from '../components/footer/footer';
import '../styles/homePageHandler.css';
import GuestBody from '../homepageBody/guestBody';
import UserBody from '../homepageBody/userBody';
import LibrarianBody from '../homepageBody/librarianBody';
import AdminBody from '../homepageBody/adminBody';

const HomePageHandler = () => {
    const userRole = localStorage.getItem('userRole') || 'guest';

    // Render complete page layout based on user role
    const renderPage = () => {
        switch (userRole) {
            case 'guest':
                return (
                    <>
                        {renderNavbar()}
                        <main className="body-content">
                            <GuestBody />
                        </main>
                        <Footer />
                    </>
                );
            case 1 || 2:
                return (
                    <>
                        {renderNavbar()}
                        <main className="body-content">
                            <UserBody />
                        </main>
                        <Footer />
                    </>
                );
            case 4:
                return (
                    <>
                        {renderNavbar()}
                        <main className="body-content">
                            <LibrarianBody />
                        </main>
                        <Footer />
                    </>
                );
            case 5:
                return (
                    <>
                        {renderNavbar()}
                        <main className="body-content">
                            <AdminBody />
                        </main>
                        <Footer />
                    </>
                );
            default:
                return (
                    <>
                        {renderNavbar()}
                        <main className="body-content">
                            <GuestBody />
                        </main>
                        <Footer />
                    </>
                );
        }
    };

    return (
        <div className="home-page-container">
            {renderPage()}
        </div>
    );
};
export default HomePageHandler;
