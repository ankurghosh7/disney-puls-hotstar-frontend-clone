import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { lazy } from "react";
const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const AllMovies = lazy(() => import("./pages/AllMovies"));
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
        path: "/all-movies",
        element: <AllMovies />,
      },
      {
        path: "/all-series",
        element: <div>tv-shows</div>,
      },
      {
        path: "/contact",
        element: <Contact />,
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
