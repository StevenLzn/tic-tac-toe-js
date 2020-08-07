let turnX = true;
const winningConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

const cells = document.querySelectorAll('.cell');

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', clickCell);
    cells[i].param = i;
}


function clickCell(e) {
    for (let i = 0; i < cells.length; i++) {
        if (i == e.target.param) {
            if (turnX) {
                cells[i].innerHTML = 'X'
            } else{
                cells[i].innerHTML = 'O' 
            }   
        }
    }
    turnX = !turnX;
}