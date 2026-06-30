class Ship {
    constructor(length, name = "Unknown") {
        this.length = length;
        this.hits = 0;
        this.name = name;
        this.id = crypto.randomUUID();
    }
    
    hit() {
        if (this.hits >= this.length) {
            return;
        }
        this.hits ++;
    }

    isSunk() {
        if (this.length === this.hits) {
            return true;
        }

        return false;
    }
};

export default Ship;