// renderSetupPhase.js
import renderBoard from "./renderBoard.js";
import renderHeaders from "./renderHeaders.js";

export default function renderSetupPhase(playerInstance, fleetBlueprints) {
    const setupWrapper = document.querySelector(".gameboard-wrapper.setup");
    if (setupWrapper) {
        renderHeaders(setupWrapper);
    }

    renderBoard("setup-board", playerInstance.board, fleetBlueprints);
}