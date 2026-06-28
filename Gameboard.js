import Ship from "./Ship.js";

class Gameboard {
    constructor() {
        this.grid = Array.from({ length: 10}, () => Array(10).fill(null));
        this.ships = [];
        this.missedAttacks = [];
        this.successfulAttacks = [];
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
            this.ships.push(ship);
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
            this.ships.push(ship);
            let SquaresOccupied = 1;
            while (ship.length > SquaresOccupied ) {
                startX++;
                this.grid[startY][startX] = ship;
                SquaresOccupied++;
            }
        }
    }
    receiveAttack(row, col) {
        if (row > 9 || row < 0 || col > 9 || col < 0) {
            throw Error("Attack ouf of boundries");
        }

        const alreadyMiss = this.missedAttacks.some(coord => {
            return coord[0] === row && coord[1] === col;
        });

        const alreadyHit = this.successfulAttacks.some(coord => {
            return coord[0] === row && coord[1] === col;
        });

        if (alreadyMiss || alreadyHit) {
            throw Error("Coordinate has already been targeted")
        }

        
        const target = this.grid[row][col];


        if (target !== null) {
            this.successfulAttacks.push([row, col]);
            target.hit();
            
        } else this.missedAttacks.push([row, col]);

    }

    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }

};

export default Gameboard;