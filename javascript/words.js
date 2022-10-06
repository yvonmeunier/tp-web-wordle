import WordService from "./services/WordService.js";
var list;
var ws;
export async function pickAWord() {
  ws = new WordService();
  list = await ws.getWords();
  const maxIndex = list.length - 1;
  let wordIndex = Math.floor(Math.random() * maxIndex);
  return list[wordIndex];
}
export function isWordInList(word) {
  return list.includes(word.toLowerCase());
}
