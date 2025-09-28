import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@app/router";
import { TanStackProvider } from "@app/providers/TanStackProvider";
import { ToastProvider } from "@app/providers/ToastProvider";

// normalize подключён в globals.css
import "@styles/tokens.css";
import "@styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <TanStackProvider>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </TanStackProvider>
);
