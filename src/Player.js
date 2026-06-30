// Player.js

import Gameboard from "./Gameboard.js";


class Player {
    constructor(human = true) {
        this.human = human;
        this.board = new Gameboard();

    }

    attackEnemy(enemyBoard, row, col) {
        enemyBoard.receiveAttack(row, col);
    }

    randomAttack(enemyBoard) {
        let attackCoordinatesValid = false;

            while(!attackCoordinatesValid) {
                const randomRow = Math.floor(Math.random() * 10);
                const randomCol = Math.floor(Math.random() * 10);

                try {
                    this.attackEnemy(enemyBoard, randomRow, randomCol);
                    attackCoordinatesValid = true;
                } catch (error) {
                    console.log(`AI targeted (${randomRow}, ${randomCol}) but failed: ${error.message}. Retrying...`);
                }
                
            }

    }
};

export default Player;