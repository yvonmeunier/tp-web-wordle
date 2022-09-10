import { pickAWord, isWordInList } from "./words.js";
import { generateGrid } from "./grid.js";

// TODO: Event Handling (Key pressed,keyboard letter clicked, restart button clicked)
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
    if (text != " " && text != "Enter" && String.fromCharCode(e.keyCode).match(/(\w|\s)/g) && !isFinite(e.key)) {
        letter_elem.textContent = text.toUpperCase();

        if (currentLetterIndex != (currentWord.length * 6) - 1) {
            currentLetterIndex++;
        }

    }

    if (e.keyCode == 8) {
        deletePreviousLetter();
    }

}

export function handleVisualKBInput(value) {
    var letter_elem = document.querySelector(`[block-${currentLetterIndex}]`);
    if (letter_elem == null) {
        setup();
    }
    letter_elem.textContent = value.toUpperCase();
    if (currentLetterIndex != (currentWord.length * 6) - 1) {
        currentLetterIndex++;
    }
}

export function deletePreviousLetter() {
    //  TODO: FIX DELETE
    var letter_elem;
    if (currentLetterIndex != 0) {
        
        if (currentLetterIndex != (currentWord.length *  6)) {
            currentLetterIndex--;
        }
        
        letter_elem = document.querySelector(`[block-${currentLetterIndex}]`);
        letter_elem.textContent = "";
    }


    console.log(currentLetterIndex);
}