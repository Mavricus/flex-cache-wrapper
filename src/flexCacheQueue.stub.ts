import { IFlexCacheQueue, IFlexCacheQueueItem } from './flexCacheQueue';
import { SinonStub } from 'sinon';
import sinon from 'sinon';

export class FlexCacheQueueStub implements IFlexCacheQueue {
    stubs: {
        push: SinonStub;
        rejectQueue: SinonStub;
        resolveQueue: SinonStub;
    };

    constructor() {
        this.stubs = {
            push: sinon.stub(),
            rejectQueue: sinon.stub(),
            resolveQueue: sinon.stub()
        };
    }

    push<T>(key: string, item: IFlexCacheQueueItem<any>): number {
        return this.stubs.push(key, item);
    }

    rejectQueue<T>(key: string, err: Error): void {
        return this.stubs.rejectQueue(key, err);
    }

    resolveQueue<T>(key: string, data: T): void {
        return this.stubs.resolveQueue(key, data);
    }

}
