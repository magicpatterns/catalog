import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(async ({ command, mode }) => {
  return {
    plugins: [
      react(),
      dts({
        include: ['components/'],
      }),
    ],
    build: {
      lib: {
        entry: resolve('components/index.ts'),
        name: 'Library',
        formats: ['es'],
        fileName: (format) => `library.${format}.js`,
      },
    },
  }
})
