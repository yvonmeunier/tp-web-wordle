import CacheService from "./CacheService.js";
let cacheService;
export default class WordService {
    constructor() {
        this.cacheService = new CacheService();
    }
   async getWords() {
    var list;
    const cachedWords = await this.cacheService.get("words");
    if (cachedWords) {
        return cachedWords;
    }

    await fetch('https://raw.githubusercontent.com/jordanrioux/wordle-api/master/db.json').then(response => 
    response.json().then(data => ({
        data: data
    })).then(res => {
        list = res.data.words;
    }));

    this.cacheService.set("words", list);
    return list;
}
}