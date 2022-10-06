export function generateGraph(winList, played, previousGameResult) {
    let generatedHTML = "";
    generatedHTML += `<div class="row text">TITLE</div>`;
    for (let i = 0; i < winList.length; i++) {
        generatedHTML += `<div class=\"row\"><div style=\"width:5%;border-right: 0.25em solid;\">${i}</div><div class=\"text\" style=\"width:${Math.max(100 *((winList[i]/(played|| 1))),10)}%;`;
        if (i == previousGameResult) {
            generatedHTML += `background-color:#538d4e;`;
        } else {
            generatedHTML += `background-color:grey;`;
        }
        generatedHTML += `\">${winList[i]}</div></div>`;
    }
    return generatedHTML;
}