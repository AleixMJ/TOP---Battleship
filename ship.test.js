import Ship from './Ship.js'

describe("Ship Mechanics", () => {

    let testShip;

    beforeEach(() => {
        testShip = new Ship(3);
    })

    test('Initialises with 0 hits', () => {
        expect(testShip.hits).toBe(0);
    });


    test('Ship length', () => {

        expect(testShip.length).toBe(3);
    });

    test('Ship was hit', () => {
        
        testShip.hit();
        expect(testShip.hits).toBe(1);
        testShip.hit();
        expect(testShip.hits).toBe(2);
    });

    test('Ship hits cannot be higher than ship length', () => 
    {
        testShip.hit();
        testShip.hit();
        testShip.hit();
        testShip.hit();
        expect(testShip.hits).toBe(3);
        
    });

    test('Ship is not Sunk', () => {
        expect(testShip.isSunk()).toBe(false);
    });

    test('Ship is Sunk', () => {
        testShip.hit();
        testShip.hit();
        testShip.hit();
        expect(testShip.isSunk()).toBe(true);
    });

});
