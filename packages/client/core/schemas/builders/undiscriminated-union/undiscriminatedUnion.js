"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.undiscriminatedUnion = void 0;
const Schema_1 = require("../../Schema");
const schema_utils_1 = require("../schema-utils");
function undiscriminatedUnion(schemas) {
    const baseSchema = {
        parse: async (raw, opts) => {
            return validateAndTransformUndiscriminatedUnion((schema) => schema.parse(raw, opts), schemas);
        },
        json: async (parsed, opts) => {
            return validateAndTransformUndiscriminatedUnion((schema) => schema.json(parsed, opts), schemas);
        },
        getType: () => Schema_1.SchemaType.UNDISCRIMINATED_UNION,
    };
    return {
        ...baseSchema,
        ...(0, schema_utils_1.getSchemaUtils)(baseSchema),
    };
}
exports.undiscriminatedUnion = undiscriminatedUnion;
async function validateAndTransformUndiscriminatedUnion(transform, schemas) {
    const errors = [];
    for (const schema of schemas) {
        const transformed = await transform(schema);
        if (transformed.ok) {
            return transformed;
        }
        else if (errors.length === 0) {
            errors.push(...transformed.errors);
        }
    }
    return {
        ok: false,
        errors,
    };
}
