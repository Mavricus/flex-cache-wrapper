export interface IFlexCacheQueueItem<T> {
    resolve:(value?: T) => void;
    reject: (reason: Error) => void;
}

export interface IFlexCacheQueue {
    push<T>(key: string, item: IFlexCacheQueueItem<any>): number;
    resolveQueue<T>(key: string, data: T): void;
    rejectQueue<T>(key: string, err: Error): void;
}

export interface IFlexCacheQueueStorage {
    [key: string]: Array<IFlexCacheQueueItem<unknown>>;
}

export class FlexCacheQueue implements IFlexCacheQueue {
    constructor(private storage: IFlexCacheQueueStorage) {
    }

    push<T>(key: string, item: IFlexCacheQueueItem<unknown>): number {
        if (this.storage[key] == null) {
            this.storage[key] = [];
        }
        return this.storage[key].push(item);
    }

    rejectQueue<T>(key: string, err: Error): void {
        if (this.storage[key] == null) {
            return;
        }

        for (let i = 0; i < this.storage[key].length; i++) {
            this.storage[key][i].reject(err);
        }
        delete this.storage[key];
    }

    resolveQueue<T>(key: string, data: T): void {
        if (this.storage[key] == null) {
            return;
        }

        for (let i = 0; i < this.storage[key].length; i++) {
            this.storage[key][i].resolve(data);
        }
        delete this.storage[key];
    }
}
