import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { lazy } from "react";
const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./components/SearchBox"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
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
        path: "/all-movies",
        element: <div>movies</div>,
      },
      {
        path: "/all-series",
        element: <div>tv-shows</div>,
      },
      {
        path: "/contact",
        element: <div>contact</div>,
      },
      {
        path: "/movies/:id",
        element: <MovieDetails />,
      },
      {
        path: "/search/:search",
        element: <Search />,
      },
    ],
  },
]);
