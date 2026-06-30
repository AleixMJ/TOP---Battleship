// initGame.js

import renderBoard from "./renderBoard.js";
import renderHeaders from "./renderHeaders.js";
import Player from "./Player.js";
import populateFleetRandomly from "./populateFleetRandomly.js";

// Global engine flags to track active game loops
let isAiThinking = false;
let isGameOver = false;

function initGame() {
    // Reset global engine state flags back to baseline defaults for a new match
    isAiThinking = false;
    isGameOver = false;

    // 1. CLEAR ALL DOM MEMORY & INSTANCES
    // Overwriting battleView's innerHTML destroys old grid nodes entirely.
    // Because no active elements link back to previous Player/Gameboard instances,
    // the browser's Garbage Collector automatically wipes them from RAM.
    const battleView = document.getElementById("battle-view");
    battleView.innerHTML = `
        <div id="game-wrapper">
            <div class="gameboard-wrapper player">
                <div class="columnLetters"></div>
                <div class="rowNumbers"></div>
                <div id="gameboard-container-player" class="grid-board"></div>
            </div>
            <div class="gameboard-wrapper opponent">
                <div class="columnLetters"></div>
                <div class="rowNumbers"></div>
                <div id="gameboard-container-opponent" class="grid-board"></div>
            </div>
        </div>
    `;

    const fleet = [5, 4, 3, 3, 2];

    // 2. CREATE AND PLACE FLEETS
    // Instantiating fresh player models completely decoupled from any older matches
    const player = new Player();
    populateFleetRandomly(player, fleet);    
    const opponent = new Player(false);
    populateFleetRandomly(opponent, fleet);

    // 3. RENDER PLAYER LAYOUT
    const playerWrapper = document.querySelector(".gameboard-wrapper.player");
    renderHeaders(playerWrapper);
    renderBoard("gameboard-container-player", player.board);

    // 4. RENDER OPPONENT LAYOUT
    const opponentWrapper = document.querySelector(".gameboard-wrapper.opponent");
    renderHeaders(opponentWrapper);
    renderBoard("gameboard-container-opponent", opponent.board);

    // 5. INITIALIZE BATTLE INTERFACE METRICS
    const opponentContainer = document.getElementById("gameboard-container-opponent");
    const statusMessage = document.getElementById("game-status");
    statusMessage.textContent = "Your Turn!"; // Ensure message resets visually on new launch

    // 6. SINGLE ISOLATED GAME LOOP LISTENER
    opponentContainer.addEventListener("click", (e) => {
        // Guard clause: Only intercept targeting actions made directly on grid cells
        if (!e.target.classList.contains("cell")) return;
        // Guard clause: Stop inputs if match is over or awaiting AI action response
        if (isAiThinking || isGameOver) return;

        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);

        // Process Human Move
        try {
            player.attackEnemy(opponent.board, row, col);
        } catch (error) {
            statusMessage.textContent = "You already shot there! Pick another spot.";
            return;
        }

        isAiThinking = true;
        renderBoard("gameboard-container-opponent", opponent.board);
        
        // Assess victory criteria for Human player
        if (opponent.board.allShipsSunk()) {
            statusMessage.textContent = "You win!";
            isGameOver = true;
            isAiThinking = false;
            return;
        }
        
        statusMessage.textContent = "Enemy fires back...";

        // Execute asynchronous AI turnaround
        setTimeout(() => {
            opponent.randomAttack(player.board);
            renderBoard("gameboard-container-player", player.board);
            
            // Assess victory criteria for Computer AI
            if (player.board.allShipsSunk()) {
                statusMessage.textContent = "You lose!";
                isGameOver = true;
                return;
            }

            // Yield turn sequence back to human player
            statusMessage.textContent = "Your Turn!";
            isAiThinking = false;
        }, 1500);
    });
}

export default initGame;