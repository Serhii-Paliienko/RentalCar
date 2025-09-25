import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { TanStackProvider } from "@app/providers/TanStackProvider";
import { ToastProvider } from "@app/providers/ToastProvider";
import router from "@app/router";

import "modern-normalize/modern-normalize.css";
import "@styles/tokens.css";
import "@styles/globals.css";

const root = createRoot(document.getElementById("root")!);

root.render(
  <TanStackProvider>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </TanStackProvider>
);
