/**
 * @fileoverview Disallow hard-coded color values when using Mirrorful
 * @author Tyler Vergho
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const HEX_COLOR_REGEX =
  /#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})\b/
const RGB_COLOR_REGEX =
  /rgba?\((\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*([01]?\.?\d*|1)\s*)?)\)/
const CSS_COLOR_NAMES_REGEX =
  /(?<![a-zA-Z0-9-])\b(?:aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)\b(?![a-zA-Z0-9-])/

const fs = require('fs')
const path = require('path')

const themePath = path.resolve(process.cwd(), '.mirrorful/theme_cjs.cjs')
let colorMap = {}
let programNode

// Check if the theme file exists
if (fs.existsSync(themePath)) {
  const theme = require(themePath).Tokens.colors
  colorMap = Object.entries(theme).reduce((map, [parentKey, parentValue]) => {
    Object.entries(parentValue).forEach(([childKey, childValue]) => {
      map[childValue] = `${parentKey}.${childKey}`
    })
    return map
  }, {})
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    hasSuggestions: false,
    type: 'suggestion', // `problem`, `suggestion`, or `layout`
    docs: {
      description: 'Disallow hard-coded color values when using Mirrorful',
      recommended: false,
      url: null,
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      noHardcodedColors:
        'Avoid hard-coded color values. Use Mirrorful tokens instead.',
    },
  },
  create(context) {
    return {
      Program(node) {
        programNode = node
      },
      Literal(node) {
        const { value } = node
        if (typeof value !== 'string') return
        const suggestedVariable = colorMap[value.toLowerCase()]
        const sourceCode = context.getSourceCode()
        const text = sourceCode.getText(node.parent)

        const importStatementRegex =
          /import\s+\{\s*Tokens(\s+as\s+(\w+))?\s*\}\s+from\s+'.mirrorful\/theme'/
        const importStatementMatch = sourceCode.text.match(importStatementRegex)
        const tokensAlias = importStatementMatch
          ? importStatementMatch[2] || 'Tokens'
          : 'Tokens'
        const isPartOfTokensObject = text.includes(tokensAlias) // Don't throw a warning if it's already an imported part of the Tokens object

        const importStatement = `import { Tokens } from '.mirrorful/theme';`

        if (
          !isPartOfTokensObject &&
          (HEX_COLOR_REGEX.test(value) ||
            RGB_COLOR_REGEX.test(value) ||
            CSS_COLOR_NAMES_REGEX.test(value))
        ) {
          context.report({
            node,
            messageId: 'noHardcodedColors',
            fix: suggestedVariable
              ? (fixer) => {
                  const [parentKey, childKey] = suggestedVariable.split('.')

                  // If the key is a number or includes a dash, it needs to be bracket notation
                  const childKeyBracket =
                    /^\d+$/.test(childKey) || childKey.includes('-')
                  const parentKeyBracket =
                    /^\d+$/.test(parentKey) || parentKey.includes('-')
                  const replacement = `${tokensAlias}.colors${
                    parentKeyBracket ? `['${parentKey}']` : `.${parentKey}`
                  }${childKeyBracket ? `['${childKey}']` : `.${childKey}`}`

                  if (importStatementMatch) {
                    return fixer.replaceText(node, replacement)
                  } else {
                    return [
                      fixer.insertTextBefore(
                        programNode,
                        importStatement + '\n'
                      ),
                      fixer.replaceText(node, replacement),
                    ]
                  }
                }
              : undefined,
          })
        }
      },
    }
  },
}
