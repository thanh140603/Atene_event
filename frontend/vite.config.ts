import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// During local `npm run dev`, proxy API calls to the backend port (3000).
// In Docker, nginx serves the built assets and proxies /api to the backend service.
export default defineConfig({
  plugins: [react()],
  // Static assets (delivered under src/public/homepage) are served at "/" in dev
  // and copied into dist/ on build, so nginx serves them in the Docker image too.
  publicDir: 'src/public',
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
