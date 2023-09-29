import { rollup, OutputOptions } from "rollup"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import postcss from "rollup-plugin-postcss"
import typescript from "@rollup/plugin-typescript"

const inputOptions = {
  input: process.cwd(),
  plugins: [
    commonjs({
      include: ['../../node_modules/**'],
    }),
    postcss({
      sourceMap: true,
      extract: true,
      minimize: true
    }),
    resolve(),
    typescript(),
  ],
  external: ['cosmos/chains'],
}

const outputOptions = [
  {
    file: `dist/chora.cjs.js`,
    format: "cjs",
  },
  {
    file: `dist/chora.esm.js`,
    format: "esm",
  },
]

const bundle = await rollup(inputOptions)

outputOptions.forEach(async (options ) => {
  await bundle.write(options as OutputOptions)
})
