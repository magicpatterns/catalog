/**
 * @fileoverview Disallow hard-coded color values when using Mirrorful
 * @author Tyler Vergho
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const HEX_COLOR_REGEX = /#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})\b/;
const RGB_COLOR_REGEX = /rgba?\((\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*([01]?\.?\d*|1)\s*)?)\)/;
const CSS_COLOR_NAMES_REGEX = /(?<![a-zA-Z0-9-])\b(?:aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow)\b(?![a-zA-Z0-9-])/;

const fs = require('fs');
const path = require('path');

const themePath = path.resolve(process.cwd(), '.mirrorful/theme_cjs.cjs');
let colorMap = {};
let programNode;

// Check if the theme file exists
if (fs.existsSync(themePath)) {
  const theme = require(themePath).Tokens.colors;
  colorMap = Object.entries(theme).reduce((map, [parentKey, parentValue]) => {
    Object.entries(parentValue).forEach(([childKey, childValue]) => {
      map[childValue] = `${parentKey}.${childKey}`;
    });
    return map;
  }, {});
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    hasSuggestions: false, 
    type: 'suggestion', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Disallow hard-coded color values when using Mirrorful",
      recommended: false,
      url: null,
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      noHardcodedColors: "Avoid using hard-coded color values. Use Mirrorful tokens instead.",
    }
  },
  create(context) {
    return {
      Program(node) {
        programNode = node;
      },
      Literal(node) {
        const { value } = node;
        if (typeof value !== 'string') return;
        const suggestedVariable = colorMap[value.toLowerCase()];
        const sourceCode = context.getSourceCode();
        const text = sourceCode.getText(node.parent);
        const isPartOfTokensObject = text.includes('Tokens'); // Don't throw a warning if it's already an imported part of the Tokens object

        const importStatement = "import { Tokens } from '.mirrorful/theme';";
        const hasImportStatement = sourceCode.text.includes('import { Tokens }');

        if (!isPartOfTokensObject && (HEX_COLOR_REGEX.test(value) || RGB_COLOR_REGEX.test(value) || CSS_COLOR_NAMES_REGEX.test(value))) {
          context.report({
            node,
            messageId: "noHardcodedColors",
            fix: suggestedVariable 
              ? 
                (fixer) => {
                  const [parentKey, childKey] = suggestedVariable.split('.');

                  // If the key is a number or includes a dash, it needs to be bracket notation
                  const childKeyBracket = /^\d+$/.test(childKey) || childKey.includes('-'); 
                  const parentKeyBracket = /^\d+$/.test(parentKey) || parentKey.includes('-');
                  const replacement = `Tokens.colors${parentKeyBracket ? `['${parentKey}']` : `.${parentKey}`}${childKeyBracket ? `['${childKey}']` : `.${childKey}`}`;
                  
                  if (hasImportStatement) {
                    return fixer.replaceText(node, replacement);
                  } else {
                    return [
                      fixer.insertTextBefore(programNode, importStatement + '\n'),
                      fixer.replaceText(node, replacement),
                    ];
                  }
                }
              : undefined,
          });
        }
      },
    };
  },
};
