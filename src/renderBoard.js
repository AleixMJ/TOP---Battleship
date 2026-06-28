function renderBoard(containerId) {

    const container = document.getElementById(containerId);
    container.innerHTML = "";

    for (let row = 0; row < 10; row++) {
        console.log("appending row");
        for (let col = 0; col < 10; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            cell.dataset.row = row;
            cell.dataset.col = col;

            if (containerId === "gameboard-container-opponent") {
                cell.addEventListener("click", (e) => {
                    const targetRow = parseInt(e.target.dataset.row);
                    const targetCol = parseInt(e.target.dataset.col);

                    console.log(`Attacking Opponent at: ${targetRow}, ${targetCol}`);
                });
            }

            container.appendChild(cell);
            
        }
    }

}

export default renderBoard;