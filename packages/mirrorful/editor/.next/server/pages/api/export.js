"use strict";
(() => {
var exports = {};
exports.id = 385;
exports.ids = [385];
exports.modules = {

/***/ 723:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: external "fs"
const external_fs_namespaceObject = require("fs");
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_namespaceObject);
;// CONCATENATED MODULE: ./src/pages/api/export.ts

const getKeys = Object.keys;
const rootPath = `../.mirrorful/`;
const generateCssFile = async ({ colorData  })=>{
    let scssContent = ``;
    let cssContent = `:root {\n`;
    colorData.forEach((color)=>{
        scssContent += `$color-${color.name.toLowerCase()}: ${color.hex};\n`;
        cssContent += `--color-${color.name.toLowerCase()}: ${color.hex};\n`;
        getKeys(color.scale).forEach((key)=>{
            cssContent += `--color-${color.name.toLowerCase()}-${key}: ${color.scale[key]};\n`;
            scssContent += `$color-${color.name.toLowerCase()}-${key}: ${color.scale[key]};\n`;
        });
    });
    cssContent += `}\n`;
    scssContent += `\n${cssContent}`;
    await external_fs_default().writeFileSync(`${rootPath}/theme.css`, cssContent);
    await external_fs_default().writeFileSync(`${rootPath}/theme.scss`, scssContent);
};
async function handler(req, res) {
    const body = JSON.parse(req.body);
    await generateCssFile({
        colorData: body.colorData
    });
    return res.status(200).json({
        message: "Success"
    });
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(723));
module.exports = __webpack_exports__;

})();