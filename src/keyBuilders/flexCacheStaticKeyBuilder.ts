import { IFlexCacheKeyBuilder } from './flexCacheKeyBuilder';

export class FlexCacheStaticKeyBuilder implements IFlexCacheKeyBuilder {
    constructor(private key: string) {
    }

    build(args: Array<unknown>): string {
        return this.key;
    }
}
