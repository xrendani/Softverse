
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    base: env.BASE_URL || '/',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      sourcemap: true,
      outDir: 'dist',
    },
    server: {
      host: "::",
      port: 8080,
      open: true,
    },
  };
});
