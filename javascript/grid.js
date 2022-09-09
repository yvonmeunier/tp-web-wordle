export function generateGrid(word) {

    let length = word.length;
    let block_index = 0;
    let generatedHTML = "";

    for (let row_index = 0; row_index < 6; row_index++) {
        generatedHTML +=  `<div row-${row_index} class=\"row\">`;
        for (let index = 0; index < length; index++) {
            
            generatedHTML += `<div block-${block_index} class=\"col\">X</div>`;

            block_index++;
        }
        generatedHTML += "</div>";
    }

    return generatedHTML;
}