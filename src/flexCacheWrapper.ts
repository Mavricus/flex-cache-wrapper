import { IFlexCacheCriticalSection } from '@flex-cache/critical-section';
import { IFlexCache } from '@flex-cache/types';
import { IFlexCacheKeyBuilder } from './keyBuilders/flexCacheKeyBuilder';
import { IFlexCacheQueue } from './flexCacheQueue';

export interface IFlexCacheWrapper {
    wrap<T>(method: (...args: Array<unknown>) => Promise<T>): (...args: Array<unknown>) => Promise<T>;
}

export interface IFlexCacheWrapperConfig {
    checkPeriod: number;
}

export class FlexCacheWrapper implements IFlexCacheWrapper {
    private timers: { [key: string]: NodeJS.Timer } = {};

    constructor(private config: IFlexCacheWrapperConfig,
                private criticalSection: IFlexCacheCriticalSection,
                private cache: IFlexCache,
                private keyBuilder: IFlexCacheKeyBuilder,
                private queue: IFlexCacheQueue) {
    }

    wrap<T>(method: (...args: Array<unknown>) => Promise<T>): (...args: Array<unknown>) => Promise<T> {
        return (...args: Array<unknown>) => new Promise<T>((resolve, reject) => {
            const key = this.keyBuilder.build(args);
            if(this.queue.push(key, { resolve, reject }) === 1) {
                return this.startQueueChecking(method, args, key);
            }
        });
    }

    private async startQueueChecking<T>(method: (...args: Array<unknown>) => Promise<T>, args: Array<unknown>, key: string): Promise<void> {
        const cache = await this.cache.get<T>(key);
        if (cache != null) {
            return this.queue.resolveQueue(key, cache);
        }
        let lockId;
        try {
            lockId = await this.criticalSection.lock(key);
        } catch (err) {
            setTimeout(() => this.startQueueChecking(method, args, key), this.config.checkPeriod);
            return;
        }
        try {
            let data: T;
            try {
                data = await method(...args);
            } catch (err) {
                return await this.queue.rejectQueue(key, err);
            }
            return await this.queue.resolveQueue(key, data);
        } finally {
            if (lockId != null) {
                await this.criticalSection.unlock(key, lockId);
            }
        }
    }
}
