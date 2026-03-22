import Navbar from './Navbar.jsx';

export const renderNavbar = () => {
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");
    const status = Number(localStorage.getItem("status")) || 0;

    let role = 'guest';
    if (!token || status === 3) {
        role = 'guest';
    } else if (status === 1 || status === 2) {
        role = 'user';
    } else if (status === 4) {
        role = 'librarian';
    } else if (status === 5) {
        role = 'admin';
    }

    return <Navbar userRole={role} userName={username} onLogout={() => { localStorage.clear(); window.location.href = '/'; kivalasztottTermekek=[]; }} />;
};
