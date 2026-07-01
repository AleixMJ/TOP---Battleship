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

    smartAttack(enemyBoard) {
    if (enemyBoard.shipsInjured.length === 0) {
        this.randomAttack(enemyBoard);
    } else {
        let i = 0;
        while (enemyBoard.shipsInjured.length > i) {
            const row = enemyBoard.shipsInjured[i][0];
            const col = enemyBoard.shipsInjured[i][1];

            // TARGET RIGHT
            if (col + 1 < 10 
                && !enemyBoard.shipsInjured.some(coord => coord[0] === row && coord[1] === col + 1) 
                && !enemyBoard.missedAttacks.some(coord => coord[0] === row && coord[1] === col + 1)) {
                this.attackEnemy(enemyBoard, row, col + 1);
                return;

            // TARGET LEFT
            } else if (col - 1 >= 0 
                && !enemyBoard.shipsInjured.some(coord => coord[0] === row && coord[1] === col - 1)
                && !enemyBoard.missedAttacks.some(coord => coord[0] === row && coord[1] === col - 1)) {
                this.attackEnemy(enemyBoard, row, col - 1);
                return;

            // TARGET DOWN
            } else if (row + 1 < 10 
                && !enemyBoard.shipsInjured.some(coord => coord[0] === row + 1 && coord[1] === col)
                && !enemyBoard.missedAttacks.some(coord => coord[0] === row + 1 && coord[1] === col)) {
                this.attackEnemy(enemyBoard, row + 1, col);
                return;

            // TARGET UP
            } else if (row - 1 >= 0 
                && !enemyBoard.shipsInjured.some(coord => coord[0] === row - 1 && coord[1] === col)
                && !enemyBoard.missedAttacks.some(coord => coord[0] === row - 1 && coord[1] === col)) {
                this.attackEnemy(enemyBoard, row - 1, col);
                return;
            } else {
                i++;
            }
            
        }
        this.randomAttack(enemyBoard);
    }
}
};

export default Player;