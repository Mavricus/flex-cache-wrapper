import { IFlexCacheKeyBuilder } from './flexCacheKeyBuilder';

export class FlexCacheKeyBuilderJoiner implements IFlexCacheKeyBuilder {
    private readonly builders: Array<IFlexCacheKeyBuilder>;

    constructor(...builders: Array<IFlexCacheKeyBuilder>) {
        this.builders = builders;
    }

    build(args: Array<unknown>): string {
        return this.builders.reduce((key, builder) => `${key}:${builder.build(args)}`, '');
    }
}
