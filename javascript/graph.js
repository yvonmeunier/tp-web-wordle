export function generateGraph(winList, played, previousGameResult) {
    let generatedHTML = "";
    generatedHTML += `<div class="row text">GUESS DISTRIBUTION</div>`;
    for (let i = 0; i < winList.length; i++) {
        let perc = Math.max(100 * ((winList[i] / (played || 1))), 10);
        generatedHTML += `<div class=\"row\"><div class=\"text\" style=\"width:5%;border-right: 0.25em solid;\">${i + 1}</div><div class=\"text\" style=\"width:${perc == 100 ? 90 : perc}%;`;
        if (i == previousGameResult) {
            generatedHTML += `background-color:#538d4e;`;
        } else {
            generatedHTML += `background-color:grey;`;
        }
        generatedHTML += `\">${winList[i]}</div></div>`;
    }
    return generatedHTML;
}