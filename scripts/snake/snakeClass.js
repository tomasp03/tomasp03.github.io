class SnakeTile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = width / squaresNum;
        this.height = height / squaresNum;
        this.speed = this.width;
    }

    updatePos(dirX, dirY) {
        this.x += dirX * this.speed;
        this.y += dirY * this.speed;
    }

    setPos(x ,y) {
        this.x = x;
        this.y = y;
    }
    
    show() {
        fill(0);
        rect(this.x, this.y, this.width, this.height);
    }
}

class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = width / squaresNum;
        this.height = height / squaresNum;
    }

    show() {
        fill(244, 34, 54);
        rect(this.x, this.y, this.width, this.height);
    }

    setPos(x ,y) {
        this.x = x;
        this.y = y;
    }

    setNewPossition() {
        this.setPos(floor(random(squaresNum)) * (width / squaresNum), floor(random(squaresNum)) * (height / squaresNum));
    }
}

class Snake {
    constructor() {
        this.body = [];
        this.body.push(new SnakeTile(0, 0));
        this.score = 0;
    }

    updateScore() {
        fill(0);
        textSize(32);
        textAlign(LEFT, TOP);
        text(this.score, 5, 5);   
    }

    move(directionX, directionY) {
        let head = this.body[0];
        let last = this.body.pop();
        last.setPos(head.x + directionX * head.speed, head.y + directionY * head.speed);
        this.body.unshift(last);
    }

    show() {
        this.body.forEach(tile => {
            tile.show();
        });
    }
    
    grow() {
        let head = this.body[0];
        let newTile = new SnakeTile(head.x + direction.x * head.speed, head.y + direction.y * head.speed);
        this.body.unshift(newTile);
    }

    didCollide() {
        if (this.wallCollision() || this.bodyCollision()) {
            this.gameOver();
        }
    }

    wallCollision() {
        let head = this.body[0];
        return head.x < 0 || head.y < 0 || head.x >= canvasDim[0] || head.y >= canvasDim[1];
    }

    bodyCollision() {
        let head = this.body[0];
        for (let i = 1; i < this.body.length; i++) {
            if (this.body[i].x == head.x && this.body[i].y == head.y) {
                return true;
            }
        }
        return false;
    }

    updateSize(food) {
        if (this.hasEaten(food)) {
            this.grow();
            food.setNewPossition();
            this.score++;
        }
    }

    gameOver() {
        print("END GAME");
        background(255, 0, 0);
        fill(0);
        textSize(64);
        textAlign(CENTER, CENTER);
        text("END GAME", width / 2, height / 2);
        noLoop();
    }

    hasEaten(food) {
        let head = this.body[0];
        return head.x == food.x && head.y == food.y;    
    }
}