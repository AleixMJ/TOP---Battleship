//renderBoard.js

function renderBoard(containerId, gameboardInstance) {

    console.log(`DEBUG: renderBoard is currently painting cells into: ${containerId}`);

    const container = document.getElementById(containerId);
    container.innerHTML = "";

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;

            const matchesCell = coord => coord[0] === row && coord[1] === col;

            const isHit = gameboardInstance.successfulAttacks.some(matchesCell);
            const isMiss = gameboardInstance.missedAttacks.some(matchesCell);

            if (gameboardInstance.grid[row][col] !== null) {
                    cell.classList.add("ship");
                } else {
                cell.classList.add("water");
            }

            if (isHit) {
                cell.classList.add("hit");       
            } else if (isMiss) {
                cell.classList.add("miss");
            }

            container.appendChild(cell);
            
        }
    

    }
}

export default renderBoard;