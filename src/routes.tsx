import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { lazy } from "react";
const Home = lazy(() => import("./pages/Home"));
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
        element: <div>movies</div>,
      },
      {
        path: "/tv-shows",
        element: <div>tv-shows</div>,
      },
      {
        path: "/contact",
        element: <div>contact</div>,
      },
    ],
  },
]);
