"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boolean = void 0;
const Schema_1 = require("../../Schema");
const createIdentitySchemaCreator_1 = require("../../utils/createIdentitySchemaCreator");
exports.boolean = (0, createIdentitySchemaCreator_1.createIdentitySchemaCreator)(Schema_1.SchemaType.BOOLEAN, (value) => {
    if (typeof value === "boolean") {
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
                    message: "Not a boolean",
                },
            ],
        };
    }
});
