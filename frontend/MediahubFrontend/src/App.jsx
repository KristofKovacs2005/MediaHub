import './App.css'
import FoOldal from "./user/foOldal";
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import TermekekUser from './user/components/termekek_user/termekLista_User';

  const router = createBrowserRouter([
  {
    path: "/",
    element: <FoOldal />,
  },
  {
    path: "/lista",
    element: <Lista />,
  },
  {
    path: "/termekek",
    element: <TermekekUser />,
  },
  {
    path: "/rendelesek",
    element: <Rendelesek />,
  },
  {
    path: "/felhasznalok",
    element: <Felhasznalok />,
  },
  {
    path: "/termek_details",
    element: <TermekDetails />,
  },
]);
function App() {

  return <RouterProvider router={router} />;
}

export default App