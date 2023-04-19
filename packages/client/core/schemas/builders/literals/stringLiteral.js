"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringLiteral = void 0;
const Schema_1 = require("../../Schema");
const createIdentitySchemaCreator_1 = require("../../utils/createIdentitySchemaCreator");
function stringLiteral(literal) {
    const schemaCreator = (0, createIdentitySchemaCreator_1.createIdentitySchemaCreator)(Schema_1.SchemaType.STRING_LITERAL, (value) => {
        if (value === literal) {
            return {
                ok: true,
                value: literal,
            };
        }
        else {
            return {
                ok: false,
                errors: [
                    {
                        path: [],
                        message: `Not equal to "${literal}"`,
                    },
                ],
            };
        }
    });
    return schemaCreator();
}
exports.stringLiteral = stringLiteral;
