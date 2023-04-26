import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import externalGlobals from 'rollup-plugin-external-globals'

export default defineConfig(async ({ command, mode }) => {
  console.log(__dirname)
  return {
    plugins: [
      react(),
      // dts({
      //   include: [`app/components/primitives`],
      // }),
      cssInjectedByJsPlugin(),
    ],
    build: {
      lib: {
        entry: resolve('./app/components/primitives/index.ts'),
        name: 'Library',
        formats: ['es'],
        fileName: (format) => `library.${format}.js`,
      },
      outDir: `${__dirname}/module`,
      emptyOutDir: true,
      minify: false,
      // rollupOptions: {
      //   external: ['react', 'react-dom'],
      //   output: {
      //     globals: {
      //       react: 'React',
      //       'react-dom': 'ReactDOM',
      //     },
      //   },
      // },
    },
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    // resolve: {
    //   alias: {
    //     react: 'https://esm.sh/react@18.2.0?keep-names',
    //     'react-dom': 'https://esm.sh/react-dom@18.2.0?keep-names',
    //   },
    // },
  }
})
