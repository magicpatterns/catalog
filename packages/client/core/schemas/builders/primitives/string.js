"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = void 0;
const Schema_1 = require("../../Schema");
const createIdentitySchemaCreator_1 = require("../../utils/createIdentitySchemaCreator");
exports.string = (0, createIdentitySchemaCreator_1.createIdentitySchemaCreator)(Schema_1.SchemaType.STRING, (value) => {
    if (typeof value === "string") {
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
                    message: "Not a string",
                },
            ],
        };
    }
});
