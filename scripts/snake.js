let canvasDim = [600, 600];
let squaresNum = 24;
let snake = [];
let direction;
let food;

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

class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = canvasDim[0] / squaresNum;
        this.height = canvasDim[1] / squaresNum;
    }

    show() {
        fill(244, 34, 54);
        rect(this.x, this.y, this.width, this.height);
    }

    setPos(x ,y) {
        this.x = x;
        this.y = y;
    }
}

function gameOver() {
    print("END GAME");
    background(255, 0, 0);
    noLoop();
}

function grow() {
    head = snake[0];
    newTile = new SnakeTile(head.x + direction.x * head.speed, head.y + direction.y * head.speed);
    snake.unshift(newTile);
}

function setup() {
    direction = createVector(0, 1);
    frameRate(5);
    createCanvas(600, 600);
    food = new Food(floor(random(squaresNum)) *  (canvasDim[0] / squaresNum), floor(random(squaresNum)) * (canvasDim[1] / squaresNum));
    background(0);
    snake.push(new SnakeTile(0, 0));
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

    if (head.x == food.x && head.y == food.y) {
        grow();
        food.setPos(floor(random(squaresNum)) * (canvasDim[0] / squaresNum), floor(random(squaresNum)) * (canvasDim[1] / squaresNum));
    }

    head = snake[0];

    last = snake.pop();
    last.setPos(head.x + direction.x * head.speed, head.y + direction.y * head.speed);
    snake.unshift(last);

    head = snake[0];

    food.show();

    snake.forEach(tile => {
        tile.show();
    });

    for (i = 1; i < snake.length; i++) {
        if (snake[i].x == head.x && snake[i].y == head.y) {
            gameOver();
        }
    }

    if (head.x < 0 || head.y < 0 || head.x >= canvasDim[0] || head.y >= canvasDim[1]) {
        gameOver();
    }
}