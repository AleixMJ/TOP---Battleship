// index.js

import "./styles.css";
import "./gameboard.css";
import "./cellStatus.css";
import "./setupView.css";
import initGame from "./initGame.js";
import renderSetupPhase from "./renderSetupPhase.js"; 
import Player from "./Player.js"; 
import populateFleetRandomly from "./populateFleetRandomly.js";

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

let currentPlacementOrientation = "horizontal";

// Global orientation handler remains perfectly fine out here
// index.js

const rotateBtn = document.getElementById("rotate-btn");
if (rotateBtn) {
    rotateBtn.addEventListener("click", () => {
        // 1. Toggle state orientation string value
        currentPlacementOrientation = (currentPlacementOrientation === "horizontal") ? "vertical" : "horizontal";
        
        // 2. Give the user distinct visual feedback on the button text
        rotateBtn.textContent = `Orientation: ${currentPlacementOrientation.toUpperCase()}`;
        rotateBtn.style.borderColor = currentPlacementOrientation === "vertical" ? "#2196F3" : "#cbd5e1";

        // 💥 3. RE-ALIGN ALL SHIPS INSIDE THE DOCKYARD VISUALLY
        const dockyardShips = document.querySelectorAll(".setup-ship");
        dockyardShips.forEach(shipEl => {
            if (currentPlacementOrientation === "vertical") {
                shipEl.classList.add("vertical");
            } else {
                shipEl.classList.remove("vertical");
            }
        });
    });
}

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
    const randomizeBtn = document.getElementById("random-setup-btn");
    const clearBoardBtn = document.getElementById("clear-board-btn");

    // 3. Switch to Custom Setup Screen
    if (newGameBtn) {
        newGameBtn.addEventListener("click", () => {            
            battleView.classList.add("hidden");
            setupView.classList.remove("hidden");
            statusMessage.textContent = "Deploy your Fleet"; 
            
            // 1. Instantiate a completely fresh player data profile 
            customPlayerInstance = new Player();
            
            // 💥 2. DEFENSIVE FIX: Force the data board array to clear out immediately 
            customPlayerInstance.board.resetBoard();
            
            // 3. Re-render the pristine grid template view (wiping old ship sprites out of the DOM)
            renderSetupPhase(customPlayerInstance, FLEET_BLUEPRINTS);

            // 💥 4. RESTORE THE DOCKYARD SHELF: Ensure the sidebar menu is fully populated with draggable units
            const dockyard = document.getElementById("dockyard");
            if (dockyard) {
                dockyard.innerHTML = FLEET_BLUEPRINTS.map(ship => `
                    <div class="dockyard-item">
                        <span class="dockyard-label">${ship.id} (${ship.slots})</span>
                        <div class="setup-ship" draggable="true" data-length="${ship.slots}" data-name="${ship.id}">
                            <img src="${ship.image}" class="dockyard-ship-sprite" style="--slots: ${ship.slots};">
                        </div>
                    </div>
                `).join("");
            }
        });
    }

    // 💥 4. INTEGRATE THE RANDOM PLACEMENT ENGINE INSIDE SCOPE
    if (randomizeBtn) {
        randomizeBtn.addEventListener("click", () => {
            if (!customPlayerInstance) return;

            customPlayerInstance.board.resetBoard(); 

            populateFleetRandomly(customPlayerInstance, FLEET_BLUEPRINTS);
            renderSetupPhase(customPlayerInstance, FLEET_BLUEPRINTS);

            const dockyard = document.getElementById("dockyard");
            if (dockyard) {
                dockyard.innerHTML = `<div style="text-align:center; padding: 20px; color:#64748b; font-weight:bold;">Fleet Deployed! 🚢</div>`;
            }
        });
    }

    // 💥 5. INTEGRATE THE CLEAR BOARD SYSTEM INSIDE SCOPE
    if (clearBoardBtn) {
        clearBoardBtn.addEventListener("click", () => {
            if (!customPlayerInstance) return;

            customPlayerInstance.board.resetBoard();
            renderSetupPhase(customPlayerInstance, FLEET_BLUEPRINTS);

            const dockyard = document.getElementById("dockyard");
            if (dockyard) {
                dockyard.innerHTML = FLEET_BLUEPRINTS.map(ship => `
                    <div class="dockyard-item">
                        <span class="dockyard-label">${ship.id} (${ship.slots})</span>
                        <div class="setup-ship" draggable="true" data-length="${ship.slots}" data-name="${ship.id}">
                            <img src="${ship.image}" class="dockyard-ship-sprite" style="--slots: ${ship.slots};">
                        </div>
                    </div>
                `).join("");
            }
        });
    }

    // 6. Return to Battlefield after Custom Placement
    if (startBattleBtn) {
        startBattleBtn.addEventListener("click", () => {
            setupView.classList.add("hidden");
            battleView.classList.remove("hidden");
            statusMessage.textContent = "Your Turn!";
            
            initGame(FLEET_BLUEPRINTS, customPlayerInstance); 
        });
    }
});