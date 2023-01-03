const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('gameStatus');
const endGameStatus = document.getElementById('endGameStatus');
const playerOne = 'X'; const playerTwo = '0';
let random = ""
let playerTurn = playerOne;
const winningPatterns = [
    [0, 1, 2],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [0, 1, 2],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

function randomNumber(min, max) {     
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

cells.forEach(cell => {
    cell.addEventListener('click', playGame, { once: true });
});

function playGame(e) {
    e.target.innerHTML = playerTurn;

    if (checkWin(playerTurn)) {
        updateGameStatus("win" + playerTurn)
        return endGame();
    }else if (checkDraw()) {
        updateGameStatus("draw");
        return endGame();
    }

    updateGameStatus(playerTurn);
    playerTurn == playerOne ? playerTurn = playerTwo : playerTurn = playerOne;
}

function checkWin(playerTurn) {
    return winningPatterns.some(combination => {
        return combination.every(index =>{
            return cells[index].innerHTML == playerTurn;
        });
    });
}

function checkDraw() {
    return [...cells].every(cell => {
        return cell.innerHTML == playerOne || cell.innerHTML == playerTwo;
    });
}

function updateGameStatus (status) {
    let statusText;

    switch (status) {
    case 'X':
        statusText = "Au tour du joueur 2 (0)";
        break;
    case '0':
        statusText = "Au tour du joueur 1 (X)";
        break;
    case 'winsX':
            statusText = "Le joueur 1 (X) a gagné!";
        break;
    case 'wins0':
            statusText = "Le joueur 2 (0) a gagné!";
        break;
    case 'draw':
            statusText = "Egalité, personne ne gagne!";
        break;
    }

    gameStatus.innerHTML = statusText;
    endGameStatus.innerHTML = statusText;
}

function endGame() {
    document.getElementById('gameEnd').style.display = "block"
}
function reloadGame() {
    window.location.reload()
}