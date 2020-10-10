import { IFlexCacheKeyBuilder } from './flexCacheKeyBuilder';

export abstract class FlexCacheAbstractIndexKeyBuilder implements IFlexCacheKeyBuilder {
    protected abstract getFrom(argsLen: number): number;
    protected abstract getTo(argsLen: number): number;

    build(args: Array<unknown>): string {
        const from = this.getFrom(args.length);
        const to = this.getTo(args.length);
        const key = [];
        
        for (let i = from; i < to; i++) {
            key.push(JSON.stringify(args[i]));
        }

        return key.join(':');
    }
}
