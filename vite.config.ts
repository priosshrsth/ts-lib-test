import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { compilerOptions } from './tsconfig.json';

interface TsConfigPaths {
  [key: string]: string[];
}

const tsConfigPaths: TsConfigPaths = compilerOptions.paths || {};

const aliasEntries = Object.entries(tsConfigPaths).map(([alias, [path]]) => [
  alias.replace('/*', ''),
  path.replace('/*', '/'),
]);

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'frontend-utilities',
      fileName: (format) => `frontend-utilities.${format}.js`,
    },
  },
  resolve: {
    alias: Object.fromEntries(aliasEntries),
  },
  plugins: [dts()],
});
