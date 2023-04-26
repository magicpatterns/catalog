"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.darkTheme = exports.lightTheme = exports.GlobalStyles = void 0;
var styled_components_1 = require("styled-components");
var theme_1 = require("./.mirrorful/theme");
exports.GlobalStyles = (0, styled_components_1.createGlobalStyle)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    :root {\n  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;\n  line-height: 1.5;\n  font-weight: ", ";\n\n  color: ", ";\n  background-color: ", ";\n  transition: background-color 0.2s ease-in, color 0.2s ease-in;\n\n  font-synthesis: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-text-size-adjust: 100%;\n}\n  body {\n    margin: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    min-width: 320px;\n    min-height: 100vh;\n    text-align: center;\n  }\n\n  h1 {\n  font-size: ", ";\n  line-height: ", ";\n}\n\n"], ["\n    :root {\n  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;\n  line-height: 1.5;\n  font-weight: ", ";\n\n  color: ", ";\n  background-color: ", ";\n  transition: background-color 0.2s ease-in, color 0.2s ease-in;\n\n  font-synthesis: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-text-size-adjust: 100%;\n}\n  body {\n    margin: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    min-width: 320px;\n    min-height: 100vh;\n    text-align: center;\n  }\n\n  h1 {\n  font-size: ", ";\n  line-height: ", ";\n}\n\n"])), theme_1.Tokens.fontWeights.light, function (_a) {
    var theme = _a.theme;
    return theme.text;
}, function (_a) {
    var theme = _a.theme;
    return theme.body;
}, theme_1.Tokens.fontSizes.xlg, theme_1.Tokens.lineHeights.short);
exports.lightTheme = {
    body: theme_1.Tokens.colors.white[600],
    text: theme_1.Tokens.colors['dark-bg'].text,
};
exports.darkTheme = {
    body: theme_1.Tokens.colors['dark-bg'].base,
    text: theme_1.Tokens.colors.white[600],
};
var templateObject_1;
