import Gameboard from "./Gameboard.js";


class Player {
    constructor(human = true) {
        this.human = human;
        this.board = new Gameboard();

    }

    attackEnemy(enemyBoard, row, col) {
        enemyBoard.receiveAttack(row, col);
    }
};

export default Player;