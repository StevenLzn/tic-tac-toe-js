let turnX = true; //Variable booleana para comprobar de quien es el turno
let cellsX = []; //Array para guardar las celdas tomadas por ej jugador X
let cellsO = []; //Array para guardar las celdas tomadas por ej jugador O

//Condiciones para ganar
const winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

//Seleccionamos los elementos que vamos a manipular, celdas, casillas de turno, botón de inicio
const cells = document.querySelectorAll('.cell');
const playerX = document.querySelector('.player-x');
const playerY = document.querySelector('.player-y');
const startButton = document.querySelectorAll('button');

//Agregamos evento click al botón de inicio, le pasamos la función startGame
startButton[0].addEventListener('click', startGame);

//Arrancamos el juego para que cuando el jugador abra el juego, este inicie y no sea necesario clickear al inicio
startGame();

//Función encargada de establecer todos los parametros para iniciar el juego
function startGame() {
    //Bucle encargado de agregar el evento click a todas las celdas
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
        cells[i].addEventListener('click', clickCell);
        cells[i].param = i;
    }
    //Removemos clases agregadas en otras funciones, y dejamos la clase por defecto
    playerY.classList.remove('hidden');
    playerX.classList.remove('show-100');
    playerX.classList.remove('winner');
    playerX.classList.add('actual-turn');
    //Ponemos el texto por defecto
    playerX.innerHTML = 'Turno X';
    playerY.innerHTML = 'Turno O';
    //Reiniciamos las variables
    turnX = true;
    cellsX = [];
    cellsO = [];
}

//Función encargar de capturar el evento de click en la celda
function clickCell(e) {
    let winningCount = 0; //Variable que almacena la cuenta de las coincidencia entre las celdas escogidas por el jugador y las condiciones para ganar
    let compareCells; //Variable para almacenar las celdas del jugador X o jugador O, dependiendo de quien tenga el turno
    //Bucle para recorrer todas las celdas, se compara con el parametro traído por el evento click(número de celda clickeada)
    //Cuando encuentra coincidencia, compara si es turno X o no, dependiendo de quien tenga el turno, pone su correspondiente figura
    //Se quita el evento click de esa celda, para que el usuario no siga clickeando, se almacena la celda escogida en el array repectivo
    //compareCells pasa a tener el valor del array del jugador que tenga el turno, este array está actualizado hasta la ultima jugada
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
    //Bluce para recorrer el array de condiciones para ganar
    for (let i = 0; i < winningConditions.length; i++) {
        //Bluce para recorrer compareCells(que contiene el array de celdas del jugador que tiene el turno actual)
        for (let j = 0; j < compareCells.length; j++) {
            //Si las celdas del jugador tienen coindicencia con una posición, se suma 1 al contador 
            if (winningConditions[i].includes(compareCells[j])) {
                winningCount += 1;
            }
        }
        //En caso de que el contador termine con 3 coincidencias, entonces se da por ganador al jugador
        if (winningCount == 3) {
            winGame();
            return;
        } else {
            winningCount = 0; //En caso de que no sea 3, se reinicia la variable para que siga comparando el resto de opciones
        }

    }
    //Condicional que  comprueba si todas las celdas fueron seleccionadas, en ese caso se determina empate
    if (cellsO.length + cellsX.length == 9) {
        playerX.innerHTML = 'Empate';
        playerX.classList.add('actual-turn');
        playerX.classList.add('show-100');
        playerY.classList.add('hidden');
        return;
    };
    //Cambio de turno, pasa al valor contrario
    turnX = !turnX;
    //Condicional que agrega o quita la clase de turno actual, dependiendo de la variable turnX
    if (turnX) {
        playerY.classList.remove('actual-turn');
        playerX.classList.add('actual-turn');
    } else {
        playerX.classList.remove('actual-turn');
        playerY.classList.add('actual-turn');
    }
}

//Función que se encarga de ejecutar los parametros del ganador de la partida
function winGame() {
    //Bucle que recorre las celdas y quita todos los eventos de click
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', clickCell);
        cells[i].param = i;
    }
    //Dependiendo de quien tenga el turno, asi mismo se muestra el texto correspondiente
    if (turnX) {
        playerX.innerHTML = 'Ganador X';
    } else {
        playerX.innerHTML = 'Ganador O';
    }

    //Se agregan y se quitan clases para resaltar el jugador ganador
    playerX.classList.add('winner');
    playerY.classList.remove('actual-turn');
    playerX.classList.remove('actual-turn');
    playerX.classList.add('show-100');
    playerY.classList.add('hidden');

}