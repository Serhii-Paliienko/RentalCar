import { createBrowserRouter } from "react-router-dom";
import HomePage from "@pages/HomePage/HomePage";
import CatalogPage from "@features/catalog/pages/CatalogPage";
import DetailsPage from "@features/details/pages/DetailsPage";
import NotFound from "@pages/NotFound/NotFound";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/catalog", element: <CatalogPage /> },
  { path: "/catalog/:id", element: <DetailsPage /> },
  { path: "*", element: <NotFound /> },
]);

export default router;
