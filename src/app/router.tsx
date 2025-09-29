import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@app/layouts/RootLayout";

const HomePage = lazy(() => import("@features/home/pages/HomePage"));
const CatalogPage = lazy(() => import("@features/catalog/pages/CatalogPage"));
const DetailsPage = lazy(() => import("@features/details/pages/DetailsPage"));
const NotFound = lazy(() => import("@pages/NotFound/NotFound"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: (
      <div className="container">Something went wrong. Try reload.</div>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "catalog", element: <CatalogPage /> },
      { path: "catalog/:id", element: <DetailsPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
