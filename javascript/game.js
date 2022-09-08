import { pickAWord, isWordInList } from "./words.js";
import { generateGrid } from "./grid.js";

let currentWord;
const grid_elem = document.querySelector(game-grid);

export function setup() {

    currentWord = pickAWord();
    grid_elem.innerHTML = generateGrid(currentWord);
    

    /*
    *
    * 1. Pick Random Word DONE : currentWord = pickAWord();
    * 2. Generate game grid (word_length * 6) html
    * 3. Insert generated html into the game-grid
    * 
    * TODO: Event Handling (Key pressed,keyboard letter clicked, restart button clicked)
    * 
    */
}
