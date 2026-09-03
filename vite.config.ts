import type { Plugin } from "vite";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

function pgliteBootstrapPlugin(): Plugin {
  return {
    name: "pglite-bootstrap",
    apply: "serve",
    async configureServer(server) {
      const mod = (await server.ssrLoadModule("/src/lib/db.ts")) as {
        ensureDbReady?: () => Promise<void>;
      };
      if (typeof mod.ensureDbReady === "function") {
        await mod.ensureDbReady();
      }
    },
  };
}

export default defineConfig(({ command }) => ({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    pgliteBootstrapPlugin(),
    tailwindcss(),
    tanstackStart(),
    ...(command === "build" ? [nitro({ preset: "vercel" })] : []),
    viteReact(),
  ],
}));
