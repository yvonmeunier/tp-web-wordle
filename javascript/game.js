import { pickAWord, isWordInList, initList } from "./words.js";
import { generateGrid } from "./grid.js";
import $ from "./jquery/jquery_module.js";
import CacheService from "./services/CacheService.js";
import { generateGraph } from "./graph.js";

let currentWord;
let currentLetterIndex;
let currentRow;
let hasAlreadyBeenCalled;
let typedWord;
let cs;
let grid_elem;

let current_streak;
let high_score_streak; // high score of win streak
let last_game_result; // the amount of attemps it took last game, -1 if lost game
let win; // amount of wins
let played; // amount of game played
let winList; // size 6, increment the one according to the guesses you needed

export async function setup() {
    cs = new CacheService();
    grid_elem = $(".game-grid");
    typedWord = "";
    initStats();
    injectStats();
    if (cs.get("theme") == "dark") {
        $("body").addClass("bg-dark text-light");
        $(".modal-content").addClass("bg-dark text-light");
        $("#navbar").addClass("navbar-dark text-light");
        $("#theme-switch input").prop("checked", true);
    }
    if (cs.get("grid") == null) {
        currentWord = await pickAWord();
        currentLetterIndex = 0;
        currentRow = 0;
        grid_elem.html(generateGrid(currentWord));
        resetStyle();
    } else {
        await initList();
        grid_elem.html(cs.get("grid"));
        $("keyboard").html(cs.get("current_keyboard"));
        currentWord = cs.get("currentWord");
        currentRow = cs.get("currentRow");
        currentLetterIndex = currentRow * currentWord.length;
    }
    console.log(currentWord);
    addEvents();
    injectGraph();
    injectStats();
    if (cs.get("grid") == null) {
        played++;
    }
        
    
}

function injectGraph() {
    let generatedGraph = generateGraph(winList, played, last_game_result);
    $("#graph").html(generatedGraph);
 }
function injectStats() {

    $("#current_streak").text(current_streak);
    $("#high_score_streak").text(high_score_streak);
    $("#last_game_result").text(last_game_result);
    $("#win").text(Math.round((win / played || 1) * 100));
    $("#played").text(played);
    $("#winList").text(winList);

}

function initStats() {
    current_streak = cs.get("current_streak") || 0;
    high_score_streak = cs.get("high_score_streak") || 0;
    last_game_result = cs.get("last_game_result") || -1;
    win = cs.get("win") || 0;
    played = cs.get("played") || 0;
    winList = cs.get("winList") || [0, 0, 0, 0, 0, 0];
}

function saveStats() {
    cs.set("win", win);
    cs.set("played", played);
    cs.set("winList", winList);
    cs.set("high_score_streak", high_score_streak);
    cs.set("current_streak", current_streak);
    cs.set("last_game_result", last_game_result);
}

function addEvents() {
    if (!hasAlreadyBeenCalled) {
        $(document).on("keydown", function (event) {
            handleInput(event);
        });
        $("#theme-switch").on("click", function () {
            if ($("#theme-switch input").prop("checked")) {
                // change the theme to dark
                $("body").addClass("bg-dark text-light");
                $(".modal-content").addClass("bg-dark text-light");
                $("#navbar").addClass("navbar-dark text-light");
            } else {
                // change the theme to light
                $("body").removeClass("bg-dark text-light");
                $(".modal-content").removeClass("bg-dark text-light");
                $("#navbar").removeClass("navbar-dark text-light");
            }
            // save the theme to the cache
            cs.set(
                "theme",
                $("#theme-switch input").prop("checked") == true ? "dark" : "light"
            );
        });
    }
    hasAlreadyBeenCalled = true;
}
function resetStyle() {
    for (let i = 0; i < currentWord.length; i++) {
        $(`[block-${i + currentRow * currentWord.length}]`).css(
            "background-color",
            ""
        );
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

    if (
        text != " " &&
        text != "Enter" &&
        String.fromCharCode(e.keyCode).match(/(\w|\s)/g) &&
        !isFinite(e.key)
    ) {
        letter_elem.text(text.toUpperCase());
        typedWord =
            typedWord.substring(0, currentLetterIndex) +
            text.toUpperCase() +
            typedWord.substring(currentLetterIndex + 1);
        if (
            currentLetterIndex != currentWord.length * 6 - 1 &&
            currentLetterIndex != (currentRow + 1) * currentWord.length - 1
        ) {
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
    typedWord =
        typedWord.substring(0, currentLetterIndex) +
        value.toLowerCase() +
        typedWord.substring(currentLetterIndex + 1);
    if (
        currentLetterIndex != currentWord.length * 6 - 1 &&
        currentLetterIndex != (currentRow + 1) * currentWord.length - 1
    ) {
        currentLetterIndex++;
    }
}

export function deletePreviousLetter() {
    var letter_elem = $(`[block-${currentLetterIndex}]`);
    if (letter_elem == null) {
        setup();
    }
    letter_elem.text("");
    typedWord =
        typedWord.substring(0, currentLetterIndex) +
        typedWord.substring(currentLetterIndex + 1);
    if (currentLetterIndex != 0) {
        if (currentLetterIndex != currentRow * currentWord.length) {
            currentLetterIndex--;
        }
    }
}

export function clearTypedWord() {
    for (let i = 0; i < currentWord.length; i++) {
        $(`[block-${i + currentRow * currentWord.length}]`).text("");
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
            let letter_elem = $(`[block-${i + currentRow * currentWord.length}]`);
            let kb_letter_elem = $(`[value=${letter_elem.textContent}]`);
            if (currentWord.includes(typedWord.charAt(i).toLowerCase())) {
                if (currentWord.charAt(i) == typedWord.charAt(i).toLowerCase()) {
                    letter_elem.css("background-color", "#538d4e");
                    kb_letter_elem.css("background-color", "#538d4e");
                } else {
                    letter_elem.css("background-color", "#b59f3b");
                    kb_letter_elem.css("background-color", "#b59f3b");
                }
            } else {
                letter_elem.css("background-color", "#3a3a3c");
                kb_letter_elem.css("background-color", "#3a3a3c");
            }
        }
        currentRow++;
        SaveState();
        if (typedWord.toLowerCase() == currentWord) {
            Win();
        }
        if (currentRow == 6) {
            Lose();
        }
    }

    clearTypedWord();
    currentLetterIndex = currentRow * currentWord.length;
}

function Win() {
    console.log("WIN");
    alert(`You won with ${currentRow} tries`);
    current_streak++;
    win++;
    last_game_result = currentRow - 1;
    winList[currentRow - 1]++;
    if (current_streak > high_score_streak) {
        high_score_streak = current_streak;
    }
    saveStats();
    DeleteState();
    setup();
}

function Lose() {
    alert("GEAM OVR");
    if (current_streak > high_score_streak) {
        high_score_streak = current_streak;
    }
    current_streak = 0;
    last_game_result = -1;
    saveStats();
    DeleteState();
    setup();
}

function SaveState() {
    cs.set("currentWord", currentWord);
    cs.set("currentRow", currentRow);
    cs.set("currentLetterIndex", currentLetterIndex);
    cs.set("grid", $(".game-grid").html());
    cs.set("keyboard", $("#keyboard").html());
    cs.set("current_streak", current_streak);
}
function DeleteState() {
    cs.remove("currentWord");
    cs.remove("currentRow");
    cs.remove("currentLetterIndex");
    cs.remove("grid");
    cs.remove("keyboard");
}
