let rays = []
let lines = []

function setup() {
    createCanvas(800, 600);
    background(0);

    rays.push(new Ray(width / 2, height /2, 1, 0));

    for (i = 0; i < 5; i++) {
        let x1 = random(width);
        let x2 = random(width);
        let y1 = random(height);
        let y2 = random(height);
        lines.push(new Line(x1, y1, x2, y2));
    }
}

function draw() {
    background(0);
    lines.forEach(line => {
        line.show();
    });

    rays.forEach(ray => {
        ray.show();
        ray.updateOrigin(mouseX, mouseY);
    });

}