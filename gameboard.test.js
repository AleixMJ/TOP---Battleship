import Gameboard from "./Gameboard.js";
import Ship from "./Ship.js";

describe("Gameboard Mechanics", () => {

    let testGameboard;

    beforeEach(() => {
        testGameboard = new Gameboard;
    });

    test('Gameboard has a 10x10 matrix', () => {
        expect(testGameboard.grid[0][0]).toBe(null);
        expect(testGameboard.grid[9][9]).toBe(null);
        expect(testGameboard.grid[10]?.[10]).toBe(undefined);
        expect(testGameboard.grid[15]?.[12]).toBe(undefined);
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

    test('Ship placed out of boundries', () => {
        testGameboard.placeShip(1, 8, 8);
        expect(() => {
            testGameboard.placeShip(1, 8, 8);
        }).toThrow("Space occupied by other Ship");
    });
    
    test('Attack misses correctly', () => {
        testGameboard.receiveAttack(1, 2,);
        expect(testGameboard.grid[1][2]).toBe("miss");
    }); 

    test('Attack hits correctly', () => {
        testGameboard.placeShip(1, 1, 2);
        testGameboard.receiveAttack(1, 2,);
        expect(testGameboard.grid[1][2]).toBe("hit");
    });
    
    test('Attack out of boundries', () => {
        expect(() => {
            testGameboard.receiveAttack(11, 11);
        }).toThrow("Attack ouf of boundries");
    });

    test('All ships are sunk', () => {
        testGameboard.placeShip(1, 1, 2);
        testGameboard.receiveAttack(1, 2,);
        expect(testGameboard.allShipsSunk()).toBe(true);
    });

    test('All ships are not sunk', () => {
        testGameboard.placeShip(1, 1, 2);
        testGameboard.placeShip(2, 4, 7);
        testGameboard.receiveAttack(1, 1, 2,);
        expect(testGameboard.allShipsSunk()).toBe(false);
    });
});