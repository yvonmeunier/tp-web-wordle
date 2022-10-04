import CacheStorage from "../helpers/CacheStorage.js";
export default class WordService {
    constructor() {
        this.cacheStorage = new CacheStorage();
    }
   async getWords() {
    var list;
    const cachedWords = this.cacheStorage.get("words");
    if (cachedWords) {
        return cachedWords;
    }

    await fetch('https://raw.githubusercontent.com/jordanrioux/wordle-api/master/db.json').then(response => 
    response.json().then(data => ({
        data: data
    })).then(res => {
        list = res.data.words;
    }));

    this.cacheStorage.set("words", list);
    return list;
}
}