import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// During local `npm run dev`, proxy API calls to the backend host port (3001).
// In Docker, nginx serves the built assets and proxies /api to the backend service.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
