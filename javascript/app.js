import { setup } from "./game.js";
import { kb_setup, resetTimer } from  "./keyboard.js"

setup();
kb_setup();
document.onmousemove = resetTimer();
resetTimer();