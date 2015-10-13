/* Draw all the planets and the earth's moon
The idea is to be as accurate as possible with their orbits,
travel speed, and position

To determine the ellipse of an orbit use Kepler's laws of planetary motion
r = a(1 – e2)/(1 + e cos φ)
r = distance to focus
a = semi-major axis
e = eccentricity
theta = angular position from closest point

// Planet ratios (starting from mercury and moving outward)
1 (m) : 2.41 (v) : 2.54 (e) : 1.34 (m) : 28.4 (j) : 24 (s) : 10.2 (u) : 9.88 (n) : 1/2.18 (p)

velocity = sqrt(G * Msun / r);
G = 6.673 x 10-11 N•m2/kg2
Msun = 1.989 × 10^30 kg

G * M = 1.3272594 x 10^20 N m2 / kg
r = radius
*/

var c;
var header;

var sun;
var mercury;
var venus;
var earth;
var mars;
var jupiter;
var saturn;
var uranus;
var neptune;
var pluto;

var zoomInButton;
var zoomOutButton;
var playButton;
var pauseButton;
var speedSlider;
var resetButton;

var solarSystem;

// Keep track of where the image is panned to
var distancePanned;

var isPlaying;
var dragging;
var clickInCanvas = false;

var aNote;
var bNote;
var cNote;
var dNote;
var eNote
var fNote;
var gNote;
var playPauseImg = [];

var zoomImg = [];

var headerExpanded = false;

function preload() {
  aNote = loadSound("assets/a.wav");
  bNote = loadSound("assets/b.wav");
  cNote = loadSound("assets/c.wav");
  dNote = loadSound("assets/d.wav");
  eNote = loadSound("assets/e.wav");
  fNote = loadSound("assets/f.wav");
  gNote = loadSound("assets/g.wav");
  playPauseImg[0] = loadImage("assets/play.png");
  playPauseImg[1] = loadImage("assets/pause.png");
  zoomImg[0] = loadImage("assets/zoomIn.png");
  zoomImg[1] = loadImage("assets/zoomOut.png");
}

function setup() {
  header = createElement("h1", "Jamie Charry");


  // header.position(windowWidth/2, 0);
  header.class("centerFlex");
  header.mousePressed(expandHeader);

  c = createCanvas(windowWidth, windowHeight);
  c.class("centerFlex");

  c.mousePressed(canvasPressed);
  c.mouseReleased(canvasReleased); // callback to only add lines if clicking inside canvas

  textFont("Futura");

  // state var's
  distancePanned = {
    x: 0,
    y: 0
  };
  isPlaying = true;
  zoomLevel = 1;

  createDOMElements();
  
  createPlanets();

  solarSystem = new SolarSystem();
}



function draw() {

  background(30);
  drawTextAndButtons();
  solarSystem.run();
}

// Function to place text and buttons on the screen
function drawTextAndButtons() {
  // Using distancePanned, translate text in opposite direction to ensure it stays still
  push();
  translate(-distancePanned.x, -distancePanned.y);
  strokeWeight(1);
  // stroke(0,0,255);
  fill(47, 70, 176);
  text("speed", c.width - 100, 190);
  text("zoom", c.width - 100, 90);
  text("click around to make music", 5, 20);
  // image(zoomImg[0], c.width - 100, 100, 30, 30);
  // image(zoomImg[1], c.width - 100, 130, 30, 30);
  pop();
}

// moves position of canvas if header is tapped
function expandHeader() {
  if (!headerExpanded) {
    c.position(0, 200);
    headerExpanded = !headerExpanded;
    updateDOMPositions(0, 200);
  } else {
    c.position(0, 65);
    headerExpanded = !headerExpanded;
    updateDOMPositions(0, 0);
  }
}

function updateDOMPositions(xTrans, yTrans) {
  speedSlider.position(c.width - 140, 280 + yTrans);
  pauseButton.position(c.width / 2 - 15, 120 + yTrans);
  playButton.position(c.width / 2 - 15, 120 + yTrans);
  zoomInButton.position(c.width - 100, 170 + yTrans);
  zoomOutButton.position(c.width - 100, 200 + yTrans);
  resetButton.position(c.width - 60, 55 + yTrans);

}

// State var clickInCavas used to ensure panning doesn't happen when
// clicks start outside of the canvas
function canvasPressed() {
  clickInCanvas = true;
}


function canvasReleased() {
  // Check if the mouse is currently being dragged
  // If not - we can add music lines
  clickInCanvas = false;
  if (!dragging) {
    solarSystem.addMusicLine((mouseX - (c.width / 2) - distancePanned.x), (mouseY - (c.height / 2) - distancePanned.y));
  }
  // reset dragging flag after mouse released
  dragging = false;
}

function windowResized() {
  print(c.width);
  c.width = windowWidth;
  c.height = windowHeight;
  updateDOMPositions(0, 0);

  resizeCanvas(windowWidth, windowHeight);
}

