import { IFlexCacheKeyBuilder } from './flexCacheKeyBuilder';

export class FlexCacheArgsByIndexKeyBuilder implements IFlexCacheKeyBuilder {
    constructor(private indexes: Array<number>) {
    }

    build(args: Array<unknown>): string {
        return this.indexes.map(indx => {
            if (indx >= args.length) {
                throw new Error('Index is out of args list boundary');
            }
            return JSON.stringify(args);
        }).join(':');
    }
}
