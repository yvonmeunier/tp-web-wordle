import { setup } from "./game.js";
import { kb_setup, resetTimer } from "./keyboard.js";
kb_setup();
setup();
document.onmousemove = resetTimer();
resetTimer();