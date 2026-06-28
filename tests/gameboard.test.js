import Gameboard from "../src/Gameboard.js";
import Ship from "../src/Ship.js";

describe("Gameboard Mechanics", () => {
    let testGameboard;

    beforeEach(() => {
        testGameboard = new Gameboard();
    });

    test('Gameboard has a 10x10 matrix', () => {
        expect(testGameboard.grid[0][0]).toBe(null);
        expect(testGameboard.grid[9][9]).toBe(null);
    }); 
    
    test('Ship is placed on board', () => {
        testGameboard.placeShip(1, 2, 2);
        expect(testGameboard.grid[2][2]).toBeInstanceOf(Ship);
    }); 

    test('Ship placed out of boundries', () => {
        expect(() => {
            testGameboard.placeShip(1, 11, 11);
        }).toThrow("ship out of boundries");
    }); 

    test('Space occupied validation', () => {
        testGameboard.placeShip(1, 8, 8);
        expect(() => {
            testGameboard.placeShip(1, 8, 8);
        }).toThrow("Space occupied by other Ship");
    });
    
    test('Attack misses correctly tracking in array', () => {
        testGameboard.receiveAttack(1, 2);
        expect(testGameboard.missedAttacks).toContainEqual([1, 2]);
    }); 

    test('Attack hits correctly tracking in array', () => {
        testGameboard.placeShip(1, 1, 2);
        testGameboard.receiveAttack(1, 2);
        expect(testGameboard.successfulAttacks).toContainEqual([1, 2]);
    }); 
    
    test('Attack out of boundries', () => {
        expect(() => {
            testGameboard.receiveAttack(11, 11);
        }).toThrow("Attack ouf of boundries");
    });

    test('Cannot target same coordinate twice', () => {
        testGameboard.receiveAttack(1, 2);
        expect(() => {
            testGameboard.receiveAttack(1, 2);
        }).toThrow("Coordinate has already been targeted");
    });

    test('All ships are sunk', () => {
        testGameboard.placeShip(1, 1, 2);
        testGameboard.receiveAttack(1, 2);
        expect(testGameboard.allShipsSunk()).toBe(true);
    });

    test('All ships are not sunk', () => {
        testGameboard.placeShip(1, 1, 2);
        testGameboard.placeShip(2, 4, 7);
        testGameboard.receiveAttack(1, 2);
        expect(testGameboard.allShipsSunk()).toBe(false);
    });
});