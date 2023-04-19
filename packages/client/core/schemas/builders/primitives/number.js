"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.number = void 0;
const Schema_1 = require("../../Schema");
const createIdentitySchemaCreator_1 = require("../../utils/createIdentitySchemaCreator");
exports.number = (0, createIdentitySchemaCreator_1.createIdentitySchemaCreator)(Schema_1.SchemaType.NUMBER, (value) => {
    if (typeof value === "number") {
        return {
            ok: true,
            value,
        };
    }
    else {
        return {
            ok: false,
            errors: [
                {
                    path: [],
                    message: "Not a number",
                },
            ],
        };
    }
});
