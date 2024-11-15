import { CacheService } from './cache.service';

describe('CacheService', () => {
  let cacheService: CacheService;

  beforeEach(() => {
    cacheService = new CacheService(); // Create a new instance of CacheService before each test
  });

  it('should be defined', () => {
    expect(cacheService).toBeDefined();
  });

  describe('get()', () => {
    it('should return undefined if the key does not exist', () => {
      expect(cacheService.get('nonexistent')).toBeUndefined();
    });

    it('should return the value if the key exists', () => {
      cacheService.set('key1', 'value1');
      expect(cacheService.get('key1')).toBe('value1');
    });
  });

  describe('set()', () => {
    it('should add a new key-value pair to the cache', () => {
      cacheService.set('key1', 'value1');
      expect(cacheService.get('key1')).toBe('value1');
    });

    it('should evict the oldest key if the cache exceeds max size', () => {
      for (let i = 0; i < 11; i++) {
        cacheService.set(`key${i}`, `value${i}`);
      }
      // After inserting 11 items, the oldest one (key0) should be evicted
      expect(cacheService.get('key0')).toBeUndefined();
      expect(cacheService.get('key10')).toBe('value10');
    });

    it('should overwrite an existing key-value pair', () => {
      cacheService.set('key1', 'value1');
      cacheService.set('key1', 'value2');
      expect(cacheService.get('key1')).toBe('value2');
    });
  });

  describe('delete()', () => {
    it('should remove a key-value pair from the cache', () => {
      cacheService.set('key1', 'value1');
      cacheService.delete('key1');
      expect(cacheService.get('key1')).toBeUndefined();
    });

    it('should not throw an error when trying to delete a non-existent key', () => {
      expect(() => cacheService.delete('nonexistent')).not.toThrow();
    });
  });

  describe('clear()', () => {
    it('should remove all key-value pairs from the cache', () => {
      cacheService.set('key1', 'value1');
      cacheService.set('key2', 'value2');
      cacheService.clear();
      expect(cacheService.get('key1')).toBeUndefined();
      expect(cacheService.get('key2')).toBeUndefined();
    });
  });
});
