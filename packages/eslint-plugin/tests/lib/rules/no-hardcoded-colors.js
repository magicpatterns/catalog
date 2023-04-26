/* eslint-disable eslint-plugin/consistent-output */
/**
 * @fileoverview Disallow hard-coded color values when using Mirrorful
 * @author Tyler Vergho
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-hardcoded-colors"),
  RuleTester = require("eslint").RuleTester;

const messageId = 'noHardcodedColors';
const importStatement = "import { Tokens } from '.mirrorful/theme';\n";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2018, sourceType: 'module', ecmaFeatures: { jsx: true } },
});
ruleTester.run("no-hardcoded-colors", rule, {
  valid: [
    "const backgroundColor = Tokens.primary.base;",
    "<button style={{ backgroundColor: Tokens.colors.blue['300'] }}>Click</button>",
    "<button style={{ backgroundColor: Tokens.colors['medium-purple']['50'] }}>Click</button>",
    "const notAColor = 'my-red';", // Invalid CSS color name
    "const notAColor = '#1234567';" // Invalid hex length
  ],

  invalid: [
    // Hex codes
    {
      code: "const backgroundColor = '#C2EA7A';",
      errors: [{ messageId, type: 'Literal' }],
      output: `${importStatement}const backgroundColor = Tokens.colors.sulu.base;`,
    },
    {
      code: "<button style={{ backgroundColor: '#fefeff' }}>Click</button>",
      errors: [{ messageId, type: 'Literal' }],
      output: `${importStatement}<button style={{ backgroundColor: Tokens.colors['medium-purple']['50'] }}>Click</button>`,
    },
    {
      code: "const styles = { color: 'green', backgroundColor: '#7aeaca' };",
      errors: [{ messageId, type: 'Literal' }, { messageId, type: 'Literal' }],
      output: `${importStatement}const styles = { color: 'green', backgroundColor: Tokens.colors.bermuda.base };`,
    },
    // RGB
    {
      code: "const color = 'rgb(0, 0, 0)';",
      errors: [{ messageId, type: 'Literal' }],
    },
    {
      code: "<button style={{ color: 'rgba(0, 0, 0, 0)' }}>Click</button>",
      errors: [{ messageId, type: 'Literal' }],
    },
    {
      code: "<div style={{ border: '1px solid rgba(0, 0, 0, 0)' }}>Test</div>",
      errors: [{ messageId, type: 'Literal' }],
    },
    {
      code: "<button style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>Click</button>",
      errors: [{ messageId, type: 'Literal' }],
    },
    // CSS color names
    {
      code: "const color = 'red';",
      errors: [{ messageId, type: 'Literal' }],
    },
    {
      code: "<button style={{ color: 'red' }}>Click</button>",
      errors: [{ messageId, type: 'Literal' }],
    },
    // Tailwind
    {
      code: '<div className="card bg-[#c5aff2]">Test</div>',
      errors: [{ messageId, type: 'Literal' }],
    }
  ],
});
