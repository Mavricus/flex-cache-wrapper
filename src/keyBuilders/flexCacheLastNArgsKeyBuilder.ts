import { FlexCacheAbstractIndexKeyBuilder } from './flexCacheAbstractIndexKeyBuilder';

export class FlexCacheLastNArgsKeyBuilder extends FlexCacheAbstractIndexKeyBuilder {
    constructor(private n: number) {
        super();
    }

    protected getFrom(argsLen: number): number {
        return Math.max(argsLen - this.n, 0);
    }

    protected getTo(argsLen: number): number {
        return argsLen;
    }
}
