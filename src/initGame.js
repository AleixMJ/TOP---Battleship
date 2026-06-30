// initGame.js

import renderBoard from "./renderBoard.js";
import renderHeaders from "./renderHeaders.js";
import Player from "./Player.js";
import populateFleetRandomly from "./populateFleetRandomly.js";

function initGame() {

    const fleet = [5, 4, 3, 3, 2];

    // 1. create and place fleets
    const player = new Player();
    populateFleetRandomly(player, fleet);    
    const opponent = new Player(false);
    populateFleetRandomly(opponent, fleet);
   
   

    // 2. Render the player layout completely    
    const playerWrapper = document.querySelector(".gameboard-wrapper.player");
    renderHeaders(playerWrapper);
    renderBoard("gameboard-container-player", player.board);

    // 3. Render the opponent layout completely
    const opponentWrapper = document.querySelector(".gameboard-wrapper.opponent");
    renderHeaders(opponentWrapper);
    renderBoard("gameboard-container-opponent", opponent.board);

    const opponentContainer = document.getElementById("gameboard-container-opponent");

    opponentContainer.addEventListener("click", (e) => {
        if (!e.target.classList.contains("cell")) return;

        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);

        player.attackEnemy(opponent.board, row, col);

        renderBoard("gameboard-container-opponent", opponent.board);
    })
    
}

export default initGame;