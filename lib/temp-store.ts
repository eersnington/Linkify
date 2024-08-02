// store.ts
// stores linkedin fetch data temporarily
class TempStore {
  private store: Map<string, any>;
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    this.store = new Map<string, any>();
    this.cleanupInterval = setInterval(() => this.clearAll(), 100 * 60 * 1000); // Clear every 100 minutes
  }

  set(key: string, value: any): void {
    console.log('TempStore set:', key);
    console.log('TempStore value:', value);
    this.store.set(key, value);
  }

  get(key: string): any {
    return this.store.get(key);
  }

  delete(key: string): void {
    this.store.delete(key);
  }

  clearAll(): void {
    this.store.clear();
    console.log('TempStore cleared');
  }

  // Call this method when shutting down the server to prevent memory leaks
  stopCleanup(): void {
    clearInterval(this.cleanupInterval);
  }
}

export const tempStore = new TempStore();
