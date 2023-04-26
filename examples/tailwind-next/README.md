# Mirrorful + Tailwind CSS + Next JS

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and with [Tailwind CSS](https://tailwindcss.com/) and [Mirrorful](https://mirrorful.com/) added.

It followed the directions [here](https://tailwindcss.com/docs/guides/nextjs).

## Run the development server:

```bash
npm i
```

```bash
npm run dev
```

## Run Mirrorful

```bash
npx mirrorful editor
```

This will open a browser window with the Mirrorful at localhost:5050.

## ESLint Plugin Demo

This project also incorporates the Mirrorful [eslint plugin](/packages/eslint-plugin). As demonstrated by the screenshots below, this plugin properly configured will detect hard-coded color values and automatically convert to the Mirrorful `Tokens` equivalent if present in the theme configuration.

Before Linting            |  After Linting
:-------------------------:|:-------------------------:
![Before](/assets/eslint-1.png)  |  ![After](/assets/eslint-2.png)