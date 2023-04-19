"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.record = void 0;
const Schema_1 = require("../../Schema");
const entries_1 = require("../../utils/entries");
const isPlainObject_1 = require("../../utils/isPlainObject");
const schema_utils_1 = require("../schema-utils");
function record(keySchema, valueSchema) {
    const baseSchema = {
        parse: async (raw, opts) => {
            return validateAndTransformRecord({
                value: raw,
                isKeyNumeric: (await keySchema.getType()) === Schema_1.SchemaType.NUMBER,
                transformKey: (key) => keySchema.parse(key, opts),
                transformValue: (value) => valueSchema.parse(value, opts),
            });
        },
        json: async (parsed, opts) => {
            return validateAndTransformRecord({
                value: parsed,
                isKeyNumeric: (await keySchema.getType()) === Schema_1.SchemaType.NUMBER,
                transformKey: (key) => keySchema.json(key, opts),
                transformValue: (value) => valueSchema.json(value, opts),
            });
        },
        getType: () => Schema_1.SchemaType.RECORD,
    };
    return {
        ...baseSchema,
        ...(0, schema_utils_1.getSchemaUtils)(baseSchema),
    };
}
exports.record = record;
async function validateAndTransformRecord({ value, isKeyNumeric, transformKey, transformValue, }) {
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
    return (0, entries_1.entries)(value).reduce(async (accPromise, [stringKey, value]) => {
        // skip nullish keys
        if (value == null) {
            return accPromise;
        }
        const acc = await accPromise;
        let key = stringKey;
        if (isKeyNumeric) {
            const numberKey = stringKey.length > 0 ? Number(stringKey) : NaN;
            if (!isNaN(numberKey)) {
                key = numberKey;
            }
        }
        const transformedKey = await transformKey(key);
        const transformedValue = await transformValue(value);
        if (acc.ok && transformedKey.ok && transformedValue.ok) {
            return {
                ok: true,
                value: {
                    ...acc.value,
                    [transformedKey.value]: transformedValue.value,
                },
            };
        }
        const errors = [];
        if (!acc.ok) {
            errors.push(...acc.errors);
        }
        if (!transformedKey.ok) {
            errors.push(...transformedKey.errors.map((error) => ({
                path: [`${key} (key)`, ...error.path],
                message: error.message,
            })));
        }
        if (!transformedValue.ok) {
            errors.push(...transformedValue.errors.map((error) => ({
                path: [stringKey, ...error.path],
                message: error.message,
            })));
        }
        return {
            ok: false,
            errors,
        };
    }, Promise.resolve({ ok: true, value: {} }));
}
