export default class CacheStorage {
    get(key) {
        const item = localStorage.getItem(key);
        return JSON.parse(item);
    }

    set(key, item) {
        const stringifiedItem = JSON.stringify(item);
        localStorage.setItem(key, stringifiedItem);
    }
    remove(key) {
        localStorage.removeItem(key);
    }
}