import { pickAWord, isWordInList } from "./words.js";
import { generateGrid } from "./grid.js";

// TODO: Event Handling (Key pressed,keyboard letter clicked, restart button clicked)
// TODO: Fix shitty ui bugs
// TODO: Color change
// TODO: 

let currentWord;

export function setup() {

    let grid_elem = document.querySelector(".game-grid");
    currentWord = pickAWord();
    grid_elem.innerHTML = generateGrid(currentWord);
    
}
