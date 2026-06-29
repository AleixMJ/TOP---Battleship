//index.js

import "./styles.css";
import "./gameboard.css";
import Ship from "./Ship.js";
import Gameboard from "./Gameboard.js";
import Player from "./Player.js";
import renderBoard from "./renderBoard.js";
import renderHeaders from "./renderHeaders.js";


document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Render the player layout completely
    renderBoard("gameboard-container-player");
    const playerWrapper = document.querySelector(".gameboard-wrapper.player");
    renderHeaders(playerWrapper);

    // 2. Render the opponent layout completely
    renderBoard("gameboard-container-opponent");
    const opponentWrapper = document.querySelector(".gameboard-wrapper.opponent");
    renderHeaders(opponentWrapper);
});