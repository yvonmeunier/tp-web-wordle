import CacheStorage from "../helpers/CacheStorage.js";
export default class CacheService {
    constructor() {
        this.cs = new CacheStorage();
    }
    get(key) {
        return this.cs.get(key);
    }
    set(key,value) {
        this.cs.set(key,value);
    }
    remove(key) {
        this.cs.remove(key);
    }
}