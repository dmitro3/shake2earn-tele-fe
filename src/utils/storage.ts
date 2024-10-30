import { StorageKeyPrefix } from 'const/storage';

export class Storage {
  prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  getFullKey = (key: string) => `${this.prefix}.${key}`;

  getItem(key: string) {
    return window.localStorage.getItem(this.getFullKey(key));
  }

  setItem(key: string, value: string) {
    window.localStorage.setItem(this.getFullKey(key), value);
  }

  removeItem(key: string) {
    window.localStorage.removeItem(this.getFullKey(key));
  }

  getJSON<T>(key: string): T | null;
  getJSON<T>(key: string, initialValue: T): T;
  getJSON<T>(key: string, initialValue?: T): T | null {
    try {
      const value = this.getItem(key);
      return value ? JSON.parse(value) : initialValue || null;
    } catch (e) {
      // Do nothing
      return initialValue || null;
    }
  }

  setJSON<T>(key: string, value: T) {
    try {
      this.setItem(key, JSON.stringify(value));
    } catch (e) {
      // Do nothing
    }
  }
}

const storage = new Storage(StorageKeyPrefix);
export default storage;
