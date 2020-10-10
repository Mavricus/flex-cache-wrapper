import { FlexCacheFromToArgsKeyBuilder } from './flexCacheFromToArgsKeyBuilder';

export class FlexCacheFirstNArgKeyBuilder extends FlexCacheFromToArgsKeyBuilder{
    constructor(private n: number) {
        super(1, n);
    }
}
