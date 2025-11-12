window.addEventListener("keydown", toggle, false);

function toggle(k) {
    if (k.keyCode == "32") {
        $("#key").toggleClass('hidden');
    }
}


p5.disableFriendlyErrors = true

let particles = []; // an array to add multiple particles for stars
let nebula = []; // nebula particles for atmospheric effect
let twinkleStars = []; // twinkling stars

//var canvas1; //to place convas behind html

let osc, playing, freq, amp; //four mouse or touch sound

let ar = 0; //rotating arcs
let time = 0; // for animated effects



//for straight shooting stars
let vibrations = [];
let a = 0;

//audios-
var bgloop; //background loop
var pwk; //percussions //wrist kick
var psd; //string dunk
var pcr; //cracka
var pch; //chaek
var b1; //bass
var b2;
var bs;
var m1; //mids
var m2;
var ms;
var h1; //highs
var h2;
var hs;
var d1; //dono
var d2;

//starsss
let beginX = 40.0; // Initial x-coordinate
let beginY = 40.0; // Initial y-coordinate
let endX = 500.0; // Final x-coordinate
let endY = 200.0; // Final y-coordinate
let distX; // X-axis distance to move
let distY; // Y-axis distance to move
let exponent = 3; // Determines the curve
let x = 0.0; // Current x-coordinate
let y = 0.0; // Current y-coordinate
let step = 0.021; // Size of each step along the path
let pct = 0.0; // Percentage traveled (0.0 to 1.0)



function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function preload() {
    //audios
    bgloop = loadSound("audio/citygirlintro.mp3");
    pwk = loadSound("audio/wk.mp3");
    psd = loadSound("audio/sd.mp3");
    pcr = loadSound("audio/cr.mp3");
    pch = loadSound("audio/ch.mp3");
    b1 = loadSound("audio/b1.mp3");
    b2 = loadSound("audio/b2.mp3");
    bs = loadSound("audio/bs.mp3");
    m1 = loadSound("audio/m1.mp3");
    m2 = loadSound("audio/m2.mp3");
    ms = loadSound("audio/ms.mp3");
    h1 = loadSound("audio/h1.mp3");
    h2 = loadSound("audio/h2.mp3");
    hs = loadSound("audio/hs.mp3");
    d1 = loadSound("audio/d1.mp3");
    d2 = loadSound("audio/d2.mp3");

    //moon

}

function setup() {

    canvas = createCanvas(windowWidth, windowHeight); //initite
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    //oscillator
    canvas.touchMoved(playOscillator);
    canvas.mousePressed(playOscillator);
    //canvas.mouseClicked(playOscillator);
    //canvas.touchStarted(playOscillator);
    osc = new p5.Oscillator('sine');
    angleMode(DEGREES);



    //
    bgloop.loop(); //loop bgmusic
    //enhanced stars
    for (let i = 0; i < 2 * width / 10; i++) {
        particles.push(new Particle());
    }
    
    // Initialize nebula particles
    for (let i = 0; i < 15; i++) {
        nebula.push(new NebulaParticle());
    }
    
    // Initialize twinkling stars
    for (let i = 0; i < 25; i++) {
        twinkleStars.push(new TwinkleParticle());
    }
    
    noStroke();
    distX = endX - beginX;
    distY = endY - beginY;

    //shooting star
    for (let i = 0; i < 2; i++) {
        vibrations.push(new SParticle(random(width), random(height)));
    }
    noCursor();

}

