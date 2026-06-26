import Ship from "./Ship";

class Gameboard {
    constructor() {
        this.grid = Array.from({ length: 10}, () => Array(10).fill(null));
    }

    placeShip(length,  startY, startX, vertical = true) {
        let ship = new Ship(length);
        if (vertical === true) {

            if(startY + ship.length > 10) throw Error("ship out of boundries")

            let scanY = startY
            for (let i = 0; i < ship.length; i++) {
                if (this.grid[scanY][startX] !== null) {
                    throw Error("Space occupied by other Ship");
                }
                scanY++;
            }

            this.grid[startY][startX] = ship;
            let SquaresOccupied = 1;
            while (ship.length > SquaresOccupied ) {
                startY++;
                this.grid[startY][startX] = ship;
                SquaresOccupied++;
            }
        } else {
            if(startX + ship.length > 10) throw Error("ship out of boundries")

            let scanX = startX
            for (let i = 0; i < ship.length; i++) {
                if (this.grid[startY][scanX] !== null) {
                    throw Error("Space occupied by other Ship");
                }
                scanX++;
            }

            this.grid[startY][startX] = ship;
            let SquaresOccupied = 1;
            while (ship.length > SquaresOccupied ) {
                startX++;
                this.grid[startY][startX] = ship;
                SquaresOccupied++;
            }
        }
    }

};

export default Gameboard;