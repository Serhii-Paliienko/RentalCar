import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // резолвит алиасы из tsconfig: @app, @api, @components, @features, @pages, @shared, @store, @utils, @styles
  ],
});
