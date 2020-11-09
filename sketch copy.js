//https://codeburst.io/sunsets-and-shooting-stars-in-p5-js-92244d238e2b


var baby; //soundname
var canvas1; //to place convas behind html
var stargif; //star gif
var bgmusic; //looping music


//
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function preload() {
    baby = loadSound("dw.mp3") //soundload
    stargif = loadImage("stars.gif");
    bgmusic = loadSound("citygirlintro.mp3");


}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight); //initite
    canvas.position(0, 0);
    canvas.style('z-index', '-2'); //
    stargif.resize(windowWidth, windowHeight);
    stargif.delay(20);
    bgmusic.loop();





    //
    //noCursor();
}


function draw() {
    var color1 = color(28, 29, 84); //gradient upper color
    var color2 = color(76, 123, 194); //gradient lower color
    setGradient(0, 0, windowWidth, windowHeight, color1, color2, "Y"); //(x,y,w,h,c1,c2,axis(orientation))
    //
    image(stargif, 0, 0);
    //
    stroke(255, 255, 255);
    strokeWeight(10);
    if (keyIsPressed) {
        ellipse(windowWidth / 2, windowHeight / 2, 500, 500);
    }



}
//


//function below is for gradient
function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
    if (axis == "Y") { // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
            var inter = map(i, y, y + h, 0, 1);
            var c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x + w, i);
        }
    } else if (axis == "X") { // Left to right gradient
        for (let j = x; j <= x + w; j++) {
            var inter2 = map(j, x, x + w, 0, 1);
            var d = lerpColor(c1, c2, inter2);
            stroke(d);
            line(j, y, j, y + h);
        }
    }
}

//interaction
function keyTyped() {
    baby.play();
}