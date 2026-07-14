import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import eslintPlugin from '@nabla/vite-plugin-eslint';

export default defineConfig({
  base: '/beerHub/',
  plugins: [react(), checker({ typescript: true }), eslintPlugin()],
  build: {
    outDir: './build',
  },
});
