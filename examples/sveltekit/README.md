# SvelteKit + Mirrorful Example

Use command `npx mirrorful` for interactive web editor.

This is an example project which integrates mirrorful with sveltekit.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Configuration

SvelteKit doesn't compile anything that is out of `src` folder. In current version of mirrorful, all the theme data is saved in a root directory inside `.mirrorful` folder. So, in order to overcome that, we have a little workaround in our vite configuration that will copy all the theme data from `.mirrorful` to `src/mirrorful`.

let's see how it's done.

```bash
npm install rollup-plugin-copy
```

Now, modify the `vite.config.ts` file as follows:

```ts
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
```
