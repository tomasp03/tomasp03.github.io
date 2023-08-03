let canvasDim = [600, 600];
let squaresNum = 24;
let snake = [];
let direction;

class SnakeTile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = canvasDim[0] / squaresNum;
        this.height = canvasDim[1] / squaresNum;
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

function setup() {
    direction = createVector(0, 1);
    frameRate(5);
    createCanvas(600, 600);
    background(0);
    snake.push(new SnakeTile(0, 0));
    snake.push(new SnakeTile(-25, 0));
    snake.push(new SnakeTile(-50, 0));
    snake.push(new SnakeTile(-75, 0));

}

function grow() {
    head = snake[0];
    newTile = new SnakeTile(head.x + direction.x * head.speed, head.y + direction.y * head.speed);
    snake.unshift(newTile);
}

function keyPressed() {
    if (key == 'w') {
        direction.y = -1;
        direction.x = 0;
    } else if (key == 's') {
        direction.y = 1;
        direction.x = 0;
    } else if (key == 'a') {
        direction.x = -1;
        direction.y = 0;
    } else if (key == 'd') {
       direction.x = 1;
       direction.y = 0;
    } else if (key == 'g') {
        grow();
    }
}

function draw() {
    background(255);
    head = snake[0];
    last = snake.pop();
    last.setPos(head.x + direction.x * head.speed, head.y + direction.y * head.speed);
    snake.unshift(last);

    snake.forEach(tile => {
        tile.show();
    });
}