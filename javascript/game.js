import { pickAWord, isWordInList } from "./words.js";
import { generateGrid } from "./grid.js";
import $ from "./jquery/jquery_module.js";

let currentWord;
let currentLetterIndex;
let currentRow;
let hasAlreadyBeenCalled;
let typedWord;

let current_streak;
let high_score_streak;
let last_game_result;// the amount of attemps it took last game, -1 if lost game
let win;// amount of wins
let played;// amount of game played
let winList;// size 6, increment the one according to the guesses you needed
let current_grid;// the current grid elem
let current_keyboard;// the current grid elem

export async function setup() {
    // if there is a game saved in cache, load it
    // if not, create a new game
    // add event listener to the theme switch
    // inject data into the stats modal and generate the graph
    let grid_elem = $(".game-grid");
    currentWord = await pickAWord();
    currentLetterIndex = 0;
    currentRow = 0;
    typedWord = "";
    grid_elem.html(generateGrid(currentWord));
    if (!hasAlreadyBeenCalled) {
        $(document).on('keydown', function (event) { handleInput(event) });
    }
    hasAlreadyBeenCalled = true;
    console.log(currentWord);
    for (let i = 0; i < currentWord.length; i++) {
        $(`[block-${i + (currentRow * currentWord.length)}]`).css("background-color", "");
    }
    for (let i = 0; i < 26; i++) {
        $(`[value=${String.fromCharCode(65 + i)}]`).css("background-color", "");
    }
}

function handleInput(e) {
    var letter_elem = $(`[block-${currentLetterIndex}]`);
    var text = e.key;
    if (letter_elem == null) {
        setup();
    }

    if (text != " " && text != "Enter" && String.fromCharCode(e.keyCode).match(/(\w|\s)/g) && !isFinite(e.key)) {
        letter_elem.text(text.toUpperCase());
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
    var letter_elem = $(`[block-${currentLetterIndex}]`);
    if (letter_elem == null) {
        setup();
    }
    letter_elem.text(value);
    typedWord = typedWord.substring(0, currentLetterIndex) + value.toLowerCase() + typedWord.substring(currentLetterIndex + 1);
    if (currentLetterIndex != (currentWord.length * 6) - 1 && currentLetterIndex != ((currentRow + 1) * currentWord.length) - 1) {   
        currentLetterIndex++;
    }
}

export function deletePreviousLetter() {

    var letter_elem = $(`[block-${currentLetterIndex}]`);
    if (letter_elem == null) {
        setup();
    }
    letter_elem.text("");
    typedWord = typedWord.substring(0, currentLetterIndex) + typedWord.substring(currentLetterIndex + 1);
    if (currentLetterIndex != 0) {
        if (currentLetterIndex != currentRow * currentWord.length) {
            currentLetterIndex--;
        }
    }


}

export function clearTypedWord() {

    for (let i = 0; i < currentWord.length; i++) {
        $(`[block-${i + (currentRow * currentWord.length)}]`).text("");
    }
    currentLetterIndex = currentRow * currentWord.length;
    typedWord = "";

}
export function submitInput() {
    // Everytime you submit a word, save the current state of the game in cache
    // if you win, clear the save state and update the stats in cache
    console.log(typedWord);
    if (isWordInList(typedWord)) {
        for (let i = 0; i < typedWord.length; i++) {
            let letter_elem = $(`[block-${i + (currentRow * currentWord.length)}]`);
            let kb_letter_elem = $(`[value=${letter_elem.textContent}]`);
            if (currentWord.includes(typedWord.charAt(i).toLowerCase())) {
                if (currentWord.charAt(i) == typedWord.charAt(i).toLowerCase()) {
                    letter_elem.css("background-color","#538d4e");
                    kb_letter_elem.css("background-color","#538d4e");
                }else {
                    letter_elem.css("background-color","#b59f3b");
                    kb_letter_elem.css("background-color","#b59f3b");
                }
            } else {
                letter_elem.css("background-color","#3a3a3c");
                kb_letter_elem.css("background-color","#3a3a3c");
            }
            
        }
        currentRow++;
        if (typedWord.toLowerCase() == currentWord) {
            console.log("WIN");
            alert(`You won with ${currentRow } tries`);
            for (let i = 0; i < currentWord.length; i++) {
                $(`[block-${i + (currentRow * currentWord.length)}]`).css("background-color", "");
            }
            for (let i = 0; i < 26; i++) {
                $(`[value=${String.fromCharCode(65 + i)}]`).css("background-color", "");
            }

            setup();
        }
        if (currentRow == 6) {
            alert("GEAM OVR");
            setup();
        }
    }

    clearTypedWord();
    currentLetterIndex = currentRow * currentWord.length;
}