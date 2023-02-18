"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNpmName = void 0;
// eslint-disable-next-line import/no-extraneous-dependencies
const validate_npm_package_name_1 = __importDefault(require("validate-npm-package-name"));
function validateNpmName(name) {
    const nameValidation = (0, validate_npm_package_name_1.default)(name);
    if (nameValidation.validForNewPackages) {
        return { valid: true };
    }
    return {
        valid: false,
        problems: [
            ...(nameValidation.errors || []),
            ...(nameValidation.warnings || []),
        ],
    };
}
exports.validateNpmName = validateNpmName;
