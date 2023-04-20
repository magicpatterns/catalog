"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIdentitySchemaCreator = void 0;
const schema_utils_1 = require("../builders/schema-utils");
function createIdentitySchemaCreator(schemaType, validate) {
    return () => {
        const baseSchema = {
            parse: validate,
            json: validate,
            getType: () => schemaType,
        };
        return {
            ...baseSchema,
            ...(0, schema_utils_1.getSchemaUtils)(baseSchema),
        };
    };
}
exports.createIdentitySchemaCreator = createIdentitySchemaCreator;
