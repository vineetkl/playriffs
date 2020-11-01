var baby;

function preload() {
    baby = loadSound("dw.mp3")
}

function setup() {
    createCanvas(windowWidth, windowHeight);

}

function draw() {
    background(145);


}

function keyTyped() {
    baby.play();
}