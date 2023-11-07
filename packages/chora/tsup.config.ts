import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: [
    "index.ts",
    "components/**/*.ts",
    "components/**/*.tsx",
    "contexts/**/*.ts",
    "hooks/**/*.ts",
    "utils/**/*.ts",
  ],
  format: ['cjs', 'esm'],
  loader: {
    '.css': 'local-css',
  },
});
