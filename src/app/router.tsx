import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "@components/Header/Header";

// ленивые страницы
const HomePage = lazy(() => import("@pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("@features/catalog/pages/CatalogPage"));
const DetailsPage = lazy(() => import("@features/details/pages/DetailsPage"));
const NotFound = lazy(() => import("@pages/NotFound/NotFound"));

function RootLayout() {
  return (
    <div id="app-root">
      <Header />
      <Suspense fallback={<div className="container">Loading…</div>}>
        <Outlet />
      </Suspense>
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
      // ✅ Домашняя как индекс-роут (без редиректа на каталог)
      { index: true, element: <HomePage /> },

      // Каталог и детали
      { path: "catalog", element: <CatalogPage /> },
      { path: "catalog/:id", element: <DetailsPage /> },

      // 404
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
