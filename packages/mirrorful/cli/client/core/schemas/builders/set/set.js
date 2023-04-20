"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = void 0;
const Schema_1 = require("../../Schema");
const list_1 = require("../list");
const schema_utils_1 = require("../schema-utils");
function set(schema) {
    const listSchema = (0, list_1.list)(schema);
    const baseSchema = {
        parse: async (raw, opts) => {
            const parsedList = await listSchema.parse(raw, opts);
            if (parsedList.ok) {
                return {
                    ok: true,
                    value: new Set(parsedList.value),
                };
            }
            else {
                return parsedList;
            }
        },
        json: async (parsed, opts) => {
            if (!(parsed instanceof Set)) {
                return {
                    ok: false,
                    errors: [
                        {
                            path: [],
                            message: "Not a Set",
                        },
                    ],
                };
            }
            const jsonList = await listSchema.json([...parsed], opts);
            return jsonList;
        },
        getType: () => Schema_1.SchemaType.SET,
    };
    return {
        ...baseSchema,
        ...(0, schema_utils_1.getSchemaUtils)(baseSchema),
    };
}
exports.set = set;
