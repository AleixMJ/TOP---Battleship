// index.js

import "./styles.css";
import "./gameboard.css";
import "./cellStatus.css";
import "./setupView.css";
import initGame from "./initGame.js";
import renderSetupPhase from "./renderSetupPhase.js"; // Importing your clean setup module
import Player from "./Player.js"; // Needed to instantiate a custom layout instance

import carrierImg from "./assets/carrier.svg";
import battleshipImg from "./assets/battleship.svg";
import destroyerImg from "./assets/destroyer.svg";
import submarineImg from "./assets/submarine.svg";
import cruiserImg from "./assets/cruiser.svg";

const FLEET_BLUEPRINTS = [
    { name: "Carrier",    slots: 5, image: carrierImg,    id: "carrier" },
    { name: "Battleship",  slots: 4, image: battleshipImg,  id: "battleship" },
    { name: "Cruiser",     slots: 3, image: cruiserImg,     id: "cruiser" },
    { name: "Submarine",   slots: 3, image: submarineImg,   id: "submarine" },
    { name: "Destroyer",   slots: 2, image: destroyerImg,   id: "destroyer" }
];

const statusMessage = document.getElementById("game-status");
statusMessage.textContent = "Your Turn!";

document.addEventListener("DOMContentLoaded", () => {
    // This tracks whether the player custom-arranged their board
    let customPlayerInstance = null;

    // 1. Instant action on load (Runs auto-random play loop by default)
    initGame(FLEET_BLUEPRINTS);

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
            statusMessage.textContent = "Deploy your Fleet"; 
            
            // Instantiating a clean profile to store manual drag-and-drop locations
            customPlayerInstance = new Player();
            
            // Render the empty grid layout ready to take dropped pieces
            renderSetupPhase(customPlayerInstance, FLEET_BLUEPRINTS);
        });
    }

    // 4. Return to Battlefield after Custom Placement
    if (startBattleBtn) {
        startBattleBtn.addEventListener("click", () => {
            setupView.classList.add("hidden");
            battleView.classList.remove("hidden");
            statusMessage.textContent = "Your Turn!";
            
            // Launch the game engine passing your newly configured layout!
            initGame(FLEET_BLUEPRINTS, customPlayerInstance); 
        });
    }
});