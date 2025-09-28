import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "@components/Header/Header";
import Seo from "@components/Seo/Seo";

const HomePage = lazy(() => import("@pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("@features/catalog/pages/CatalogPage"));
const DetailsPage = lazy(() => import("@features/details/pages/DetailsPage"));
const NotFound = lazy(() => import("@pages/NotFound/NotFound"));

function RootLayout() {
  return (
    <div id="app-root">
      <Seo />
      <Header />
      <main className="page">
        <Suspense fallback={<div className="container">Loading…</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

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
