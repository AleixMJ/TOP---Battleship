function renderBoard(containerId, gameboardInstance) {

    console.log(`DEBUG: renderBoard is currently painting cells into: ${containerId}`);

    const container = document.getElementById(containerId);
    container.innerHTML = "";

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            const boardData = gameboardInstance.grid[row][col];
            cell.classList.add("water");

            if (boardData !== null) { cell.classList.add("ship");}
           

            cell.dataset.row = row;
            cell.dataset.col = col;

            if (containerId === "gameboard-container-opponent") {
                cell.addEventListener("click", (e) => {
                    const clickedCell = e.target;
                    const targetRow = parseInt(e.target.dataset.row);
                    const targetCol = parseInt(e.target.dataset.col);

                    console.log(`Attacking Opponent at: ${targetRow}, ${targetCol}`);
                    if (gameboardInstance.grid[targetRow][targetCol] === null) {
                        clickedCell.classList.add("miss");               
                    } else {
                        clickedCell.classList.remove("water");
                        clickedCell.classList.add("hit");
                    }
                    
                });
            }

            container.appendChild(cell);
            
        }
    }

}

export default renderBoard;