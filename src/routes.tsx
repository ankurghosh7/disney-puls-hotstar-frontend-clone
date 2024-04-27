import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { lazy } from "react";
const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Contact = lazy(() => import("./pages/Contact"));
export const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: (
          <div>
            <h1>movies page</h1>
          </div>
        ),
      },
      {
        path: "/shows",
        element: <div>shows page</div>,
      },
      {
        path: "/sports",
        element: <div>sports page</div>,
      },
      {
        path: "/categories",
        element: <div>categories page</div>,
      },
      {
        path: "/my-page",
        element: <Contact />,
      },
      {
        path: "/explore",
        element: <Contact />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);
