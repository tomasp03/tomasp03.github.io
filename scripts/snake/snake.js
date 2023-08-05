let canvasDim = [600, 600];
let squaresNum = 24;
let snake;
let direction;
let food;
let RestartButton
let speedSlider;

function setup() {
    direction = createVector(0, 1);

    RestartButton = createButton("Restart");
    speedSlider = createSlider(3, 10, 5, 1);
    frameRate(speedSlider.value());
    createCanvas(600, 600);
    food = new Food(floor(random(squaresNum)) *  (canvasDim[0] / squaresNum), floor(random(squaresNum)) * (canvasDim[1] / squaresNum));
    snake = new Snake();
    background(0);
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
        snake.grow();
    }
}

function draw() {
    frameRate(speedSlider.value());

    background(255);
    snake.move(direction.x, direction.y);
    snake.show();
    snake.updateSize(food);
    food.show();
    snake.updateScore();
    snake.didCollide();
    RestartButton.mousePressed(function() {
        snake = new Snake();
        direction.x = 0;
        direction.y = 1;
        speedSlider.value(5);
        loop();
    });
}