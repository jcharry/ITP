var ship;
var asteroids;
var system;

function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);

  // create system
  system = new System();
  system.ship = new Ship();
  for (var i = 0; i < 20; i++) {
    system.asteroids.push(new Asteroid({
      x: random(10, width - 10),
      y: random(10, height - 10)
    }))
  }

  print(system.asteroids);
}

function draw() {
  background(230);
  system.draw();

}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      system.ship.turn("left");
      print("left");
    case RIGHT_ARROW:
      system.ship.turn("right");
  }
}

function System() {
  this.ship;
  this.asteroids = [];

  this.draw = function() {
    this.ship.draw();
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw();
    }

  }
}

function Ship() {
  this.position = {
    x: width / 2,
    y: height / 2
  };
  this.velocity = {
    x: 0,
    y: 0
  };
  this.laserBeams = [];

  this.fire = function() {
    print("fired");
  }

  this.draw = function() {
    fill(100);
    beginShape();
    vertex(this.position.x + 10, this.position.y);
    vertex(this.position.x, this.position.y - 10);
    vertex(this.position.x - 10, this.position.y);
    endShape();
  }

  this.update = function() {

  }

  this.turn = function(dir) {
    if (dir === "left") {
      push();
      rotate(3);
      pop();
    } else if (dir === "right") {
      rotate(1);
    }
  }
}


function LaserBeam(pos, dir) {
  this.length = 10;
  this.position = {
    x: pos.x,
    y: pos.y
  };
  this.velocity = {
    x: dir.x,
    y: dir.y
  };
}

function Asteroid(pos) {
  this.position = {
    x: pos.x,
    y: pos.y
  };
  this.velocity = {
    x: 0,
    y: 0
  };

  this.draw = function() {
    fill(155);
    ellipse(this.position.x, this.position.y, 10, 10);
  }
}