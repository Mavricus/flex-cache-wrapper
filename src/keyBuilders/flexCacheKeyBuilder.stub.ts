import { IFlexCacheKeyBuilder } from './flexCacheKeyBuilder';
import { SinonStub } from 'sinon';
import sinon from 'sinon';

export class FlexCacheKeyBuilderStub implements IFlexCacheKeyBuilder {
    stubs: {
        build: SinonStub;
    };

    constructor() {
        this.stubs = {
            build: sinon.stub()
        };
    }

    build(args: Array<unknown>): string {
        return this.stubs.build(args);
    }
}