// Pan planets around
function mouseDragged() {

  if (clickInCanvas === true) {
    // Set dragging flag to true to tell mouseReleased() not to add music lines
    dragging = true;

    // if ((mouseX > 1289) && (mouseX < width) && (mouseY > 176) && (mouseY < 223)) {} else {
    var distTraveled = {
      x: -pwinMouseX + winMouseX,
      y: -pwinMouseY + winMouseY
    };
    distancePanned.x += distTraveled.x;
    distancePanned.y += distTraveled.y;
    translate(distTraveled.x, distTraveled.y);
    print(distancePanned);

  }
}


// CREATE ALL DOM ELEMENTS - Run in setup();
function createDOMElements() {
  // DOM ELEMENTS
  speedSlider = createSlider(0.1, 10, 1);
  speedSlider.position(c.width - 140, 280);
  playButton = createImg("assets/play.png");
  pauseButton = createImg("assets/pause.png");
  playButton.position(c.width / 2 - 15, 120);
  playButton.hide();
  pauseButton.position(c.width / 2 - 15, 120);
  playButton.size(40, 40);
  pauseButton.size(40, 40);
  playButton.mousePressed(function() {
    pauseButton.show();
    playButton.hide();
    isPlaying = true;
  });
  pauseButton.mousePressed(function() {
    pauseButton.hide();
    playButton.show();
    isPlaying = false;
  });

  zoomInButton = createImg("assets/zoomIn.png");
  zoomOutButton = createImg("assets/zoomOut.png");
  zoomInButton.position(c.width - 100, 170);
  zoomOutButton.position(c.width - 100, 200);
  zoomInButton.size(30, 30);
  zoomOutButton.size(30, 30);
  zoomInButton.mousePressed(function() {
    if (zoomLevel < 9) {
      zoomLevel++;
    }
  });
  zoomOutButton.mousePressed(function() {
    if (zoomLevel > 1) {
      zoomLevel--;
    }
  });

  resetButton = createP("reset");
  resetButton.position(c.width - 60, 55);
  resetButton.style("font-family", "Futura");
  resetButton.style("font-size", "20px");
  resetButton.style("color", "rgb(47, 70, 176)");
  resetButton.mousePressed(function() {
    solarSystem.resetSystem();
  });
}

// Assign constants to all planets, create all planet objects - run in setup()
function createPlanets() {
  //  1 (m) : 2.41 (v) : 2.54 (e) : 1.34 (m) : 28.4 (j) : 24 (s) : 10.2 (u) : 9.88 (n) : 1/2.18 (p)

  // Create planets with appropriate constants for orbit and size
  mercury = new Planet("mercury", 1, 0, 0.206, 5.79, 2);
  venus = new Planet("venus", 2.41, 0, 0.0068, 10.8, 5.11);
  earth = new Planet("earth", 2.54, 0, 0.0167, 15, 8.3);
  mars = new Planet("mars", 1.34, 0, 0.0934, 22.8, 15.61);
  jupiter = new Planet("jupiter", 28.4, 0, 0.0485, 77.8, 98.05);
  saturn = new Planet("saturn", 24, 0, 0.0556, 143, 244);
  uranus = new Planet("uranus", 10.2, 0, 0.0472, 287, 696);
  neptune = new Planet("neptune", 18, 0, 0.0086, 450, 1360);
  pluto = new Planet("pluto", 0.0022 * 2.54, 0, 0.25, 590, 2048);
}

function Planet(name, size, theta, eccentricity, semiMajorAxis, period) {
  this.name = name; // name var to add special characterstics to specific planets
  this.originalSize = size; // need to preserve original size for scaling
  this.scaledSize = size; // used to scale size with slider
  this.theta = theta; // angular position of the planet
  this.orbitTheta = 0; // track orbit theta differently so I can make it go FASTER
  this.e = eccentricity; // "skew" of the orbital ellipse
  this.a = semiMajorAxis; // distance from center to vertex of ellipse (long ways)
  this.b = this.a * (sqrt(1 - (this.e * this.e))) // semi-minor axis
  this.r = (this.a * (1 - (this.e * this.e))) / (1 + (this.e * cos(this.theta)));

  // translate polar coords into cartesian
  this.x = this.r * cos(this.theta);
  this.y = this.r * sin(this.theta);

  // text location
  this.textLocation = {
    x: this.x + this.scaledSize / 2 + 5,
    y: this.y + 5
  };

  // velocity is proportional to radius from center
  this.velocity = 0.1 / this.r
}

Planet.prototype.update = function() {
  // Loop theta bak to zero once it hits TWO_PI
  if (this.theta > TWO_PI) {
    this.theta = 0;
  }

  // Update theta by angular velocity (and scale based on slider value)
  // Check to see if animation is playing, if not, don't update theta value
  if (isPlaying) {
    this.theta += this.velocity * speedSlider.value();
  } else {
    this.theta += 0;
  }
  this.orbitTheta += 0.5;

  // Use scaled size to account for zooming in and out
  this.scaledSize = this.originalSize * zoomLevel;

  // Calculate r (distance from center) based on Kepler's equation
  this.r = (this.a * zoomLevel * (1 - (this.e * this.e))) / (1 + (this.e * cos(this.theta)));

  // Translate r into cartesian coords to be used for display
  this.x = this.r * cos(this.theta);
  this.y = this.r * sin(this.theta);
  this.textLocation.x = this.x + this.scaledSize / 2 + 5;
  this.textLocation.y = this.y + 5;
}

