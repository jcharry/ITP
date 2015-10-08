var xRot;
var yRot;
var planets;
var system;

var song;
var level;

var distancePanned;

function preload() {
  song = loadSound("assets/music.mp3");
}

function setup() {
  createCanvas(1000, 700, WEBGL);
  
  song.play();

  distancePanned = {
    x: 0,
    y: 0
  };
  
  xRot = 0;
  yRot = 0;

  planets = [];
  
  // create planets
  var mercury = new Planet("mercury", 1, 0, 0.206, 5.79, 2);
  var venus = new Planet("venus", 2.41, 0, 0.0068, 10.8, 5.11);
  var earth = new Planet("earth", 2.54, 0, 0.0167, 15, 8.3);
  var mars = new Planet("mars", 1.34, 0, 0.0934, 22.8, 15.61);
  var jupiter = new Planet("jupiter", 28.4, 0, 0.0485, 77.8, 98.05);
  var saturn = new Planet("saturn", 24, 0, 0.0556, 143, 244);
  var uranus = new Planet("uranus", 10.2, 0, 0.0472, 287, 696);
  var neptune = new Planet("neptune", 18, 0, 0.0086, 450, 1360);
  var pluto = new Planet("pluto", 0.0022 * 2.54, 0, 0.25, 590, 2048);

//name, size, theta, eccentricity, semiMajorAxis, period
  planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto];
  for (var i = 0; i < 100; i++) {
    planets.push(new Planet("name", random(1,30), map(random(0,100), 0,100,0,TWO_PI), 0, random(10, 250), 1));
  }
  
  system = new System(planets);
}



function draw() {

  background(100);
  orbitControl();
  level = map(song.getLevel(), 0, 0.2, 1, 300);
  // print(level);
  for (var i = 0; i < planets.length; i++) {
    system.planets[i].update();
    system.planets[i].display();
  }
}

function mousePressed() {
  startOfClick = {x: mouseX, y: mouseY}
}

function mouseDragged() {
  distancePanned.x = startOfClick.x - mouseX;
  distancePanned.y = startOfClick.y - mouseY;
}

function Planet(name, size, theta, eccentricity, semiMajorAxis, period) {
  this.name = name;
  this.theta = 0;
  this.phi = PI;
  this.size = size;
  this.a = semiMajorAxis;
  this.e = eccentricity;
  this.t = period;
  this.r = (this.a * (1 - (this.e * this.e))) / (1 + (this.e * cos(this.phi)));
  this.x = this.r * cos(this.phi);
  this.z = 5*this.r*sin(this.theta);

  this.speed = 0.5 / this.r;
  
  this.oscDir = 0;
  var rand = random(0,1);
  print(rand)
  if ( rand < 0.5) {
    this.oscDir = -1;
  } else {
    this.oscDir = 1;
  }

  this.display = function() {
    normalMaterial();
    push();
    // y value : cos(this.theta)*this.r
    translate(this.x, random(-1,1)*level, this.z);
    // rotateX(xRot * 0.01);
    // rotateY(yRot * 0.01);
    sphere(this.size, 30);
    pop();
  }

  this.update = function() {

    // ensure theta stays between 0 and 2PI
    if (this.phi > TWO_PI) {
      this.phi = 0;
    }

    // update theta, recalculate r - recalculat x and y
    this.phi += this.speed;
    this.r = 10*(this.a * (1 - (this.e * this.e))) / (1 + (this.e * cos(this.phi)));
    this.x = this.r * cos(this.phi);
    this.z = sin(this.phi) * this.r;
  }
}



function System(planets) {
  this.planets = planets;
  
}