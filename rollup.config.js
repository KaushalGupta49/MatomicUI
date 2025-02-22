import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/cli.ts",
  output: {
    file: "dist/matomic.cjs",
    format: "cjs",
    banner: "#!/usr/bin/env node",
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      exclude: ["templates/**/*"],
    }),
    terser(),
  ],
  external: ["fs", "path", "https"],
};
