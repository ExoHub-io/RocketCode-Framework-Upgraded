import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    cli: 'src/cli.ts',
    'create-app': 'src/create-app.ts',
    logger: 'src/logger/index.ts',
    services: 'src/services/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['next', 'react', 'react-dom'],
  esbuildOptions(options) {
    options.banner = {
      js: '#!/usr/bin/env node',
    };
  },
  onSuccess: 'chmod +x dist/cli.js dist/create-app.js',
}); 