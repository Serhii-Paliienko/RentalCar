import { createRoot } from "react-dom/client";
import AppRouter from "@app/router";
import { TanStackProvider } from "@app/providers/TanStackProvider";
import { ToastProvider } from "@app/providers/ToastProvider";
import "modern-normalize/modern-normalize.css";
import "@styles/tokens.css";
import "@styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const root = createRoot(document.getElementById("root")!);

root.render(
  <TanStackProvider>
    <ToastProvider>
      <AppRouter />
      <SpeedInsights />
    </ToastProvider>
  </TanStackProvider>
);
