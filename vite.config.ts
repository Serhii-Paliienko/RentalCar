import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// Универсальная конфигурация без SWC, чтобы не требовать доп. зависимости.
// Если хочешь обратно на SWC — просто установи @vitejs/plugin-react-swc и верни импорт.
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    sourcemap: true,
  },
});
