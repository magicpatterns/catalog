/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as core from "./core";
import { Registry } from "./api/resources/registry/client/Client";
export declare namespace MirrorfulApiClient {
    interface Options {
        environment: string;
        token?: core.Supplier<core.BearerToken | undefined>;
    }
}
export declare class MirrorfulApiClient {
    protected readonly options: MirrorfulApiClient.Options;
    constructor(options: MirrorfulApiClient.Options);
    protected _registry: Registry | undefined;
    get registry(): Registry;
}