function draw() {
    time += 0.01;

    //enhanced night sky background
    var color1 = color(5, 10, 25); // deeper night blue
    var color2 = color(15, 25, 45); // midnight blue
    var color3 = color(25, 35, 60); // horizon glow
    
    // Create a more complex gradient
    setGradient(0, 0, windowWidth, windowHeight * 0.7, color1, color2, "Y");
    setGradient(0, windowHeight * 0.7, windowWidth, windowHeight * 0.3, color2, color3, "Y");
    
    // Add subtle nebula effect
    drawNebula();

    //enhanced starfield
    for (let i = 0; i < 80; i++) {
        particles[i].createParticle();
        particles[i].moveParticle();
        particles[i].joinParticles(particles.slice(i));
    }
    
    // Draw twinkling stars
    drawTwinklingStars();
    
    // Draw constellation patterns
    drawConstellations();
    //curved stars
    push();
    fill(0, 10);
    rect(0, 0, width, height);
    pct += step;
    if (pct < 1.0) {
        x = beginX + pct * distX;
        y = beginY + pow(pct, exponent) * distY;
    }
    fill(random(200, 255));
    ellipse(x, y, random(1, 3), random(1, 3));
    pop()

    //sound oscillator
    push()
    freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
    amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

    //text('tap to play', 20, 20);
    //text('freq: ' + freq, 20, 40);
    //text('amp: ' + amp, 20, 60);

    if (playing) {
        // smooth the transitions by 0.1 seconds
        osc.freq(freq, 0.1);
        osc.amp(amp, 0.1);
    }
    pop()

    push()
    strokeWeight(0.5);
    stroke(255);
    line(pmouseX, pmouseY, mouseX, mouseY);;
    //ellipse(pmouseX, pmouseY, 1, 1);
    //return false;
    pop();

    push();
    // Update and clean up particles
    for (let i = vibrations.length - 1; i >= 0; i--) {
        vibrations[i].show();
        vibrations[i].update();
        
        // Remove dead particles
        if (vibrations[i].isDead && vibrations[i].isDead()) {
            vibrations.splice(i, 1);
        }
    }
    pop();

    push();
    noStroke();
    fill(255, 255, 255, 255);
    translate(width * 0.2, height * 0.5);
    rotate(frameCount / 20.0);
    nstar(0, 0, 0.5, 5, 4);
    pop();

    push();
    noStroke();
    fill(255, 255, 255, 255);
    rotate(frameCount / 10.0);
    nstar(random(width), random(height), 0.5, 2, 4);
    pop();

    fill(random(200, 255));
    ellipse(x, y, random(1, 3), random(1, 3));


}



function keyPressed() {

    //drumkit first:
    if (keyCode == '81') { //q
        pwk.play();

    }
    if (keyCode == '87') { //w
        pcr.play();

    }
    if (keyCode == '79') { //o
        psd.play();

    }
    if (keyCode == '80') { //p
        pch.play();
    }

    //now the melody riffs:
    //a
    if (keyCode == '65') {
        m1.play();
        // Enhanced teal flash with gradient
        push();
        for (let i = 0; i < 5; i++) {
            fill(92, 255, 209, 50 - i * 8);
            rect(0, 0, width, height);
        }
        pop();
        
        // Multiple particles for richer effect
        for (let i = 0; i < 3; i++) {
            vibrations.push(new AParticle(random(width / 3, 2 * width / 3), random(height / 3, 2 * height / 3)));
        }
    }


    //s
    if (keyCode == '83') {
        h1.play();
        fill(255, 255, 255);
        rect(0, 0, width, height);
        vibrations.push(new SSParticle(width / 2, height / 2));
    }
    //d
    if (keyCode == '68') {
        b1.play();
        fill(219, 255, 245);
        rect(0, 0, width, height);
        vibrations.push(new DParticle(random(0, width), random(0, height)));
        vibrations.push(new DParticle(random(0, width), random(0, height)));
        vibrations.push(new DParticle(random(0, width), random(0, height)));


    }
    //f
    if (keyCode == '70') {
        m2.play();
        fill(252, 168, 255, 200);
        rect(0, 0, width, height);
        fill(255, 244, 36);
        ellipse(50, 50, 5, 5);
        pct = 0.0;
        beginX = random(width / 4, 3 * width / 4);
        beginY = random(80, 160);
        endX = width / 2;
        endY = height + 10;
        distX = endX - beginX;
        distY = endY - beginY;


    }
    //g
    if (keyCode == '71') {
        h2.play();

        push();
        // Enhanced green flash with electric effect
        fill(90, 252, 3, 200);
        rect(0, 0, width, height);
        
        // Electric lightning effect
        stroke(255, 255, 100);
        strokeWeight(3);
        for (let i = 0; i < 5; i++) {
            line(random(width), 0, random(width), height);
            line(0, random(height), width, random(height));
        }
        
        // Glowing orbs
        noStroke();
        for (let i = 0; i < 8; i++) {
            fill(255, 255, 100, 150);
            ellipse(random(100, width - 100), random(100, height - 100), random(20, 60));
        }
        pop();
    }
    //h
    if (keyCode == '72') {
        b2.play();

        push();
        translate(width / 2, height / 2);
        fill(235, 52, 67, 255);
        ellipse(0, 0, 100, 100);
        pop()
        push();
        fill(255, 238, 0, 255);
        ellipse(random(0, width), random(0, height), 50, 50);
        fill(84, 99, 214);
        ellipse(random(0, width), random(0, height), 20, 20);
        fill(230, 69, 208);
        ellipse(random(0, width), random(0, height), 60, 60);
        fill(201, 255, 179);
        ellipse(random(0, width), random(0, height), 70, 70);

        pop();

    }
    //j
    if (keyCode == '74') {
        ms.play();
        fill(255, 249, 69, 255);
        rect(0, 0, width, height);
        push();
        vibrations.push(new SParticle(random(0, 50), random(0, 50)));
        vibrations.push(new SParticle(random(0, 50), random(0, 50)));
        vibrations.push(new SParticle(random(0, 50), random(0, 50)));
        vibrations.push(new SParticle(random(0, 50), random(0, 50)));
        pop();
    }
    //k
    if (keyCode == '75') {
        hs.play();
        fill(138, 255, 245, 255);
        rect(0, 0, width, height);
        vibrations.push(new LParticle(random(width - 100, width), random(0, 150)));
    }
    //l
    if (keyCode == '76') {
        bs.play();
        fill(255, 89, 230, 255);
        rect(0, 0, width, height);
        vibrations.push(new BParticle(random(width / 2, width), random((height / 2), height)));

    }
    //return false;
}

