import { pickAWord, isWordInList } from "./words.js";
import { generateGrid } from "./grid.js";

let currentWord;


export function setup() {

    let grid_elem = document.querySelector(".game-grid");
    currentWord = pickAWord();
    grid_elem.innerHTML = generateGrid(currentWord);
    

    /*
    *
    * 1. Pick Random Word DONE : currentWord = pickAWord();
    * 2. Generate game grid (word_length * 6) html DONE : grid_elem.innerHTML = generateGrid(currentWord);
    * 3. Insert generated html into the game-grid DONE
    * 
    * TODO: Event Handling (Key pressed,keyboard letter clicked, restart button clicked)
    * 
    */
}
