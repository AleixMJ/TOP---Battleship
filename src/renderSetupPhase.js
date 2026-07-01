// renderSetupPhase.js
import renderBoard from "./renderBoard.js";
import renderHeaders from "./renderHeaders.js";

export default function renderSetupPhase(playerInstance, fleetBlueprints) {
    const setupWrapper = document.querySelector(".gameboard-wrapper.setup");
    if (setupWrapper) {
        renderHeaders(setupWrapper);
    }

    // 1. ATTACH FRESH, NON-STICKING DRAG & DROP PIPELINES FIRST
    // This cleans up old listeners BEFORE we render the interactive cells
    setupDragAndDrop(playerInstance, fleetBlueprints);

    // 2. Render the clean grid matrix cells into the freshly cleared board container
    renderBoard("setup-board", playerInstance.board, fleetBlueprints);

    // 3. INJECT NATIVE SPRITE ELEMENTS INTO THE DOCKYARD
    fleetBlueprints.forEach((shipBlueprint) => {
        const shipId = shipBlueprint.id || shipBlueprint.name;
        const shipElement = document.querySelector(`.setup-ship[data-name="${shipId}"]`);
        
        if (shipElement) {
            shipElement.innerHTML = '';

            const img = document.createElement("img");
            img.src = shipBlueprint.image;
            img.classList.add("dockyard-ship-sprite");
            img.style.setProperty("--slots", shipBlueprint.slots);

            shipElement.appendChild(img);
        }
    });
}

function setupDragAndDrop(playerInstance, fleetBlueprints) {
    const dockyard = document.getElementById("dockyard");
    const boardContainer = document.getElementById("setup-board");
    if (!dockyard || !boardContainer) return;

    // --- CLEAN DOCKYARD LISTENERS ---
    const newDockyard = dockyard.cloneNode(true);
    dockyard.parentNode.replaceChild(newDockyard, dockyard);

    newDockyard.addEventListener("dragstart", (e) => {
        const shipEl = e.target.closest(".setup-ship");
        if (!shipEl) return;

        e.dataTransfer.setData("text/plain", JSON.stringify({
            name: shipEl.dataset.name,
            length: parseInt(shipEl.dataset.length, 10)
        }));
        shipEl.classList.add("dragging");

        // 💥 ULTIMATE BALANCE: Accurate targeting + Dynamic layout rotation support
        const rotateBtn = document.getElementById("rotate-btn");
        const isVertical = rotateBtn ? rotateBtn.textContent.includes("VERTICAL") : false;

        // Measure the element exactly as it is sized on the screen right now
        const rect = shipEl.getBoundingClientRect();
        
        if (isVertical) {
            // Pin cursor at the horizontal center, and slightly below the top edge
            const offsetX = rect.width / 2;
            const offsetY = Math.min(20, rect.height / 2);
            e.dataTransfer.setDragImage(shipEl, offsetX, offsetY);
        } else {
            // Pin cursor near the front-left edge, centered vertically on the row strip
            const offsetX = Math.min(20, rect.width / 2);
            const offsetY = rect.height / 2;
            e.dataTransfer.setDragImage(shipEl, offsetX, offsetY);
        }
    });

    newDockyard.addEventListener("dragend", (e) => {
        const shipEl = e.target.closest(".setup-ship");
        if (shipEl) shipEl.classList.remove("dragging");
    });

    // --- CLEAN BOARD LISTENERS (The Ultimate Fix) ---
    // We clone the board container to permanently wipe away old game closures.
    // No more dataset flags needed!
    const newBoardContainer = boardContainer.cloneNode(true);
    boardContainer.parentNode.replaceChild(newBoardContainer, boardContainer);

    newBoardContainer.addEventListener("dragover", (e) => {
        if (e.target.classList.contains("cell")) {
            e.preventDefault();
        }
    });

    newBoardContainer.addEventListener("drop", (e) => {
        const cell = e.target.closest(".cell");
        if (!cell) return;
        
        e.preventDefault();
        
        const dataStr = e.dataTransfer.getData("text/plain");
        if (!dataStr) return;
        
        const { name, length } = JSON.parse(dataStr);
        const startY = parseInt(cell.dataset.row, 10);
        const startX = parseInt(cell.dataset.col, 10);
        
        const rotateBtn = document.getElementById("rotate-btn");
        const isVertical = rotateBtn ? rotateBtn.textContent.includes("VERTICAL") : false;

        try {
            // 1. Mutate game data coordinates for the current active game loop instance
            playerInstance.board.placeShip(length, startY, startX, isVertical, name);
            
            // 2. Clear out and rebuild the DOM grid cell matrix squares visually
            renderBoard("setup-board", playerInstance.board, fleetBlueprints);
            
            // 3. Wipe the successfully deployed element out of our sidebar panel shelf
            const currentDockyard = document.getElementById("dockyard");
            const sideShip = currentDockyard.querySelector(`.setup-ship[data-name="${name}"]`);
            if (sideShip) {
                sideShip.closest(".dockyard-item").classList.add("hidden-placeholder");
            }
            
            const remainingShips = currentDockyard.querySelectorAll(".setup-ship");
            if (remainingShips.length === 0) {
                currentDockyard.innerHTML = `<div style="text-align:center; padding: 10px; color:#64748b; font-weight:bold;">Fleet Deployed! 🚢</div>`;
            }

        } catch (error) {
            alert(error.message);
        }
    });
}