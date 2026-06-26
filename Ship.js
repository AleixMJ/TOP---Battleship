class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
    }
    
    hit() {
        if (this.hits == this.length) {
            return
        }
        this.hits ++;
    }
};

export default Ship;