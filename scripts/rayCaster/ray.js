class Ray {
    constructor(posX, posY, dirX, dirY) {
        this.origin = createVector(posX, posY);
        this.direction = createVector(dirX, dirY);
        this.len = 50;
    }

    show() {
        fill(255);
        circle(this.origin.x, this.origin.y, 10);
        line(this.origin.x, this.origin.y, this.origin.x + this.direction.x * this.len, this.origin.y + this.direction.y * this.len);
    }

    updateLine(vector) {
        
    }

    updateOrigin(x, y) {
        this.origin.x = x;
        this.origin.y = y;
    }

    cast(line) {
        const x1 = line.a.x;
        const y1 = line.a.y;
        const x2 = line.b.x;
        const y2 = line.b.y;
        const x3 = this.origin.x;
        const y3 = this.origin.y;
        const x4 = this.origin.x + this.direction.x;
        const y4 = this.origin.y + this.direction.y;
        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) {
          return;
        }
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        if (t > 0 && t < 1 && u > 0) {
          const pt = createVector();
          pt.x = x1 + t * (x2 - x1);
          pt.y = y1 + t * (y2 - y1);
          return pt;
        } else {
          return createVector(0, 0);
        }
    }
}