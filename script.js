document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const popup = document.getElementById("popup");
    const message = document.getElementById("result-message");
    const restartBtn = document.getElementById("restart-btn");
    let cells = [];
    let currentPlayer = "X";
    let gameBoard = Array(9).fill(null);

    function createBoard() {
        for (let i = 0; i < 9; i++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            cell.addEventListener("click", handleMove);
            board.appendChild(cell);
            cells.push(cell);
        }
    }

    function handleMove(event) {
        let index = event.target.dataset.index;

        if (!gameBoard[index]) {
            gameBoard[index] = currentPlayer;
            event.target.innerText = currentPlayer;
            event.target.classList.add(currentPlayer === "X" ? "x" : "o");
            event.target.style.pointerEvents = "none";
            
            if (checkWin()) {
                showPopup(`${currentPlayer} Wins!`);
                return;
            }

            if (!gameBoard.includes(null)) {
                showPopup("It's a Draw!");
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    function checkWin() {
        const winningCombos = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ];
        
        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                cells[a].classList.add("win");
                cells[b].classList.add("win");
                cells[c].classList.add("win");
                return true;
            }
        }
        return false;
    }

    function showPopup(text) {
        message.innerText = text;
        popup.classList.add("show");
    }

    restartBtn.addEventListener("click", () => {
        gameBoard.fill(null);
        cells.forEach(cell => {
            cell.innerText = "";
            cell.classList.remove("x", "o", "win");
            cell.style.pointerEvents = "auto";
        });
        currentPlayer = "X";
        popup.classList.remove("show");
    });

    createBoard();
});