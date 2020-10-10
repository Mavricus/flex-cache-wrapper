import { IFlexCacheQueueStorage, FlexCacheQueue, IFlexCacheQueueItem } from '../src/flexCacheQueue';
import sinon, { SinonStub } from 'sinon';

class QueueItemStub<T> implements IFlexCacheQueueItem<T> {
    stubs: {
        reject: SinonStub;
        resolve: SinonStub;
    };

    constructor() {
        this.stubs = {
            reject: sinon.stub(),
            resolve: sinon.stub()
        };
    }

    reject(reason: Error): void {
        return this.stubs.reject(reason);
    }

    resolve(value?: T): void {
        return this.stubs.resolve(value);
    }
}

describe('Queue', () => {
    let queue: FlexCacheQueue;
    let storage: IFlexCacheQueueStorage;

    beforeEach(() => {
        storage = {};
        queue = new FlexCacheQueue(storage);
    });

    describe('push', () => {
        it('should put data to storage', () => {
            expect(storage['a']).toBeUndefined();
            queue.push('a', new QueueItemStub());
            expect(storage['a'].length).toBe(1);
            queue.push('a', new QueueItemStub());
            expect(storage['a'].length).toBe(2);
        });

        it('should put data to different collections based on key', () => {
            expect(storage['a']).toBeUndefined();
            expect(storage['b']).toBeUndefined();
            queue.push('a', new QueueItemStub());
            expect(storage['a'].length).toBe(1);
            expect(storage['b']).toBeUndefined();
            queue.push('a', new QueueItemStub());
            expect(storage['a'].length).toBe(2);
            expect(storage['b']).toBeUndefined();
            queue.push('b', new QueueItemStub());
            expect(storage['a'].length).toBe(2);
            expect(storage['b'].length).toBe(1);
        });

        it('should return key collection size', () => {
            expect(queue.push('a', new QueueItemStub())).toBe(1);
            expect(queue.push('a', new QueueItemStub())).toBe(2);
            expect(queue.push('a', new QueueItemStub())).toBe(3);
        });
    });

    describe('resolveQueue', () => {
        let itemsA: Array<QueueItemStub<unknown>>;
        let itemsB: Array<QueueItemStub<unknown>>;
        const resolveResult: string = 'result';

        beforeEach(() => {
            itemsA = [new QueueItemStub(), new QueueItemStub(), new QueueItemStub()];
            itemsB = [new QueueItemStub(), new QueueItemStub(), new QueueItemStub()];
            itemsA.forEach(item => queue.push('a', item));
            itemsB.forEach(item => queue.push('b', item));
        });

        it('should resolve all queued items by key', () => {
            queue.resolveQueue('a', resolveResult);
            itemsA.forEach(item => {
                expect(item.stubs.resolve.calledOnce).toBe(true);
                expect(item.stubs.resolve.calledWith(resolveResult)).toBe(true);
                expect(item.stubs.reject.called).toBe(false);
            });
        });

        it('should not resolve all queued items by another key', () => {
            queue.resolveQueue('a', resolveResult);
            itemsB.forEach(item => {
                expect(item.stubs.resolve.called).toBe(false);
                expect(item.stubs.reject.called).toBe(false);
            });
        });

        it('should not throw an error if there is no items by key', () => {
            expect(() => queue.resolveQueue('c', resolveResult)).not.toThrow();
        });

        it('should empty queue after resolve by key', () => {
            expect(storage['a']).toBeDefined();
            expect(storage['b']).toBeDefined();
            queue.resolveQueue('a', resolveResult);
            expect(storage['a']).toBeUndefined();
            expect(storage['b']).toBeDefined();
        });
    });

    describe('rejectQueue', () => {
        let itemsA: Array<QueueItemStub<unknown>>;
        let itemsB: Array<QueueItemStub<unknown>>;
        const rejectResult: Error = new Error('Test error');

        beforeEach(() => {
            itemsA = [new QueueItemStub(), new QueueItemStub()];
            itemsB = [new QueueItemStub(), new QueueItemStub()];
            itemsA.forEach(item => queue.push('a', item));
            itemsB.forEach(item => queue.push('b', item));
        });

        it('should reject all queued items by key', () => {
            queue.rejectQueue('a', rejectResult);
            itemsA.forEach(item => {
                expect(item.stubs.reject.calledOnce).toBe(true);
                expect(item.stubs.reject.calledWith(rejectResult)).toBe(true);
                expect(item.stubs.resolve.called).toBe(false);
            });
        });

        it('should not reject all queued items by another key', () => {
            queue.rejectQueue('a', rejectResult);
            itemsB.forEach(item => {
                expect(item.stubs.resolve.called).toBe(false);
                expect(item.stubs.reject.called).toBe(false);
            });
        });

        it('should not throw an error if there is no items by key', () => {
            expect(() => queue.rejectQueue('c', rejectResult)).not.toThrow();
        });

        it('should empty queue after reject by key', () => {
            expect(storage['a']).toBeDefined();
            expect(storage['b']).toBeDefined();
            queue.rejectQueue('a', rejectResult);
            expect(storage['a']).toBeUndefined();
            expect(storage['b']).toBeDefined();
        });
    });
});