function playOscillator() {
    // starting an oscillator on a user gesture will enable audio
    // in browsers that have a strict autoplay policy.
    // See also: userStartAudio();
    osc.start();
    playing = true;
}

function mouseReleased() {
    // ramp amplitude to 0 over 0.5 seconds
    osc.amp(0, 0.5);
    playing = false;
}



//gradient
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
//objects
function nstar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}
class Particle { // enhanced bg stars
    // setting the co-ordinates, radius and the
    // speed of a particle in both the co-ordinates axes.
    constructor() {
        this.x = random(0, windowWidth);
        this.y = random(0, windowHeight);
        this.r = random(0.5, 3);
        this.xSpeed = random(-0.05, 0.05);
        this.ySpeed = random(-0.05, 0.05);
        this.brightness = random(150, 255);
        this.twinkle = random(0, TWO_PI);
    }

    // creation of a particle.
    createParticle() {
        noStroke();
        // Enhanced star colors with subtle twinkle
        let alpha = 150 + sin(this.twinkle + time * 2) * 50;
        fill(this.brightness, this.brightness - 20, this.brightness + 20, alpha);
        circle(this.x, this.y, this.r);
        this.twinkle += 0.02;
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


class SSParticle {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.history = [];
        this.life = 255;
        this.fadeRate = 3;
    }

    update() {
        this.x = this.x + (4);
        this.y = this.y + (1000);
        this.life -= this.fadeRate;

        let v = createVector(this.x, this.y);
        this.history.push(v);

        if (this.history.length > 8) {
            this.history.splice(0, 1);
        }
    }

    show() {
        if (this.life <= 0) return;
        
        push();
        let alpha = map(this.life, 0, 255, 0, 255);
        
        // Enhanced ripple effect
        stroke(255, 245, 110, alpha * 0.3);
        strokeWeight(0.5);
        noFill();
        
        for (let i = 0; i < 8; i++) {
            let size = (width * 0.1) + i * 15;
            let rippleAlpha = alpha * (1 - i * 0.1);
            stroke(255, 255, 242, rippleAlpha);
            ellipse(this.x, this.y, size, size);
        }
        
        // Central glow
        fill(255, 255, 242, alpha);
        noStroke();
        ellipse(this.x, this.y, 8, 8);
        pop();
    }
    
    isDead() {
        return this.life <= 0;
    }
}


class SParticle {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.history = [];
    }

    update() {
        this.x = this.x + (4);
        this.y = this.y + (1);

        let v = createVector(this.x, this.y);

        this.history.push(v);
        //console.log(this.history.length);

        if (this.history.length > 5) {
            this.history.splice(0, 1);
        }
    }

    show() {
        stroke(255, 245, 110, 50);
        beginShape();
        for (let i = 0; i < this.history.length; i++) {
            let pos = this.history[i];
            noFill();
            vertex(pos.x, pos.y);
            endShape();
        }

        noStroke();
        fill(255, 245, 110);
        ellipse(this.x, this.y, 2, 2);
    }
}
class BParticle {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.history = [];
    }

    update() {
        this.x = this.x + (-4);
        this.y = this.y + (-5);

        let v = createVector(this.x, this.y);

        this.history.push(v);
        //console.log(this.history.length);

        if (this.history.length > 20) {
            this.history.splice(0, 1);
        }
    }

    show() {
        strokeWeight(0.5);
        stroke(255, 153, 253, 100);
        beginShape();
        for (let i = 0; i < this.history.length; i++) {
            let pos = this.history[i];
            noFill();
            vertex(pos.x, pos.y);
            endShape();
        }

        noStroke();
        fill(255, 153, 253, 100);
        ellipse(this.x, this.y, 1, 1);
    }
}
class LParticle {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.history = [];
    }

    update() {
        this.x = this.x + (-4);
        this.y = this.y + (2);

        let v = createVector(this.x, this.y);

        this.history.push(v);
        //console.log(this.history.length);

        if (this.history.length > 40) {
            this.history.splice(0, 1);
        }
    }

    show() {
        stroke(148, 255, 253, 240);
        beginShape();
        for (let i = 0; i < this.history.length; i++) {
            let pos = this.history[i];
            noFill();
            vertex(pos.x, pos.y);
            endShape();
        }

        noStroke();
        fill(148, 255, 253, 240);
        ellipse(this.x, this.y, 1, 1);
    }
}

