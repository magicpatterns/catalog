import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

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
    },
    define: {
      'process.env.NODE_ENV': '"production"',
    },
  }
})
