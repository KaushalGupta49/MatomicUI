import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/matomic.mjs',
    format: 'esm',
    banner: '#!/usr/bin/env node',
  },
  plugins: [resolve(), commonjs(), typescript(), terser()],
  external: ['commander', 'chalk', 'fs', 'path', 'https'],
};
