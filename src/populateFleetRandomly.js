// populateFleetRandomly.js 

function populateFleetRandomly(gameboardInstance, fleet) {

     for (let ship of fleet) {

        let placed = false;

        while (!placed) {
            const randomRow = Math.floor(Math.random() * 10);
            const randomCol = Math.floor(Math.random() * 10);
            const alignment = Math.random() > 0.5;

            try {
                gameboardInstance.board.placeShip(ship, randomRow, randomCol, alignment);
                placed = true;
            } catch (error) {
                console.log(`AI placement failed (${error.message}). Retrying...`);
            }
        }

    }

}
 
export default populateFleetRandomly;