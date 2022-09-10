import { pickAWord, isWordInList } from "./words.js";
import { generateGrid } from "./grid.js";

// TODO: Event Handling (Key pressed,keyboard letter clicked, restart button clicked)
// TODO: Fix shitty ui bugs
// TODO: Color change
// TODO: 

let currentWord;
let currentLetterIndex;
let hasAlreadyBeenCalled;

export function setup() {

    let grid_elem = document.querySelector(".game-grid");
    currentWord = pickAWord();
    currentLetterIndex = 0;
    grid_elem.innerHTML = generateGrid(currentWord);
    if (!hasAlreadyBeenCalled) {
        document.addEventListener('keydown', function (event) { handleInput(event) });
    }
    hasAlreadyBeenCalled = true;
}

function handleInput(e) {
    var letter_elem = document.querySelector(`[block-${currentLetterIndex}]`);
    var text = e.key;
    if (letter_elem == null) {
        setup();
    }
    if (text != " " && text != "Enter" && text != "Backspace" && !e.altKey && !e.metaKey && !e.shiftKey  && !e.ctrlKey) {
        letter_elem.textContent = text.toUpperCase();
        currentLetterIndex++;
    }
    
    if (e.keyCode == 8) {
        console.log("DELETE");
    }

}

export function handleVisualKBInput(value) {
    var letter_elem = document.querySelector(`[block-${currentLetterIndex}]`);
    if (letter_elem == null) {
        setup();
    }
    if (text != " ") {
        letter_elem.textContent = value.toUpperCase();
        currentLetterIndex++;
    }
}

export function deletePreviousLetter()  {
    var letter_elem = document.querySelector(`[block-${currentLetterIndex}]`);
    if (currentLetterIndex > 0) {
        letter_elem.textContent = "";
    }
}