import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@rocketcode/core': resolve(__dirname, '../../packages/core/dist/index.js'),
      '@rocketcode/router': resolve(__dirname, '../../packages/router/dist/index.js'),
      '@rocketcode/ssr': resolve(__dirname, '../../packages/ssr/dist/index.js')
    }
  },
  server: {
    port: 3000,
    open: true
  }
}); 