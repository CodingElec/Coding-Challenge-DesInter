import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  private cache = new Map<string, any>();
  private readonly maxSize = 10;


  get(key: string): any | undefined {
    return this.cache.get(key);
  }

  set(key: string, value: any): void {
    
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    
    this.cache.set(key, value);
    
  }

  
  delete(key: string): void {
    this.cache.delete(key);
  }

  
  clear(): void {
    this.cache.clear();
  }
}