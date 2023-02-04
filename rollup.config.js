import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

const isProduction = process.env.NODE_ENV === "production";
const plugins = [commonjs(), nodeResolve(), typescript()];
const productionExternal = ["@emotion/react", "@emotion/styled"];

export default isProduction
    ? {
          external: productionExternal,
          input: "./src/emotion-mirror.ts",
          output: [
              {
                  dir: "./dist/es",
                  format: "es",
                  preserveModules: true,
              },
              {
                  dir: "./dist/cjs",
                  exports: "named",
                  format: "cjs",
                  preserveModules: true,
              },
          ],
          plugins,
      }
    : {
          input: "./App.tsx",
          output: {
              dir: "./public/js",
              format: "iife",
          },
          plugins,
      };
