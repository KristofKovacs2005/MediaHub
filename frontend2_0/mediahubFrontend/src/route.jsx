import { createBrowserRouter } from 'react-router-dom';
import HomePageHandler from './functions/homePageHandler';
import { ErrorPage } from './pages/errorPage';
//import HandleOrdersPage from './pages/handelOrdersPage';
//import HandleTermekekPage from './pages/handleTermekekPage';
import { tokenLoader } from './util/auth';
// ...import other pages/components as needed

export const router = createBrowserRouter([
    {
        path: "/",
        element: <div className="appContent"><HomePageHandler /></div>,
        errorElement: <ErrorPage />,
        loader: tokenLoader, // Add if you have authentication logic
        id: "root",
        children: [
            {
                index: true,
                element: <div className="appContent"><HomePageHandler /></div>
            },
            // Add child routes here if needed
        ]
    },
    //{
    //    path: "/orders",
    //    element: <HandleOrdersPage />,
    //    errorElement: <ErrorPage />,
    //    // loader: checkAuthUserLoader, // Add if you have authentication logic
    //},
    //{
    //    path: "/termekek",
    //    element: <HandleTermekekPage />,
    //    errorElement: <ErrorPage />,
    //    // loader: checkAuthUserLoader,
    //},
    // Add more routes as needed
]);