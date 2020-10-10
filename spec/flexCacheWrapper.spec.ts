import { FlexCacheWrapper, IFlexCacheWrapperConfig } from '../src/flexCacheWrapper';
import { FlexCacheCriticalSectionStub } from '@flex-cache/critical-section';
import { FlexCacheStub } from '@flex-cache/types';
import { FlexCacheKeyBuilderStub } from '../src/keyBuilders/flexCacheKeyBuilder.stub';
import { FlexCacheQueueStub } from '../src/flexCacheQueue.stub';

describe('', () => {
    let wrapper: FlexCacheWrapper;
    let cs: FlexCacheCriticalSectionStub;
    let cache: FlexCacheStub;
    let keyBuilder: FlexCacheKeyBuilderStub;
    let queue: FlexCacheQueueStub;
    const config: IFlexCacheWrapperConfig = { checkPeriod: 1000 };
    const scLockResult: string = 'lockSc Result';
    const csUnlockResult: string = 'unlockSc Result';
    const cacheDeleteResult: string = 'deleteCache Result';
    const cacheGetResult: string = 'getCache Result';
    const cacheSetResult: string = 'setCache Result';
    const cacheSetForceResult: string = 'setForceCache Result';
    const cacheUpdateResult: string = 'updateCache Result';
    const buildKeyResult: string = 'buildKey Result';
    const resolveQueueResult: string = 'resolveQueue Result';
    const rejectQueueResult: string = 'rejectQueue Result';
    const pushQueueResult: string = 'pushQueue Result';

    beforeEach(() => {
        cs = new FlexCacheCriticalSectionStub();
        cs.stubs.lock.resolves(scLockResult);
        cs.stubs.unlock.resolves(csUnlockResult);

        cache = new FlexCacheStub();
        cache.stubs.delete.resolves(cacheDeleteResult);
        cache.stubs.get.resolves(cacheGetResult);
        cache.stubs.set.resolves(cacheSetResult);
        cache.stubs.setForce.resolves(cacheSetForceResult);
        cache.stubs.update.resolves(cacheUpdateResult);

        keyBuilder = new FlexCacheKeyBuilderStub();
        keyBuilder.stubs.build.returns(buildKeyResult);

        queue = new FlexCacheQueueStub();
        queue.stubs.resolveQueue.returns(resolveQueueResult);
        queue.stubs.rejectQueue.returns(rejectQueueResult);
        queue.stubs.push.returns(pushQueueResult);

        wrapper = new FlexCacheWrapper(config, cs, cache, keyBuilder, queue);
    });

    afterEach(() => {
    });

    describe('', () => {
        it('should', () => {
        });
    });
});
