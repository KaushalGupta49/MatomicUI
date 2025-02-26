import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "cli/cli.ts",
  output: {
    file: "dist/matomic.mjs",
    format: "esm",
    banner: "#!/usr/bin/env node",
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      exclude: ["src/**/*", "templates/**/*"],
    }),
    terser(),
  ],
  external: ["commander", "chalk", "fs", "path", "https"],
};
