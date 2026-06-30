// initGame.js

import renderBoard from "./renderBoard.js";
import renderHeaders from "./renderHeaders.js";
import Player from "./Player.js";
import populateFleetRandomly from "./populateFleetRandomly.js";

let isAiThinking = false;
let isGameOver = false;

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


    // 4. Start the game
    const opponentContainer = document.getElementById("gameboard-container-opponent");
    const statusMessage = document.getElementById("game-status");

    opponentContainer.addEventListener("click", (e) => {
        if (!e.target.classList.contains("cell")) return;
        if (isAiThinking || isGameOver) return;

        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);

        try {
        player.attackEnemy(opponent.board, row, col);
        } catch (error) {
            statusMessage.textContent = "You already shot there! Pick another spot.";
            return;
        }
        

        isAiThinking = true;

        
        renderBoard("gameboard-container-opponent", opponent.board);
        if (opponent.board.allShipsSunk()) {
            statusMessage.textContent = "You win!"
            isGameOver = true;
            isAiThinking = false;
            return
        }
        statusMessage.textContent = "Enemy fires back..."

        setTimeout(() => {
            opponent.randomAttack(player.board);
            renderBoard("gameboard-container-player", player.board);
            if (player.board.allShipsSunk()) {
            statusMessage.textContent = "You lose!"
            isGameOver = true;
            return
            }

            statusMessage.textContent = "Your Turn!"
            isAiThinking = false;
        
        }, 1500);

    })
    
}

export default initGame;