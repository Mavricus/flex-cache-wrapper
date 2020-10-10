import { FlexCacheFromToArgsKeyBuilder } from './flexCacheFromToArgsKeyBuilder';

export class FlexCacheFromArgKeyBuilder extends FlexCacheFromToArgsKeyBuilder {
    constructor(private n: number) {
        super(n, Infinity);
    }
}
