<h1 align="center">
  <img width="300" src="./assets/logo-light-mode.png" alt="Mirrorful">
</h1>
<p align="center">
  <p align="center">Create the building blocks of your app with Mirrorful: a simple, open-source design system framework.</p>
</p>

<h4 align="center">
  <a href="https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA">Slack</a> |
  <a href="https://mirrorful.com/">Website</a> |
  <a href="https://www.npmjs.com/package/mirrorful">NPM Package</a> | <a href="https://www.mirrorful.com/docs/home/intropage">Docs</a>
</h4>

<h4 align="center">
  <a href="https://github.com/Mirrorful/mirrorful/blob/main/LICENSE.md">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Mirrorful is released under the MIT license." />
  </a>
  <a href="https://github.com/">
    <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen" alt="PRs welcome!" />
  </a>
  <a href="https://github.com/Mirrorful/mirrorful/issues">
    <img src="https://img.shields.io/github/commit-activity/m/Mirrorful/mirrorful" alt="git commit activity" />
  </a>
  <a href="https://www.npmjs.com/package/mirrorful">
    <img src="https://img.shields.io/badge/Downloads-2.1k-orange" alt="Mirrorful downloads" />
  </a>
  <a href="https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA">
    <img src="https://img.shields.io/badge/chat-on%20Slack-blueviolet" alt="Slack community channel" />
  </a>
  <a href="https://twitter.com/mirrorful">
    <img src="https://img.shields.io/twitter/follow/mirrorful?label=Follow" alt="Mirrorful Twitter" />
  </a>
</h4>

<img src="./assets/Asset.png" width="100%" alt="Mirrorful Dashboard" />

**Read this in other languages**: <kbd>[<img title="English" alt="English language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/us.svg" width="22">](i18n/README.en.md)</kbd>
<kbd>[<img title="German" alt="German language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/de.svg" width="22">](i18n/README.de.md)</kbd>
<kbd>[<img title="Swedish" alt="Swedish language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/se.svg" width="22">](i18n/README.sv.md)</kbd>
<kbd>[<img title="Turkish" alt="Turkish language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/tr.svg" width="22">](i18n/README.tr.md)</kbd>
<kbd>[<img title="Spanish" alt="Spanish language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/es.svg" width="22">](i18n/README.es.md)</kbd>
<kbd>[<img title="Portuguese" alt="Portuguese language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/pt.svg" width="22">](i18n/README.pt.md)</kbd>

**[Mirrorful](https://mirrorful.com)** is a simple, open-source design system framework. Install Mirrorful to generate colors and other design tokens for your project. Then, import these tokens directly into your app.

- **Start new projects with a source of truth**
- **Visually modify your theme**
- **Generate colors**
- **Theme Templates**
- **Figma integration**

- 🔜 **Lightweight Headless Component Library**
- 🔜 **Eslint rules**
- 🔜 **Propagate tokens across projects**

And more...

## 🚀 Get started

Mirrorful is a NPM package intended to be installed as dev dependency.

```bash
npm install mirrorful --save-dev
```

or

```bash
yarn add mirrorful --dev
```

## ✨ Usage

The following command will start a local editor at `localhost:5050`.

```
npx mirrorful editor
```

or

```
yarn run mirrorful
```

## 📚 Documentation

Check out our [documentation](https://mirrorful.com/docs) for more information.

## 🤝 Component Library Agnostic

We strive to be component library agnostic. Whether you're using Material UI, Chakra UI, Tailwind, Ant Design, or even your in-house library, Mirrorful hooks right in.

⚠️ `create-react-app` may warn that you are trying to import from outside the `src` directory. We are working on a long-term solution, but for now, we would recommend making a copy of the `.mirrorful` folder in your `src` directory. If you're working with Vite, you can add a config that copies the .mirrorful dir to `src`. Check out the example `vite.config.ts` [here](https://github.com/Mirrorful/mirrorful/blob/main/examples/sveltekit/vite.config.ts).

Check out our examples:

- [Mirrorful 🤝 Remix](https://github.com/Mirrorful/mirrorful/tree/main/examples/remix)
- [Mirrorful 🤝 Tailwind CSS (and Next)](https://github.com/Mirrorful/mirrorful/tree/main/examples/tailwind-next)
- [Mirrorful 🤝 Chakra UI](https://github.com/Mirrorful/mirrorful/tree/main/examples/with-chakra-ui)
- [Mirrorful 🤝 Basic Create React App](https://github.com/Mirrorful/mirrorful/tree/main/examples/create-react-app)
- [Mirrorful 🤝 Basic Nuxt 3 App](https://github.com/Mirrorful/mirrorful/tree/main/examples/nuxt-3)
- [Mirrorful 🤝 SvelteKit](https://github.com/Mirrorful/mirrorful/tree/main/examples/sveltekit)
- [Mirrorful 🤝 Bootstrap (and Next)](https://github.com/Mirrorful/mirrorful/tree/main/examples/bootstrap-next)
- [Mirrorful 🤝 styled-components](https://github.com/Mirrorful/mirrorful/tree/main/examples/with-styled-components)

Looking for a specific example? [Request one here!](https://github.com/Mirrorful/mirrorful/issues)

## 📚 Documentation

Check out our [documentation](https://mirrorful.com/docs) for more information.

## ❤️ Community & Support

- [Slack](https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA) - for live discussion with the community and the Mirrorful team.
- [GitHub Discussions](https://github.com/Mirrorful/mirrorful/discussions) - for help with building and deeper conversations about features.
- [GitHub Issues](https://github.com/Mirrorful/mirrorful/issues) - for any bugs and errors you encounter using Mirrorful.
- [Twitter](https://twitter.com/mirrorful) - stay up to date with the latest product updates.
- [Book a free, non-pressure pairing sessions with one of our teammates](https://usemotion.com/meet/teddyni/meet?d=15)!
- [Showcase](https://mirrorful.com/docs/home/showcase) - to see the awesome projects our community has built on Mirrorful!

## 🪞 Contributors

<a href="https://github.com/mirrorful/mirrorful/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=mirrorful/mirrorful" />
</a>
