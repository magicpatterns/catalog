<h1 align="center">
  <img width="300" src="./assets/logo-light-mode.png#gh-light-mode-only" alt="Mirrorful">
  <img width="300" src="./assets/logo-dark-mode.png#gh-dark-mode-only" alt="Mirrorful">
</h1>
<p align="center">
  <p align="center">The open-source design system framework built for the future.</p>
</p>

<h4 align="center">
  <a href="https://app.mirrorful.com/">Mirrorful Cloud</a> |
  <a href="https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA">Slack</a> |
  <a href="https://mirrorful.com/">Website</a> | <a href="https://www.mirrorful.com/docs/home/intropage">Documentation</a>
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
  <a href="https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA">
    <img src="https://img.shields.io/badge/chat-on%20Slack-blueviolet" alt="Slack community channel" />
  </a>
  <a href="https://twitter.com/mirrorful">
    <img src="https://img.shields.io/twitter/follow/mirrorful?label=Follow" alt="Mirrorful Twitter" />
  </a>
</h4>

<img src="./assets/Asset.png" width="100%" alt="Mirrorful Dashboard" />

## Introduction

**[Mirrorful](https://mirrorful.com)** is an open-source design system framework that teams use to create and manage the building blocks of their app. Get started for free with **[Mirrorful Cloud](https://app.mirrorful.com)**.

## ✨ Features

- **[Design tokens](https://www.mirrorful.com/docs/home/export-formats/introduction)** — a single source of truth for your tokens.
- **[Theme generation](https://app.mirrorful.com)** — generate dark mode instantly.
- **[Component library agnostic](https://www.mirrorful.com/docs/home/examples)** — whether you’re a third-party or your in-house library, Mirrorful hooks right in.
- **[Eslint rules](/packages/eslint-plugin/)** — detect hard-coded color strings throughout your project and help you convert them to the Mirrorful theme.
- **[Components](https://forms.gle/tidLkuXsScz1Edj28)** — _coming soon_ 👀

## ☁️ Get started

Check out our **[quickstart guide](https://www.mirrorful.com/docs/home/intropage)**.

### Mirrorful Cloud

The fastest way to get started with Mirrorful is with **[Mirrorful Cloud](https://mirrorful.com)**.

### Alternatively, run Mirrorful locally:

To run Mirrorful locally, you need to run both the `web` project and the `server`.

```bash
git clone https://github.com/Mirrorful/mirrorful.git; cd mirrorful; cd apps/web; yarn; yarn dev
```

Visit `localhost:3000`. In a separate window, run the server at `localhost:8080`:

Before running the server, you'll need to install `mongodb` and run it in the background:

```bash
# from project root
cd packages/server; brew tap mongodb/brew; brew install mongodb-community@6.0; mongod --dbpath ./db/data
```

```bash
# from project root
cd packages/server; yarn; yarn dev
```

## ⭐ Open-source vs. paid

This repo is entirely MIT licensed. Need any integrations or want a new feature? Feel free to [create an issue](https://github.com/Mirrorful/mirrorful/issues) or contribute directly to the repository. The first draft of this README was made by a contributor!

To learn more, please visit our [pricing page](https://www.mirrorful.com/pricing).

## 🛠️ Contributing

Whether it's big or small, we love contributions. Check out our **[contributing guide](https://mirrorful.com/docs/home/contributing)**.

### Community & Support

- [Slack](https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA) join our growing community!
- [Issues](https://github.com/Mirrorful/mirrorful/issues) report any bugs you encounter using Mirrorful.
- [YouTube](https://www.youtube.com/channel/UCcwtacSuKB8itMDMIfkkuHQ) watch content about coding and design systems.
- [Docs](https://www.mirrorful.com/) read our documentation.

### Acknowledgements

The avatars of all contributors will be added to this section as a thank you. We are so appreciative of everyone who makes Mirrorful special. Be part of the movement! Join us on **[Slack](https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA)** and try out **[Mirrorful Cloud](app.mirrorful.com)**.

<a href="https://github.com/teddarific"><img src="https://avatars.githubusercontent.com/u/16343600" width="50" height="50" alt=""/></a> <a href="https://github.com/isabellytubao"><img src="https://avatars.githubusercontent.com/u/113177368" width="50" height="50" alt=""/></a> <a href="https://github.com/gfang200"><img src="https://avatars.githubusercontent.com/u/13005240?v=4" width="50" height="50" alt=""/></a> <a href="https://github.com/sallyxu"><img src="https://avatars.githubusercontent.com/u/1229627" width="50" height="50" alt=""/></a> <a href="https://github.com/zachsnoek"><img src="https://avatars.githubusercontent.com/u/26049962" width="50" height="50" alt=""/></a>
<a href="https://github.com/tobiasdossinger"><img src="https://avatars.githubusercontent.com/u/33021996?v=4" width="50" height="50" alt=""/></a>
<a href="https://github.com/lagneshthakur"><img src="https://avatars.githubusercontent.com/u/13376802?v=4" width="50" height="50" alt=""/></a>
<a href="https://github.com/Pranav2612000"><img src="https://avatars.githubusercontent.com/u/20909078?v=4" width="50" height="50" alt=""/></a>
<a href="https://github.com/joelcmk"><img src="https://avatars.githubusercontent.com/u/57118300?v=4" width="50" height="50" alt=""/></a>
<a href="https://github.com/karanvirsb"><img src="https://avatars.githubusercontent.com/u/71354242?v=4" width="50" height="50" alt=""/></a>
<a href="https://github.com/ktra99"><img src="https://avatars.githubusercontent.com/u/82717216?v=4" width="50" height="50" alt=""/></a>
<a href="https://github.com/Bismay5467"><img src="https://avatars.githubusercontent.com/u/54050465?v=4" width="50" height="50" alt=""/></a>
<a href="https://github.com/dsinghvi"><img src="https://avatars.githubusercontent.com/u/10870189?v=4" width="50" height="50" alt=""/></a>
<a href="https://github.com/sonylomo"><img src="https://avatars.githubusercontent.com/u/49971500?v=4" width="50" height="50" alt=""/></a>
<a href="https://github.com/semijacks"><img src="https://avatars.githubusercontent.com/u/42486498?v=4" width="50" height="50" alt=""/></a>

<div align="center">
  <img width="500" src="./assets/Community.png" alt="Community">
</div>
