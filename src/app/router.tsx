import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Loader from "@components/Loader/Loader";
import Header from "@components/Header/Header";

const HomePage = lazy(() => import("@pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("@features/catalog/pages/CatalogPage"));
const NotFound = lazy(() => import("@pages/NotFound/NotFound"));

function Root() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "catalog", element: <CatalogPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
