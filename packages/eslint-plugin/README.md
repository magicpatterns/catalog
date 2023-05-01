# eslint-plugin-mirrorful 🪞✨

This directory contains a plugin containing ESLint rules for Mirrorful. This plugin should only be installed into a pre-existing [Mirrorful](https://github.com/mirrorful/mirrorful) project.

See it in action [here](https://github.com/Mirrorful/mirrorful/tree/main/examples/eslint-demo).

## 📦 Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-mirrorful`:

```sh
npm install eslint-plugin-mirrorful --save-dev
```

## 🔧 Usage

Add `mirrorful` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["mirrorful"]
}
```

Then, simply extend the recommended configuration.

```json
{
  "extends": ["plugin:mirrorful/recommended"]
}
```

Alternatively, you can individually configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "mirrorful/no-hardcoded-colors": 2
  }
}
```

## 📖 Rules

<!-- begin auto-generated rules list -->

| Name                                                                                                                        | Description                                           |
| :-------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------- |
| [no-hardcoded-colors](https://github.com/Mirrorful/mirrorful/blob/main/packages/eslint-plugin/rules/no-hardcoded-colors.md) | Disallow hard-coded color values when using Mirrorful |

<!-- end auto-generated rules list -->

## 💻 Development and Publishing

You can publish this plugin to the [NPM registry](https://www.npmjs.com/package/eslint-plugin-mirrorful):

```
npm publish
```

Additional rules can be added as files to the `lib/rules` directory. Corresponding unit tests should go in `tests/lib/rules`.