class AParticle {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.history = [];
    }

    update() {
        this.x = this.x + random(-50, 100);
        this.y = this.y + random(-50, 100);

        let v = createVector(this.x, this.y);

        this.history.push(v);
        //console.log(this.history.length);

        if (this.history.length > 6) {
            this.history.splice(0, 1);
        }
    }

    show() {
        stroke(92, 255, 209);
        strokeWeight(0.5);
        beginShape();
        for (let i = 0; i < this.history.length; i++) {
            let pos = this.history[i];
            noFill();
            vertex(pos.x, pos.y);
            endShape();
        }

        noStroke();
        fill(92, 255, 209);
        ellipse(this.x, this.y, 2, 2);
    }
}

class DParticle {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.history = [];
    }

    update() {
        this.x = this.x + random(-80, 100);
        this.y = this.y + random(-80, 100);

        let v = createVector(this.x, this.y);

        this.history.push(v);
        //console.log(this.history.length);

        if (this.history.length > 6) {
            this.history.splice(0, 1);
        }
    }

    show() {
        stroke(239, 255, 255);
        strokeWeight(0.03);
        beginShape();
        for (let i = 0; i < this.history.length; i++) {
            let pos = this.history[i];
            noFill();
            vertex(pos.x, pos.y);
            endShape();
        }

        noStroke();
        fill(219, 255, 245);
        ellipse(this.x, this.y, 1, 1);
    }
}



class roundtrial {

    show() {
        push();
        translate(width / 2, height / 2);
        noFill();
        stroke(255);
        strokeWeight(0.2);
        rotate(ar);
        for (let i = width - 60; i < width - 30; i = i + 5) {
            arc(0, 0, i, i, i / 100, i / 2);
        }
        ar = ar + 0.001;
        pop();
    }
}

// New particle classes for enhanced night sky
class NebulaParticle {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = random(50, 200);
        this.alpha = random(5, 15);
        this.drift = random(0.1, 0.3);
        this.color = random(['purple', 'blue', 'pink']);
    }
    
    show() {
        push();
        let colors = {
            purple: [80, 20, 120],
            blue: [20, 50, 120], 
            pink: [120, 40, 80]
        };
        let c = colors[this.color];
        fill(c[0], c[1], c[2], this.alpha);
        noStroke();
        ellipse(this.x, this.y, this.size);
        this.x += sin(time * this.drift) * 0.5;
        this.y += cos(time * this.drift) * 0.3;
        pop();
    }
}

class TwinkleParticle {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.brightness = random(200, 255);
        this.twinkleSpeed = random(0.02, 0.08);
        this.phase = random(TWO_PI);
    }
    
    show() {
        push();
        let alpha = 100 + sin(this.phase + time * this.twinkleSpeed) * 155;
        fill(this.brightness, this.brightness - 30, this.brightness, alpha);
        noStroke();
        
        // Create cross-shaped twinkle
        let size = 1 + sin(this.phase + time * this.twinkleSpeed) * 2;
        ellipse(this.x, this.y, size);
        
        // Add sparkle lines
        if (alpha > 200) {
            stroke(255, alpha * 0.8);
            strokeWeight(0.5);
            line(this.x - 3, this.y, this.x + 3, this.y);
            line(this.x, this.y - 3, this.x, this.y + 3);
        }
        pop();
    }
}

// Helper functions for night sky effects
function drawNebula() {
    for (let i = 0; i < nebula.length; i++) {
        nebula[i].show();
    }
}

function drawTwinklingStars() {
    for (let i = 0; i < twinkleStars.length; i++) {
        twinkleStars[i].show();
    }
}

function drawConstellations() {
    // Draw subtle constellation patterns
    push();
    stroke(100, 120, 150, 80);
    strokeWeight(0.5);
    
    // Simple constellation pattern
    let constellationPoints = [
        {x: width * 0.2, y: height * 0.3},
        {x: width * 0.25, y: height * 0.25},
        {x: width * 0.3, y: height * 0.35},
        {x: width * 0.7, y: height * 0.2},
        {x: width * 0.75, y: height * 0.15},
        {x: width * 0.8, y: height * 0.25}
    ];
    
    // Connect some points to form constellation
    for (let i = 0; i < constellationPoints.length - 1; i += 2) {
        if (i + 1 < constellationPoints.length) {
            line(constellationPoints[i].x, constellationPoints[i].y, 
                 constellationPoints[i + 1].x, constellationPoints[i + 1].y);
        }
    }
    pop();
}