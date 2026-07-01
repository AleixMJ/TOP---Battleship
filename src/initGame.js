// initGame.js

import renderBoard from "./renderBoard.js";
import renderHeaders from "./renderHeaders.js";
import Player from "./Player.js";
import populateFleetRandomly from "./populateFleetRandomly.js";

const statusMessage = document.getElementById("game-status");

let isAiThinking = false;
let isGameOver = false;
let smartAi = true;

// humanPlayer is optional now! If it's missing, we random-allocate automatically.
function initGame(fleet, humanPlayer = null) {
    isAiThinking = false;
    isGameOver = false;

    const difficultyToggle = document.getElementById("ai-difficulty-toggle");
    if (difficultyToggle) {
        smartAi = difficultyToggle.checked; 
        console.log(`Match started. AI Mode: ${smartAi ? "SMART" : "RANDOM"}`);
    }

    // 1. CLEAR ALL DOM MEMORY & INSTANCES
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

    // 2. DEFINE THE ACTIVE HUMAN PLAYER
    let activePlayer;
    if (humanPlayer) {
        activePlayer = humanPlayer; // Use custom dragged layout
    } else {
        activePlayer = new Player(); // Start completely fresh
        populateFleetRandomly(activePlayer, fleet); // Instant random assignment!
    }

    // Setup the AI Opponent
    const opponent = new Player(false);
    populateFleetRandomly(opponent, fleet);

    // 3. RENDER PLAYER LAYOUT
    const playerWrapper = document.querySelector(".gameboard-wrapper.player");
    renderHeaders(playerWrapper);
    renderBoard("gameboard-container-player", activePlayer.board, fleet);

    // 4. RENDER OPPONENT LAYOUT
    const opponentWrapper = document.querySelector(".gameboard-wrapper.opponent");
    renderHeaders(opponentWrapper);
    renderBoard("gameboard-container-opponent", opponent.board);

    // 5. INITIALIZE BATTLE INTERFACE METRICS
    const opponentContainer = document.getElementById("gameboard-container-opponent");

    // 6. SINGLE ISOLATED GAME LOOP LISTENER
    opponentContainer.addEventListener("click", (e) => {
        if (!e.target.classList.contains("cell")) return;
        if (isAiThinking || isGameOver) return;

        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);

        // Process Human Move
        try {
            activePlayer.attackEnemy(opponent.board, row, col);
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
            if (smartAi) {
                opponent.smartAttack(activePlayer.board);
            } else {
                opponent.randomAttack(activePlayer.board);
            }
            
            // Fixed container target string name to match player view layout box
            renderBoard("gameboard-container-player", activePlayer.board, fleet);
            
            // Assess victory criteria for Computer AI
            if (activePlayer.board.allShipsSunk()) {
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

// Clean Default Export
export default initGame;