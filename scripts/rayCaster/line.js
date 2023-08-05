class Line {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y2 = y2;
        this.y1 = y1;
    }

    show() {
        stroke(255);
        line(this.x1, this.y1, this.x2, this.x2);
    }
}