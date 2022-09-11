import { pickAWord, isWordInList } from "./words.js";
import { generateGrid } from "./grid.js";

let currentWord;
let currentLetterIndex;
let currentRow;
let hasAlreadyBeenCalled;
let typedWord;

export function setup() {

    let grid_elem = document.querySelector(".game-grid");
    currentWord = pickAWord();
    currentLetterIndex = 0;
    currentRow = 0;
    typedWord = "";
    grid_elem.innerHTML = generateGrid(currentWord);
    if (!hasAlreadyBeenCalled) {
        document.addEventListener('keydown', function (event) { handleInput(event) });
    }
    hasAlreadyBeenCalled = true;
    console.log(currentWord);
}

function handleInput(e) {
    var letter_elem = document.querySelector(`[block-${currentLetterIndex}]`);
    var text = e.key;
    if (letter_elem == null) {
        setup();
    }

    if (text != " " && text != "Enter" && String.fromCharCode(e.keyCode).match(/(\w|\s)/g) && !isFinite(e.key)) {
        letter_elem.textContent = text.toUpperCase();
        typedWord = typedWord.substring(0, currentLetterIndex) + text.toUpperCase() + typedWord.substring(currentLetterIndex + 1);
        if (currentLetterIndex != (currentWord.length * 6) - 1 && currentLetterIndex != ((currentRow + 1) * currentWord.length) - 1) {
            currentLetterIndex++;
        }

    }
    if (e.keyCode == 8) {
        deletePreviousLetter();
    }

    if (e.keyCode == 13 && typedWord.length == currentWord.length) {
        submitInput();
    }
}

export function handleVisualKBInput(value) {
    var letter_elem = document.querySelector(`[block-${currentLetterIndex}]`);
    if (letter_elem == null) {
        setup();
    }
    letter_elem.textContent = value.toUpperCase();
    if (currentLetterIndex != (currentWord.length * 6) - 1) {
        typedWord = typedWord.substring(0, currentLetterIndex) + value.toLowerCase() + typedWord.substring(currentLetterIndex + 1);
        currentLetterIndex++;
    }
}

export function deletePreviousLetter() {

    var letter_elem = document.querySelector(`[block-${currentLetterIndex}]`);
    if (letter_elem == null) {
        setup();
    }
    letter_elem.textContent = "";
    typedWord = typedWord.substring(0, currentLetterIndex) + typedWord.substring(currentLetterIndex + 1);
    if (currentLetterIndex != 0) {
        if (currentLetterIndex != currentRow * currentWord.length) {
            currentLetterIndex--;
        }
    }


}

export function clearTypedWord() {

    for (let i = 0; i < currentWord.length; i++) {
        document.querySelector(`[block-${i + (currentRow * currentWord.length)}]`).textContent = "";
    }
    currentLetterIndex = currentRow * currentWord.length;
    typedWord = "";

}
export function submitInput() {
    console.log(typedWord);
    if (isWordInList(typedWord)) {

        for (let i = 0; i < typedWord.length; i++) {
            let letter_elem = document.querySelector(`[block-${i + (currentRow * currentWord.length)}]`);
            let kb_letter_elem = document.querySelector(`[value=${letter_elem.textContent}]`);
            //  if word contains letter
            if (typedWord.indexOf(letter_elem.textContent) != -1) {
                letter_elem.style.backgroundColor = "yellow";
                kb_letter_elem.style.backgroundColor = "yellow";
                // if letter is in correct position
                if (typedWord.indexOf(letter_elem.textContent) == i) {
                    letter_elem.style.backgroundColor = "green";
                    kb_letter_elem.style.backgroundColor = "green";
                }
            } else {
                letter_elem.style.backgroundColor = "red";
                kb_letter_elem.style.backgroundColor = "red";
            }
            
        }
        currentRow++;
        if (typedWord.toLowerCase() == currentWord) {
            // WIN THEN SETUP()
            console.log("WIN");
            // reset styles
            for (let i = 0; i < currentWord.length; i++) {
                document.querySelector(`[block-${i + (currentRow * currentWord.length)}]`).style.backgroundColor = "";
            }
            // reset keyboard styles
            for (let i = 0; i < 26; i++) {
                document.querySelector(`[value=${String.fromCharCode(65 + i)}]`).style.backgroundColor = "";
            }

            setup();
        }
        if (currentRow == 6) {
            // LOSE THEN SETUP()
            setup();
        }
    }

    clearTypedWord();
    currentLetterIndex = currentRow * currentWord.length;
}