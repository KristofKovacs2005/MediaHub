import { createBrowserRouter } from 'react-router-dom';
import FoOldal from './user/foOldal';
import { checkAuthLoader, tokenLoader } from './user/util/auth';
import TermekekPage from './user/components/termekek_user/termekekPage';
import HomeContent from './user/homeContent';
import TermekDetailsPage from './user/components/termek_details_page/termek_details_page';
import { ErrorPage } from './user/components/errorPage/errorPage';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <FoOldal />,
        errorElement: <ErrorPage />,
        loader: tokenLoader,
        id: "root",
        children: [
            {
                index: true,
                element: <HomeContent />
            },]
            
            ,/*
            {
                path: "/rendelesek",
                element: <Rendelesek />,
                errorElement: <ErrorPage />,
                loader: checkAuthLoader,
            },
            {
                path: "/felhasznalok",
                element: <Felhasznalok />,
                errorElement: <ErrorPage />,
                loader: checkAuthLoader,
            },*/
        
    },
    {
        path: "/termekek",
        element: <TermekekPage />,
        errorElement: <ErrorPage />,
        loader: checkAuthLoader,
    },
    {
        path: "/termekek/:id",
        element: <TermekDetailsPage />,
        errorElement: <ErrorPage />,
        loader: checkAuthLoader,
    }
]);