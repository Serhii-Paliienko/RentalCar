import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Seo from "@components/Seo/Seo";
import Header from "@components/Header/Header";

export default function RootLayout() {
  return (
    <div id="app-root">
      <Seo />
      <Header />
      <main className="page">
        <Suspense
          fallback={
            <div className="container" role="status" aria-live="polite">
              Loading…
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
