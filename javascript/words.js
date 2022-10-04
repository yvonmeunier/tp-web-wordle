var list;
export async function pickAWord() {
    // if words not in cache, fetch them and assign them to list
    await fetchWords();
    console.log(list);
    const maxIndex = list.length - 1;
    let wordIndex = Math.floor(Math.random() * maxIndex);
    return list[wordIndex];
}
export function isWordInList(word) {
    return list.includes(word.toLowerCase());
}
async function fetchWords() {
    await fetch('https://raw.githubusercontent.com/jordanrioux/wordle-api/master/db.json').then(response => 
    response.json().then(data => ({
        data: data
    })).then(res => {
        list = res.data.words;
    }));
}