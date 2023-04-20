"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlainObject = exports.NOT_AN_OBJECT_ERROR_MESSAGE = void 0;
exports.NOT_AN_OBJECT_ERROR_MESSAGE = "Not an object";
// borrowed from https://github.com/lodash/lodash/blob/master/isPlainObject.js
function isPlainObject(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    if (Object.getPrototypeOf(value) === null) {
        return true;
    }
    let proto = value;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(value) === proto;
}
exports.isPlainObject = isPlainObject;
