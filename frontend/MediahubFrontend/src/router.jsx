import { createBrowserRouter } from 'react-router-dom';
import HomePage from './user/pages/homepage';
import { checkAuthUserLoader, tokenLoader, checkAuthAdminLoader, checkAuthKonyvtarosOrAdminLoader } from './user/util/auth';
import TermekekPage from './user/components/termekek_user/termekekPage';
import TermekDetailsPage from './user/components/termek_details_page/termek_details_page';
import FlaggedCommentsPage from './user/components/admin_velemenyek_page/velemenyek_page';
import TermekekLibrarianPage from './user/components/librarian_termekek_page/termekekLibrarianPage';
import { ErrorPage } from './user/components/errorPage/errorPage';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,  // <-- replaced FoOldal with HomePage
        errorElement: <ErrorPage />,
        loader: tokenLoader,
        id: "root",
    },
    {
        path: "/termek_details",
        element: <TermekekLibrarianPage />,
        errorElement: <ErrorPage />,
        loader: checkAuthKonyvtarosOrAdminLoader,
    },
    {
        path: "/termekek",
        element: <TermekekPage />,
        errorElement: <ErrorPage />,
        loader: checkAuthUserLoader,
    },
    {
        path: "/termekek/:id",
        element: <TermekDetailsPage />,
        errorElement: <ErrorPage />,
        loader: checkAuthUserLoader,
    },
    {
        path: "/bejelentesek",
        element: <FlaggedCommentsPage />,
        errorElement: <ErrorPage />,
        loader: checkAuthAdminLoader,
    }
]);