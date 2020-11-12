let beginX = 40.0; // Initial x-coordinate
let beginY = 40.0; // Initial y-coordinate
let endX = 500.0; // Final x-coordinate
let endY = 200.0; // Final y-coordinate
let distX; // X-axis distance to move
let distY; // Y-axis distance to move
let exponent = 1; // Determines the curve
let x = 0.0; // Current x-coordinate
let y = 0.0; // Current y-coordinate
let step = 0.01; // Size of each step along the path
let pct = 0.0; // Percentage traveled (0.0 to 1.0)

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    distX = endX - beginX;
    distY = endY - beginY;
}

function draw() {
    push();
    fill(0, 20);
    rect(0, 0, width, height);
    pct += step;
    if (pct < 1.0) {
        x = beginX + pct * distX;
        y = beginY + pow(pct, exponent) * distY;
    }
    fill(255);
    ellipse(x, y, random(0.1, 2), random(0.1, 2));
    pop()
}

function keyPressed() {
    if (keyCode == '67') {
        pct = 0.0;
        beginX = random(x + 80, y + 80);
        beginY = y;
        endX = random(20, width - 20);
        endY = random(20, height - 20);
        distX = endX - beginX;
        distY = endY - beginY;
    }
}