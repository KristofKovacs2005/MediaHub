import { createBrowserRouter } from 'react-router-dom';
import HomePage from './user/pages/homepage';
import { tokenLoader, authLoader } from './user/util/auth';
import TermekekPage from './user/pages/termekekPage.jsx';
import TermekDetailsPage from './user/components/termek_details_page/termek_details_page';
import TermekekLibrarianPage from './user/pages/termekekLibrarianPage.jsx';
import {ErrorPage} from './user/pages/errorPage.jsx';
import { TermekHozzadas } from './user/pages/childPages/termekekHozzaAdasa/termekekHozzadasaPage.jsx';
import { TermekModositas } from './user/pages/childPages/termekekModositas/termekekModositasPage.jsx';

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
        children:[
            {
                path:'/termek_details/ujtermek',
                element: <TermekHozzadas/>,
                errorElement: <ErrorPage />,
            },
            {
                path:'/termek_details/termekmodositas/:id',
                element: <TermekModositas/>,
                errorElement: <ErrorPage />,
            }
        ]
    },
    /**
    {
        path: "/bejelentesek",
        element: <FlaggedCommentsPage />,
        errorElement: <ErrorPage />,
        loader: () => authLoader({ minRole: 5 }), // admin only
    },**/
]);