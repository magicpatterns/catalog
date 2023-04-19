"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enum_ = void 0;
const Schema_1 = require("../../Schema");
const createIdentitySchemaCreator_1 = require("../../utils/createIdentitySchemaCreator");
function enum_(values) {
    const validValues = new Set(values);
    const schemaCreator = (0, createIdentitySchemaCreator_1.createIdentitySchemaCreator)(Schema_1.SchemaType.ENUM, (value, { allowUnrecognizedEnumValues } = {}) => {
        if (typeof value === "string" && (validValues.has(value) || allowUnrecognizedEnumValues)) {
            return {
                ok: true,
                value: value,
            };
        }
        else {
            return {
                ok: false,
                errors: [
                    {
                        path: [],
                        message: "Not one of the allowed values",
                    },
                ],
            };
        }
    });
    return schemaCreator();
}
exports.enum_ = enum_;
