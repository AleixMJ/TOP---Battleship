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

});