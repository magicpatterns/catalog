"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.union = void 0;
const Schema_1 = require("../../Schema");
const isPlainObject_1 = require("../../utils/isPlainObject");
const keys_1 = require("../../utils/keys");
const enum_1 = require("../enum");
const object_like_1 = require("../object-like");
const schema_utils_1 = require("../schema-utils");
function union(discriminant, union) {
    const rawDiscriminant = typeof discriminant === "string" ? discriminant : discriminant.rawDiscriminant;
    const parsedDiscriminant = typeof discriminant === "string"
        ? discriminant
        : discriminant.parsedDiscriminant;
    const discriminantValueSchema = (0, enum_1.enum_)((0, keys_1.keys)(union));
    const baseSchema = {
        parse: async (raw, opts) => {
            return transformAndValidateUnion({
                value: raw,
                discriminant: rawDiscriminant,
                transformedDiscriminant: parsedDiscriminant,
                transformDiscriminantValue: (discriminantValue) => discriminantValueSchema.parse(discriminantValue, {
                    allowUnrecognizedEnumValues: opts?.allowUnrecognizedUnionMembers,
                }),
                getAdditionalPropertiesSchema: (discriminantValue) => union[discriminantValue],
                allowUnrecognizedUnionMembers: opts?.allowUnrecognizedUnionMembers,
                transformAdditionalProperties: (additionalProperties, additionalPropertiesSchema) => additionalPropertiesSchema.parse(additionalProperties, opts),
            });
        },
        json: async (parsed, opts) => {
            return transformAndValidateUnion({
                value: parsed,
                discriminant: parsedDiscriminant,
                transformedDiscriminant: rawDiscriminant,
                transformDiscriminantValue: (discriminantValue) => discriminantValueSchema.json(discriminantValue, {
                    allowUnrecognizedEnumValues: opts?.allowUnrecognizedUnionMembers,
                }),
                getAdditionalPropertiesSchema: (discriminantValue) => union[discriminantValue],
                allowUnrecognizedUnionMembers: opts?.allowUnrecognizedUnionMembers,
                transformAdditionalProperties: (additionalProperties, additionalPropertiesSchema) => additionalPropertiesSchema.json(additionalProperties, opts),
            });
        },
        getType: () => Schema_1.SchemaType.UNION,
    };
    return {
        ...baseSchema,
        ...(0, schema_utils_1.getSchemaUtils)(baseSchema),
        ...(0, object_like_1.getObjectLikeUtils)(baseSchema),
    };
}
exports.union = union;
async function transformAndValidateUnion({ value, discriminant, transformedDiscriminant, transformDiscriminantValue, getAdditionalPropertiesSchema, allowUnrecognizedUnionMembers = false, transformAdditionalProperties, }) {
    if (!(0, isPlainObject_1.isPlainObject)(value)) {
        return {
            ok: false,
            errors: [
                {
                    path: [],
                    message: isPlainObject_1.NOT_AN_OBJECT_ERROR_MESSAGE,
                },
            ],
        };
    }
    const { [discriminant]: discriminantValue, ...additionalProperties } = value;
    if (discriminantValue == null) {
        return {
            ok: false,
            errors: [
                {
                    path: [],
                    message: `Missing discriminant ("${discriminant}")`,
                },
            ],
        };
    }
    const transformedDiscriminantValue = await transformDiscriminantValue(discriminantValue);
    if (!transformedDiscriminantValue.ok) {
        return {
            ok: false,
            errors: transformedDiscriminantValue.errors.map((error) => ({
                path: [discriminant, ...error.path],
                message: error.message,
            })),
        };
    }
    const additionalPropertiesSchema = getAdditionalPropertiesSchema(transformedDiscriminantValue.value);
    if (additionalPropertiesSchema == null) {
        if (allowUnrecognizedUnionMembers) {
            return {
                ok: true,
                value: {
                    [transformedDiscriminant]: transformedDiscriminantValue.value,
                    ...additionalProperties,
                },
            };
        }
        else {
            return {
                ok: false,
                errors: [
                    {
                        path: [discriminant],
                        message: "Unrecognized discriminant value",
                    },
                ],
            };
        }
    }
    const transformedAdditionalProperties = await transformAdditionalProperties(additionalProperties, additionalPropertiesSchema);
    if (!transformedAdditionalProperties.ok) {
        return transformedAdditionalProperties;
    }
    return {
        ok: true,
        value: {
            [transformedDiscriminant]: discriminantValue,
            ...transformedAdditionalProperties.value,
        },
    };
}
