const html_cube = `<div block-${block_index} class=\"col\">`;//DONT FORGET TO ADD THE </div> after
const html_row = `<div row-${current_row} class=\"row\">`;//DONT FORGET TO ADD THE </div> after
export function generateGrid(word) {

    let length = word.length;
    let block_index = 0;
    let current_row = 0;
    let generatedHTML;

    for (let row_index = 0; row_index < 6; row_index++) {
        generatedHTML += html_row;
        for (let block_index = 0; block_index < array.length; block_index++) {
            
        }
        
    }

    return "HTML_HERE";
}