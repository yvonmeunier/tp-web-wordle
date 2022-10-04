import { handleVisualKBInput, deletePreviousLetter, clearTypedWord, submitInput, setup } from "./game.js";
import $ from './Jquery/jquery_module.js';

var i, c, t, delay, kb;

export function kb_setup() {
    i, c, t, delay = 5000, kb = document.getElementById('keyboard');
    i = kb.getElementsByTagName('input');
    $("#clear").click(function () {
        clearTypedWord();
    });
    $("#submit").click(function () {
        submitInput();
    });
    $("#restart").click(function () {
        setup();
    });
    generateHandlers();
}

function generateHandlers() {
    for (c = 0; c < i.length; c++) {
        if (i[c].type === 'button') {
            i[c].addEventListener('onclick', makeClickHandler(c));
        }
    }
}

function makeClickHandler(c) {
    i[c].onclick = function () {
        if (i[c].id === 'back') {
            deletePreviousLetter();
        }
        else {
            handleVisualKBInput(this.value);
        }
    };
}
function logout() {
    kb.classList.remove('show');
    kb.classList.add('hide');
}

export function resetTimer() {
    clearTimeout(t);
    t = setTimeout(logout, delay)
}