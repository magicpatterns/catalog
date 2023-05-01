import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import copy from 'rollup-plugin-copy'

export default defineConfig(({ command }) => ({
  plugins: [
    sveltekit(),
    copy({
      targets: [
        {
          src: '.mirrorful/*.css',
          dest: 'src/mirrorful',
        },
      ],
      hook: command === 'build' ? 'writeBundle' : 'buildStart',
    }),
  ],
}))
