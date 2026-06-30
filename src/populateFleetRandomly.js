// populateFleetRandomly.js 

function populateFleetRandomly(playerInstance, fleet) {

     for (let ship of fleet) {

        let placed = false;

        while (!placed) {
            const randomRow = Math.floor(Math.random() * 10);
            const randomCol = Math.floor(Math.random() * 10);
            const alignment = Math.random() > 0.5;

            try {
                playerInstance.board.placeShip(
                    ship.slots,
                    randomRow,
                    randomCol,
                    alignment,
                    ship.name
                );
                placed = true;
            } catch (error) {
                console.log(`AI placement failed (${error.message}). Retrying...`);
            }
        }

    }

}
 
export default populateFleetRandomly;