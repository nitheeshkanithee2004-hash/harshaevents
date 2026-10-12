import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative asset URLs so the built `dist/` folder also works when opened
  // from a sub-folder or from the local filesystem.
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // The gallery photos are already compressed by tools/prepare-assets.mjs;
    // letting Vite inline anything would only bloat the HTML.
    assetsInlineLimit: 2048,
  },
});
