import { createBrowserRouter } from 'react-router-dom';
import HomePage from './user/pages/homepage';
import { tokenLoader, authLoader } from './user/util/auth';
import TermekekPage from './user/components/termekek_user/termekekPage';
import TermekDetailsPage from './user/components/termek_details_page/termek_details_page';
import FlaggedCommentsPage from './user/components/admin_velemenyek_page/velemenyek_page';
import TermekekLibrarianPage from './user/components/librarian_termekek_page/termekekLibrarianPage';
import { ErrorPage } from './user/components/errorPage/errorPage';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
        loader: tokenLoader, // public page, just get token if exists
        id: "root",
    },
    {
        path: "/termekek",
        element: <TermekekPage />,
        errorElement: <ErrorPage />,
        loader: () => authLoader({ minRole: 1 }), // logged-in user
    },
    {
        path: "/termekek/:id",
        element: <TermekDetailsPage />,
        errorElement: <ErrorPage />,
        loader: () => authLoader({ minRole: 1 }), // logged-in user
    },
    {
        path: "/termek_details",
        element: <TermekekLibrarianPage />,
        errorElement: <ErrorPage />,
        loader: () => authLoader({ minRole: 4 }), // librarian or admin
    },
    {
        path: "/bejelentesek",
        element: <FlaggedCommentsPage />,
        errorElement: <ErrorPage />,
        loader: () => authLoader({ minRole: 5 }), // admin only
    },
]);