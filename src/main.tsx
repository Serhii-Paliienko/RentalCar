import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { TanStackProvider } from "@app/providers/TanStackProvider";
import { ToastProvider } from "@app/providers/ToastProvider";
import router from "@app/router";

// normalize — глобально ОДИН раз
import "modern-normalize/modern-normalize.css";
// токены + глобальные стили
import "@styles/tokens.css";
import "@styles/globals.css";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <TanStackProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </TanStackProvider>
  </React.StrictMode>
);
