var baby;

function preload() {
    baby = loadSound("dw.mp3")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(50);
    noFill();
    stroke(255);
    strokeWeight(8);
    if (keyIsPressed) {
        ellipse(windowWidth / 2, windowHeight / 2, 300, 300);


    }
}

function keyTyped() {
    baby.play();
}