import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: [
    "index.ts",
    "api/**/*.ts",
    "chains/**/*.ts",
    "modules/**/*.ts",
  ],
  format: ['cjs', 'esm'],
});
