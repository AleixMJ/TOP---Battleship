// index.js

import "./styles.css";
import "./gameboard.css";
import "./cellStatus.css";
import initGame from "./initGame.js";
// import setupGame from "./setupGame.js"; // You will build this next!

document.addEventListener("DOMContentLoaded", () => {
    // 1. Instant action on load
    initGame();

    // 2. Grab UI Control Elements
    const newGameBtn = document.getElementById("new-game-btn");
    const startBattleBtn = document.getElementById("start-battle-btn");
    const battleView = document.getElementById("battle-view");
    const setupView = document.getElementById("setup-view");

    // 3. Switch to Custom Setup Screen
    if (newGameBtn) {
        newGameBtn.addEventListener("click", () => {            
            battleView.classList.add("hidden");
            setupView.classList.remove("hidden");            
        });
    }

    // 4. Return to Battlefield after Custom Placement
    if (startBattleBtn) {
        startBattleBtn.addEventListener("click", () => {
            setupView.classList.add("hidden");
            battleView.classList.remove("hidden");
            
            // Re-run the game loop initializing with the custom configuration
            initGame(); 
        });
    }
});