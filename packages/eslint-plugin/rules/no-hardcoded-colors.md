# Disallow hard-coded color values when using Mirrorful (`mirrorful/no-hardcoded-colors`)

When using Mirrorful, it is preferred to use the exported colors from the Mirrorful library over hardcoded hex, RGB, or CSS color values.

## Rule Details

This rule catches hardcoded hex, RGB, or CSS color values in string literals in Javascript code. If the string literal hex code matches a configuration value that is in the Mirrorful configuration (`.mirrorful/theme_cjs.cjs`), then it will automatically update the code to import from the Mirrorful `Tokens` object.

Examples of **incorrect** code for this rule:

```js
<Button
  style={{
    backgroundColor: ‘#fe3bc3’,
    fontWeight: 600,
    color: ‘rgb(0, 0, 0)’
  }}
>
  Complete
</Button>

const color = 'rgb(0, 0, 0)';
```

Examples of **correct** code for this rule:

```js
;<Button
  style={{
    backgroundColor: Tokens.colors.primary,
    fontWeight: 600,
    color: Tokens.black.base,
  }}
>
  Complete
</Button>

const color = Tokens.red.base
```
