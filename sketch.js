//https://codeburst.io/sunsets-and-shooting-stars-in-p5-js-92244d238e2b
// this class describes the properties of a single particle.
class Particle {
    // setting the co-ordinates, radius and the
    // speed of a particle in both the co-ordinates axes.
    constructor() {
        this.x = random(0, windowWidth);
        this.y = random(0, windowHeight);
        this.r = random(0, 2);
        this.xSpeed = random(-0.1, 0.12);
        this.ySpeed = random(-0.1, 0.12);
    }

    // creation of a particle.
    createParticle() {
        noStroke();
        fill('rgba(200,169,169,random(0,1)');
        circle(this.x, this.y, this.r);
    }

    // setting the particle in motion.
    moveParticle() {
        if (this.x < 0 || this.x > width)
            this.xSpeed *= -1;
        if (this.y < 0 || this.y > height)
            this.ySpeed *= -1;
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    // this function creates the connections(lines)
    // between particles which are less than a certain distance apart
    joinParticles(particles) {
        particles.forEach(element => {
            let dis = dist(this.x, this.y, element.x, element.y);
            if (dis < 85) {
                stroke('rgba(255,255,255,0)');
                line(this.x, this.y, element.x, element.y);
            }
        });
    }
}

// an array to add multiple particles
let particles = [];
//
var canvas1; //to place convas behind html
//
var bgmusic; //looping music
//
//audios-
var baby; //soundname
var yo; //audio 2
//
//gifs- 
var babyG;
var yoG;
//
//
var bgloop;
var one;
var two;
var three;
var four;
var five;
var six;
var seven;
var eight;
//
var shootingStar;


//
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function preload() {
    bgmusic = loadSound("citygirlintro.mp3");
    //
    baby = loadSound("dw.mp3")
    yo = loadSound("yo.mp3")

    //
    babyG = loadGif("sm.gif");
    yoG = loadGif("sunsetnoloop.gif")
        //
        //
    bgloop = loadSound("audio/bgloop.mp3");
    one = loadSound("audio/1.mp3");
    two = loadSound("audio/2.mp3");
    three = loadSound("audio/3.mp3");
    four = loadSound("audio/4.mp3");
    five = loadSound("audio/5.mp3");
    six = loadSound("audio/6.mp3");
    seven = loadSound("audio/7.mp3");
    eight = loadSound("audio/8.mp3");



}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight); //initite
    canvas.position(0, 0);
    canvas.style('z-index', '-2');
    //
    bgloop.loop();
    for (let i = 0; i < width / 10; i++) {
        particles.push(new Particle());
    }
    //
    //babyG.resize(400, 400);
    //babyG.delay(30);
    //
    //yoG.position(400, 400);
    //yoG.delay(30); //amount in ms to switch bw frame
    shootingStar = new ShootingStar();

}





//
//noCursor();




function draw() {

    //background
    var color1 = color(25, 20, 82); //gradient upper color
    var color2 = color(33, 72, 130); //gradient lower color
    setGradient(0, 0, windowWidth, windowHeight, color1, color2, "Y");
    //

    //stars
    for (let i = 0; i < particles.length; i++) {
        particles[i].createParticle();
        particles[i].moveParticle();
        particles[i].joinParticles(particles.slice(i));
    }
    //yoG.position(random(50, (windowWidth - 400)), random(50, (windowHeight - 400)));
    //noLoop();

    //gifloop();
    //
    //shootingStar.hide();
    shootingStar.draw();


}


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

function keyPressed() {
    if (keyCode == '65') {
        one.play();
        shootingStar.show();
    }
    if (keyCode == '83') {
        two.play();
    }
    if (keyCode == '68') {
        three.play();
    }
    if (keyCode == '70') {
        four.play();
    }
    if (keyCode == '72') {
        five.play();
    }
    if (keyCode == '74') {
        six.play();
    }
    if (keyCode == '75') {
        seven.play();
    }
    if (keyCode == '76') {
        eight.play();
    }
    //return false;
}


function gifloop() {
    yoG.hide();
}

function ShootingStar() {
    this.x = random(windowWidth - 200);
    this.y = random(windowHeight - 400);
    this.w = 6;
    this.h = 4;
}

ShootingStar.prototype.draw = function() {
    noStroke();
    fill(255, 255, 0);
    ellipse(this.x, this.y, this.w, this.h);
    if (this.h > 0) {
        this.h -= 0.5;
    }
    this.w += 19;
    this.x += 5;
}