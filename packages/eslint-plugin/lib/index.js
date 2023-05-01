/**
 * @fileoverview ESLint rules for Mirrorful.
 * @author Tyler Vergho
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");

module.exports.configs = {
  recommended: {
    plugins: ["mirrorful"],
    rules: {
      "mirrorful/no-hardcoded-colors": "error",
    },
  },
}

