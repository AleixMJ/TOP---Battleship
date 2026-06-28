import "./styles.css";
import "./gameboard.css";
import Ship from "./Ship.js";
import Gameboard from "./Gameboard.js";
import Player from "./Player.js";
import renderBoard from "./renderBoard.js";


console.log("Battleship game initialized!");
renderBoard("gameboard-container-player");
renderBoard("gameboard-container-opponent");
