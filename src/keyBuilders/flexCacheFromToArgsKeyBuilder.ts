import { FlexCacheAbstractIndexKeyBuilder } from './flexCacheAbstractIndexKeyBuilder';

export class FlexCacheFromToArgsKeyBuilder extends FlexCacheAbstractIndexKeyBuilder {
    constructor(private readonly from: number, private readonly to: number) {
        super();
        
        this.from -= 1;
        if (this.from < 0) {
            throw new Error('First index mist be positive number');
        }
        if (to < from) {
            throw new Error('Starting index is greater then final');
        }
    }

    protected getFrom(argsLen: number): number {
        if (argsLen < this.from) {
            throw new Error('Arguments list is too short');
        }
        return this.from;
    }

    protected getTo(argsLen: number): number {
        return Math.min(this.to, argsLen);
    }
}
