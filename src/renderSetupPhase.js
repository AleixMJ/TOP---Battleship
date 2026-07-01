// renderSetupPhase.js
import renderBoard from "./renderBoard.js";
import renderHeaders from "./renderHeaders.js";

export default function renderSetupPhase(playerInstance, fleetBlueprints) {
    const setupWrapper = document.querySelector(".gameboard-wrapper.setup");
    if (setupWrapper) {
        renderHeaders(setupWrapper);
    }

    // 1. Render the underlying placement grid
    renderBoard("setup-board", playerInstance.board, fleetBlueprints);

    // 2. 💥 INJECT NATIVE SPRITE ELEMENTS INTO THE DOCKYARD
    fleetBlueprints.forEach((shipBlueprint) => {
        const shipElement = document.querySelector(`.setup-ship[data-name="${shipBlueprint.id}"]`);
        
        if (shipElement) {
            // Clear out any old instances to prevent stacking on re-renders
            shipElement.innerHTML = '';

            // Create a native image element matching your battle-grid layout structure
            const img = document.createElement("img");
            img.src = shipBlueprint.image;
            img.classList.add("dockyard-ship-sprite");
            
            // Feed the layout variables directly to the engine
            img.style.setProperty("--slots", shipBlueprint.slots);

            shipElement.appendChild(img);
        }
    });
}