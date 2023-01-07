import { rollup, OutputOptions } from "rollup"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import postcss from "rollup-plugin-postcss"

const inputOptions = {
  input: process.cwd(),
  plugins: [
    nodeResolve(),
    commonjs({
      include: '../node_modules/**',
    }),
    typescript(),
    postcss({
      sourceMap: true,
      extract: true,
      minimize: true
    }),
  ],
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
