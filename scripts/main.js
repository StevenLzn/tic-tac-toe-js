let turnX = true;
let cellsX = [];
let cellsO = [];

const winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const cells = document.querySelectorAll('.cell');
const playerX = document.querySelector('.player-x');
const playerY = document.querySelector('.player-y');
const startButton = document.querySelectorAll('button');

startButton[0].addEventListener('click', startGame);

startGame();

function startGame() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
        cells[i].addEventListener('click', clickCell);
        cells[i].param = i;
    }

    playerY.classList.remove('hidden');
    playerX.classList.remove('show-100');
    playerX.classList.remove('winner');
    playerX.classList.add('actual-turn');
    playerX.innerHTML = 'Turno X';
    playerY.innerHTML = 'Turno O';

    turnX = true;
    cellsX = [];
    cellsO = [];
}

function clickCell(e) {
    let winningCount = 0;
    let compareCells;

    for (let i = 0; i < cells.length; i++) {
        if (i == e.target.param) {
            if (turnX) {
                cells[i].innerHTML = 'X'
                cells[i].removeEventListener('click', clickCell);
                cellsX.push(i);
                compareCells = cellsX;
            } else {
                cells[i].innerHTML = 'O'
                cells[i].removeEventListener('click', clickCell);
                cellsO.push(i);
                compareCells = cellsO;
            }
        }
    }

    for (let i = 0; i < winningConditions.length; i++) {
        for (let j = 0; j < compareCells.length; j++) {
            if (winningConditions[i].includes(compareCells[j])) {
                winningCount += 1;
            }
        }
        if (winningCount == 3) {
            winGame();
            return;
        } else {
            winningCount = 0;
        }

    }

    if (cellsO.length + cellsX.length == 9) {
        playerX.innerHTML = 'Empate';
        playerX.classList.add('actual-turn');
        playerX.classList.add('show-100');
        playerY.classList.add('hidden');
        return;
    };

    turnX = !turnX;

    if (turnX) {
        playerY.classList.remove('actual-turn');
        playerX.classList.add('actual-turn');
    } else {
        playerX.classList.remove('actual-turn');
        playerY.classList.add('actual-turn');
    }
}

function winGame() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', clickCell);
        cells[i].param = i;
    }

    if (turnX) {
        playerX.innerHTML = 'Ganador X';
    } else {
        playerX.innerHTML = 'Ganador O';
    }

    playerX.classList.add('winner');
    playerY.classList.remove('actual-turn');
    playerX.classList.remove('actual-turn');
    playerX.classList.add('show-100');
    playerY.classList.add('hidden');

}