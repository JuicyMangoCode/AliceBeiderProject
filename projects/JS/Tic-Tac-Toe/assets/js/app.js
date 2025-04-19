const curTurnMain = document.getElementById('curTurnMain');
const curTurnInner = document.getElementById('curTurn');
const winnerNotice = document.getElementById('winnerNotice');
const winnerLabel = document.getElementById('winnerNoticePlayer');
const winnerTitle = document.getElementById('winnerTitle');


const cells = document.querySelectorAll('.cell');

const win = new Audio("./assets/audio/win.mp3");
win.volume = 0.1;

const draw = new Audio("./assets/audio/draw.mp3");
draw.volume = 0.1;

const click = new Audio("./assets/audio/click.mp3");
click.volume = 0.5;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let gameEnded = false;
let curTurn = "❌";

window.onload = function() {
    curTurnInner.innerText = "❌";
    curTurnMain.style.display = "block";
}

cells.forEach((cell, index) => {
    cell.onclick = function() {
        if (isBoardFull() || gameEnded) {
            return
        }

        selectCell(index);

        isWinner();
    };
});


function selectCell(index) {
    let selectedCell = cells[index]

    if (selectedCell.classList.contains('circle') || selectedCell.classList.contains('cross')) {
        return;
    }

    selectedCell.classList.add(curTurn === "❌" ? "cross" : "circle");

    click.play();

    swapTurn();
}

function swapTurn() {
    curTurn = curTurn === "❌" ? "⭕" : "❌";

    curTurnInner.innerText = curTurn;
}

function resetGame() {
    gameEnded = false;

    curTurnInner.innerText = "❌";
    curTurnMain.style.display = "block";
    curTurn = "❌";

    winnerNotice.style.display = "none";
    winnerTitle.innerHTML = `<span id="winnerNoticePlayer">❌</span> has won the game!`; // Reset text

    cells.forEach((cell, index) => {
        cell.className = "cell";
        cell.style.backgroundColor = "";
    });
}

function isWinner() {
    for (combination of winningCombinations) {
        let [a, b, c] = combination;

        if (cells[a].classList.contains('cross') && cells[b].classList.contains('cross') && cells[c].classList.contains('cross')) {
            setTimeout(() => {
                winnerNotice.style.display = "flex";
                winnerTitle.innerHTML = `<span id="winnerNoticePlayer">❌</span> has won the game!`;
            }, 200);
            
            gameEnded = true;

            cells[a].style.backgroundColor = "green";
            cells[b].style.backgroundColor = "green";
            cells[c].style.backgroundColor = "green";

            win.play();

            return 'cross';
        }

        if (cells[a].classList.contains('circle') && cells[b].classList.contains('circle') && cells[c].classList.contains('circle')) {
            setTimeout(() => {
                winnerNotice.style.display = "flex";
                winnerTitle.innerHTML = `<span id="winnerNoticePlayer">⭕</span> has won the game!`;
            }, 200);
            
            gameEnded = true;

            cells[a].style.backgroundColor = "green";
            cells[b].style.backgroundColor = "green";
            cells[c].style.backgroundColor = "green";

            win.play();

            return 'circle';
        }
    }

    if (isBoardFull()) {
        gameEnded = true;

        setTimeout(() => {
            winnerNotice.style.display = "flex";
            winnerTitle.innerText = "It's a draw!";
            draw.play();
        }, 200);
    }

    return false;
}

function isBoardFull() {
    return Array.from(cells).every((cell) => cell.classList.contains('circle') || cell.classList.contains('cross'));
}