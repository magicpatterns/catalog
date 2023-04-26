# eslint-plugin-mirrorful

This directory contains a plugin containing ESLint rules for Mirrorful. This plugin should only be installed into a pre-existing [Mirrorful](https://github.com/mirrorful/mirrorful) project.

See it in action [here](/examples/tailwind-next/).

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-mirrorful`:

```sh
npm install eslint-plugin-mirrorful --save-dev
```

## Usage

Add `mirrorful` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "mirrorful"
    ]
}
```


Then, simply extend the recommended configuration.

```json
{
    "extends": [
        "plugin:mirrorful/recommended",
    ]
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

## Publishing

You can publish this plugin to the NPM registry:

```
npm publish
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                                     | Description                                           |
| :------------------------------------------------------- | :---------------------------------------------------- |
| [no-hardcoded-colors](docs/rules/no-hardcoded-colors.md) | Disallow hard-coded color values when using Mirrorful |

<!-- end auto-generated rules list -->


