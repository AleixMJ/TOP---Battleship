// initGame.js

import renderBoard from "./renderBoard.js";
import renderHeaders from "./renderHeaders.js";
import Player from "./Player.js";

function initGame() {
    const player = new Player();
    player.board.placeShip(3, 4, 4, true);
    const opponent = new Player(false);
    opponent.board.placeShip(3, 4, 4, true);


    // 1. Render the player layout completely    
    const playerWrapper = document.querySelector(".gameboard-wrapper.player");
    renderHeaders(playerWrapper);
    renderBoard("gameboard-container-player", player.board);

    // 2. Render the opponent layout completely
    const opponentWrapper = document.querySelector(".gameboard-wrapper.opponent");
    renderHeaders(opponentWrapper);
    renderBoard("gameboard-container-opponent", opponent.board);

    const opponentContainer = document.getElementById("gameboard-container-opponent");

    opponentContainer.addEventListener("click", (e) => {
        if (!e.target.classList.contains("cell")) return;

        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);

        opponent.board.receiveAttack(row, col);

        renderBoard("gameboard-container-opponent", opponent.board);
    })
    
}

export default initGame;