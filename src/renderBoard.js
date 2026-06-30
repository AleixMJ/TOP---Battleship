//renderBoard.js

function renderBoard(containerId, gameboardInstance, fleetBlueprints = null) {

    const container = document.getElementById(containerId);
    container.innerHTML = "";

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {

            const cellData = gameboardInstance.grid[row][col];

            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.dataset.row = row;
            cellElement.dataset.col = col;

            const matchesCell = coord => coord[0] === row && coord[1] === col;

            const isHit = gameboardInstance.successfulAttacks.some(matchesCell);
            const isMiss = gameboardInstance.missedAttacks.some(matchesCell);

            if (cellData !== null) {
                    cellElement.classList.add("ship");
                } else {
                cellElement.classList.add("water");
            }

            if (isHit) {
                cellElement.classList.add("hit");       
            } else if (isMiss) {
                cellElement.classList.add("miss");
            }

            if (cellData !== null && fleetBlueprints) {
                const blueprint = fleetBlueprints.find(b => b.name === cellData.name);

                if (blueprint) {
                    const imgElement = document.createElement("img");
                    imgElement.src = blueprint.image;

                    imgElement.classList.add("board-ship-sprite");

                    imgElement.style.setProperty("--slots", blueprint.slots);
                    imgElement.style.setProperty("--index", cellData.index);

                    if (cellData.orientation === "vertical") {
                        imgElement.classList.add("vertical");
                    }
                    cellElement.appendChild(imgElement);
                }
                

            }

            container.appendChild(cellElement);
            
        }
    

    }
}

export default renderBoard;