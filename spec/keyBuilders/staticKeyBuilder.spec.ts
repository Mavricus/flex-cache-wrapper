import { FlexCacheStaticKeyBuilder } from '../../src/keyBuilders/flexCacheStaticKeyBuilder';

describe('FlexCacheStaticKeyBuilder', () => {
    let builder: FlexCacheStaticKeyBuilder;
    const key: string = 'Static Key';

    beforeEach(() => {
        builder = new FlexCacheStaticKeyBuilder(key);
    });

    describe('build', () => {
        it('should return the key, passed to the to the constructor', () => {
            expect(builder.build([1,2,3])).toBe(key);
        });
        
        it('should return the same key regardless passed arguments', () => {
            expect(builder.build([1, 2, 3])).toBe(builder.build([1, 2, 3, 4, 5]));
        });

        it('should return the key when the arguments is empty', () => {
            expect(builder.build([])).toBe(key);
        });
    });
});
