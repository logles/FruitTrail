import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),           // React fast‑refresh + TS/JSX support
    tailwindcss(),     // Tailwind in dev & build
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // import foo from '@/foo'
    },
  },
  server: {
    port: 5173,        // aligns with Google‑key referrer & README
    open: true,        // auto‑opens browser on npm run dev
    proxy: {
      '/graphql': {
        target: 'http://localhost:4000', // Express/GraphQL back end
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