// Display method to draw planet
Planet.prototype.display = function() {
  // Draw planet
  fill(240);
  ellipse(this.x, this.y, this.scaledSize, this.scaledSize);

  if (this.name === "jupiter") {
    this.textLocation.x = this.x + this.scaledSize / 2 + 10
    noFill();
    ellipse(this.x, this.y, this.scaledSize + 20, this.scaledSize + 20);
    ellipse(this.x, this.y, this.scaledSize + 25, this.scaledSize + 25);
    ellipse(this.x, this.y, this.scaledSize + 30, this.scaledSize + 30);
  }

  //
  fill(240);
  text(this.name, this.textLocation.x, this.textLocation.y);


  // TODO: wanted to add a moon around the earth, eventually
  if (this.name === "earth") {
    // TODO: Add moon
  }
}

// TODO: This method doesn't work very well
// and I'm getting browser errors with p5.sound - something about being readonly!?
// Method to check if ball is overlapping a line
Planet.prototype.checkForMusicLine = function() {
  for (var i = 0; i < solarSystem.musicLines.length; i++) {
    if (this.name == "mercury") {
      print("mercury's Pos: " + this.theta + " music line's theta: " + solarSystem.musicLines[0].theta);
    }
    if (this.theta - solarSystem.musicLines[i].theta < 0.005 && this.theta - solarSystem.musicLines[i].theta > -0.005) {

      // get length of line, link to different note
      var noteToPlay;
      var musicLineLength = solarSystem.musicLines[i].length;
      if (musicLineLength > 540) {
        noteToPlay = fNote;
      } else if (musicLineLength > 450) {
        noteToPlay = eNote;
      } else if (musicLineLength > 360) {
        noteToPlay = gNote;
      } else if (musicLineLength > 270) {
        noteToPlay = cNote;
      } else if (musicLineLength > 180) {
        noteToPlay = dNote;
      } else if (musicLineLength > 90) {
        noteToPlay = aNote;
      } else if (musicLineLength > 0) {
        noteToPlay = bNote;
      }

      // Switch on name to amplify notes played by certain planets
      switch (this.name) {
        case "mercury":
          noteToPlay.setVolume(0.1);
          break;
        case "venus":
          noteToPlay.setVolume(0.2);
          break;
        case "earth":
          noteToPlay.setVolume(0.3);
          break;
        case "mars":
          noteToPlay.setVolume(0.5);
          break;
        case "jupiter":
          noteToPlay.setVolume(0.4);
          break;
        case "saturn":
          noteToPlay.setVolume(0.3);
          break;
        case "uranus":
          noteToPlay.setVolume(0.5);
          break;
        case "neptune":
          noteToPlay.setVolume(0.8);
          break;
        case "pluto":
          noteToPlay.setVolume(0.6);
          break;
      }
      noteToPlay.play();

      // return to ensure that notes don't get played more than they should
      return;
    }
  }
}

function Sun(size) {
  this.size = size;
  this.x = 0;
  this.y = 0;
}

function SolarSystem() {
  this.planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto];
  this.musicLines = [];
  this.sun = new Sun(10);
  this.center = {
    x: 0,
    y: 0
  };
}

SolarSystem.prototype.addMusicLine = function(x, y) {
  this.musicLines.push(new MusicLine(x, y));
}

SolarSystem.prototype.run = function() {
  
  push();
  translate(c.width / 2, c.height / 2);
  for (var i = 0; i < this.planets.length; i++) {
    if (isPlaying) {
      this.planets[i].update();
    }
    this.planets[i].display();
    this.planets[i].checkForMusicLine();
  }

  if (this.musicLines.length !== 0) {
    for (var j = 0; j < this.musicLines.length; j++) {
      this.musicLines[j].display();
    }
  }

  fill(200, 200, 0);
  ellipse(this.sun.x, this.sun.y, this.sun.size, this.sun.size);
  pop();
}

SolarSystem.prototype.resetSystem = function() {
  this.musicLines = [];
  for (var i = 0; i < this.planets.length; i++) {
    this.planets[i].theta = 0;
    this.planets[i].update();
  }
}

function MusicLine(x, y) {
  // TODO: Placement of lines doesn't handle panning properly!!! arg!!!
  this.x = x;
  this.y = y;
  // print("line's starting coords: " + this.x + " and " + this.y);
  this.length = dist(this.x, this.y, 0, 0);

  // atan2 gives values between -PI and PI, so to account for this
  // adjust negative values to be positive and > PI
  this.theta = atan2(this.y, this.x);
  if (this.theta < 0) {
    var tempTheta = this.theta;
    this.theta = TWO_PI + tempTheta
  }
}

MusicLine.prototype.display = function() {
  stroke(120);
  line(this.x, this.y, 0, 0);
}