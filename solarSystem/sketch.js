/* Draw all the planets and the earth's moon
The idea is to be as accurate as possible with their orbits,
travel speed, and position

To determine the ellipse of an orbit use Kepler's laws of planetary motion
r = a(1 – e2)/(1 + e cos φ)
r = distance to focus
a = semi-major axis
e = eccentricity
theta = angular position from closest point

// adding a comment to test branching in github

// Planet ratios (starting from mercury and moving outward)
1 (m) : 2.41 (v) : 2.54 (e) : 1.34 (m) : 28.4 (j) : 24 (s) : 10.2 (u) : 9.88 (n) : 1/2.18 (p)

velocity = sqrt(G * Msun / r);
G = 6.673 x 10-11 N•m2/kg2
Msun = 1.989 × 10^30 kg

G * M = 1.3272594 x 10^20 N m2 / kg
r = radius
*/

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

var zoomIn;
var zoomOut;
// var zoomLevel;
// var pauseButton;

var speedSlider;

var solarSystem;

// Keep track of where the image is panned to
// var distancePanned;

var isPlaying;
var dragging;

// var aNote;
// var bNote;
// var cNote;
// var dNote;
// var eNote
// var fNote;
// var gNote;

var playPauseImg = [];

var zoomImg = [];

function preload() {
  // aNote = loadSound("assets/a.wav");
  // bNote = loadSound("assets/b.wav");
  // cNote = loadSound("assets/c.wav");
  // dNote = loadSound("assets/d.wav");
  // eNote = loadSound("assets/e.wav");
  // fNote = loadSound("assets/f.wav");
  // gNote = loadSound("assets/g.wav");
  playPauseImg[0] = loadImage("assets/play.png");
  playPauseImg[1] = loadImage("assets/pause.png");
  zoomImg[0] = loadImage("assets/zoomIn.png");
  zoomImg[1] = loadImage("assets/zoomOut.png");
}

function setup() {
  createCanvas(1440,900);
  
  textFont("Futura");
  
  // distancePanned = {x: 0, y: 0};
  
  isPlaying = true;
  zoomLevel = 1;
  
  speedSlider = createSlider(0.1,10,1);
  speedSlider.position(1300,190);
  // speedSlider.color(255,255,255);
  
  createPlanets();
  
  solarSystem = new SolarSystem();
}

function draw() {
  
  background(30);

  // Using distancePanned, translate text in opposite direction to ensure it stays still
  push();
  // translate(-distancePanned.x, -distancePanned.y);
  strokeWeight(1);
  // stroke(0,0,255);
  fill(47,70,176);
  text("speed", 1350, 190);
  text("zoom", 1350, 90);
  image(zoomImg[0], 1350, 100, 30, 30);
  image(zoomImg[1], 1350, 130, 30, 30);
  
  textSize(20);
  text("reset", width-56,20)
  
  // set play pause image
  if (isPlaying) {
    // display pause button
    image(playPauseImg[1], width/2-15,120, 50,50);
  } else {
    // display play button
    image(playPauseImg[0], width/2-15,120,50,50);
  }
  pop();
  
  
  // Run the Solar System!
  solarSystem.run();
  
  if (isPlaying) {
    solarSystem.run();
  } else {
    solarSystem.pause();
  }
}

function mouseReleased() {
  // Check if the mouse is currently being dragged
  // If not - we can add music lines
  if (!dragging) {
    
    // mouse locations for buttons!
    if (mouseX > 696 && mouseX < 765 && mouseY > 105 && mouseY < 190) {
      // playPause button
      isPlaying = !isPlaying;
    } else if (mouseX > 1350 && mouseX < 1383 && mouseY > 102 && mouseY < 132) {
      // Zoom in
      if (zoomLevel < 9) {
      zoomLevel++;
      }
    } else if (mouseX > 1350 && mouseX < 1383 && mouseY > 133 && mouseY < 163) {
      // Zoom out
      if (zoomLevel > 1) {
        zoomLevel--;
      }
    } else if (mouseX > width - 70 && mouseX < width && mouseY > 0 && mouseY < 40) {
      // reset button!
      reset();
    } else if (mouseX > 1273 && mouseX < width && mouseY > 59 && mouseY < 233) {
      // white space around buttons pressed - Don't draw line!!!
    } else {
      // didn't hit a button - add a music line
      // solarSystem.addMusicLine((mouseX - (width/2) - distancePanned.x), (mouseY - (height/2) - distancePanned.y));
    }
  }
  // reset dragging flag after mouse released
  dragging = false;

  // This stuff was me trying to figure out how to click on a plnaet and select it
  // It didn't really work out, and I"m abandoning it for now
  /*
  // When the mouse is clicked, determine if a planet was clicked...
  // if so, freeze the 
  for (var i = 0; i < solarSystem.planets.length; i++) {
    
    var planet = solarSystem.planets[i];
    // print("x coords for " + planet.name + " " + planet.x);
    // print(planet.scaledSize);
    var leftSide = planet.x - planet.scaledSize/2;
    var rightSide = planet.x + planet.scaledSize/2;
    if (planet.name == "jupiter") {
      
      // TODO: WHen panned, the planets remain at (0,0) center...the mouse has to do the same!
      print("planet coords for " + planet.name + " " + leftSide + "   " + rightSide);
      print("mouse x: " + ((mouseX - (width/2)) - distancePanned.x) + " and mouseY " + (mouseY - (height/2)));
      print("panned distance: " + distancePanned.x + " " + distancePanned.y);
    }
    // print("planet coords for " + planet.name + " " + leftSide + "    \n   " + rightSide);
    // print("mouse coords " + (mouseX - width/2));
    
    if ((mouseX - width/2 + distancePanned.x) > (planet.x - planet.scaledSize/2) && (mouseX - width/2 + distancePanned.x) < (planet.x + planet.scaledSize/2)) {
      if ((mouseY - height/2 + distancePanned.y) > (planet.y - planet.scaledSize/2) && (mouseY - height/2 + distancePanned.y) < (planet.y + planet.scaledSize/2)); {
        print("planet " + planet.name + " clicked");
        // isPlaying = false;
        
        // var resetButton = createButton("continue");
        // resetButton.size(30,30);
        // resetButton.position(0,0);
        // resetButton.mousePressed(reset);
      }
    }
  }
  */
}

// Pan planets around
// function mouseDragged() {
//   // Set dragging flag to true to tell mouseReleased() not to add music lines
//   dragging = true;
  
//   if ((mouseX > 1289) && (mouseX < width) && (mouseY > 176) && (mouseY < 223)) {
//   } else {
//     var distTraveled = {x: -pwinMouseX + mouseX, y: -pwinMouseY + mouseY};
//     distancePanned.x += distTraveled.x;
//     distancePanned.y += distTraveled.y;
//     translate(distTraveled.x, distTraveled.y);
    
//     // Keep track of center coords of solar system
//     solarSystem.center.x = distancePanned.x;
//     solarSystem.center.y = distancePanned.y;
//   }
// }


function reset() {
  solarSystem.resetSystem();

}

function zoomPageIn() {
  if (zoomLevel < 10) {
    zoomLevel++;
  }
}

function zoomPageOut() {
  if (zoomLevel > 1) {
    zoomLevel--;
  }
}


function createPlanets() {
//  1 (m) : 2.41 (v) : 2.54 (e) : 1.34 (m) : 28.4 (j) : 24 (s) : 10.2 (u) : 9.88 (n) : 1/2.18 (p)

  // Create planets with appropriate constants for orbit and size
  mercury = new Planet("mercury", 1,0,0.206,5.79, 2);
  venus = new Planet("venus", 2.41,0,0.0068,10.8, 5.11);
  earth = new Planet("earth", 2.54,0,0.0167,15, 8.3);
  mars = new Planet("mars", 1.34, 0, 0.0934, 22.8, 15.61);
  jupiter = new Planet("jupiter", 28.4, 0, 0.0485, 77.8, 98.05);
  saturn = new Planet("saturn", 24,0, 0.0556, 143, 244);
  uranus = new Planet("uranus", 10.2,0, 0.0472, 287, 696);
  neptune = new Planet("neptune", 18,0, 0.0086, 450, 1360);
  pluto = new Planet("pluto", 0.0022*2.54, 0, 0.25, 590, 2048);
}

function Planet(name, size, theta, eccentricity, semiMajorAxis, period) {
  this.name = name;         // name var to add special characterstics to specific planets
  this.originalSize = size; // need to preserve original size for scaling
  this.scaledSize = size; // used to scale size with slider
  this.theta = theta;     // angular position of the planet
  this.orbitTheta = 0;  // track orbit theta differently so I can make it go FASTER
  this.e = eccentricity;  // "skew" of the orbital ellipse
  this.a = semiMajorAxis; // distance from center to vertex of ellipse (long ways)
  this.b = this.a*( sqrt( 1-(this.e*this.e) ) ) // semi-minor axis
  this.r = (this.a*(1-(this.e*this.e)))/(1+(this.e*cos(this.theta)));

  // translate polar coords into cartesian
  this.x = this.r*cos(this.theta);
  this.y = this.r*sin(this.theta);
  
  // text location
  this.textLocation = {x: this.x + this.scaledSize/2 + 5, y: this.y + 5};
  
  // velocity is proportional to radius from center
  this.velocity = 0.1/this.r
}

Planet.prototype.update = function() {
    // Loop theta bak to zero once it hits TWO_PI
    if (this.theta > TWO_PI) {
      this.theta = 0;
    }
    
    // Update theta by angular velocity (and scale based on slider value)
    // Check to see if animation is playing, if not, don't update theta value
    if (isPlaying) {
      this.theta += this.velocity*speedSlider.value();
    } else {
      this.theta += 0;
    }
    this.orbitTheta += 0.5;

    // Use scaled size to account for zooming in and out
    this.scaledSize = this.originalSize*zoomLevel;
    
    // Calculate r (distance from center) based on Kepler's equation
    this.r = (this.a*zoomLevel*(1-(this.e*this.e)))/(1+(this.e*cos(this.theta)));
  
    // Translate r into cartesian coords to be used for display
    this.x = this.r*cos(this.theta);
    this.y = this.r*sin(this.theta);
    this.textLocation.x = this.x + this.scaledSize/2 + 5;
    this.textLocation.y = this.y + 5;
}

// Display method to draw planet
Planet.prototype.display = function() {
  // Draw planet
  fill(240);
  ellipse(this.x, this.y, this.scaledSize, this.scaledSize);

  if (this.name === "jupiter") {
    this.textLocation.x = this.x + this.scaledSize/2 + 10
    noFill();
    ellipse(this.x, this.y, this.scaledSize + 20, this.scaledSize + 20);
    ellipse(this.x, this.y, this.scaledSize + 25, this.scaledSize + 25);
    ellipse(this.x, this.y, this.scaledSize + 30, this.scaledSize + 30);
  }
  
  //
  fill(240);
  text(this.name, this.textLocation.x,this.textLocation.y);

  
  // TODO: wanted to add a moon around the earth, eventually
  if (this.name === "earth") {
    // TODO: Add moon
  }
}

// Method to check if ball is overlapping a line
Planet.prototype.checkForMusicLine = function() {
  // for (var i = 0; i < solarSystem.musicLines.length; i++) {
  //   if (this.theta - solarSystem.musicLines[i].theta < 0.005 && this.theta - solarSystem.musicLines[i].theta > -0.005) {
      
  //     // get length of line, link to different note
  //     // var noteToPlay;
  //     // var musicLineLength = solarSystem.musicLines[i].length;
  //     // if (musicLineLength > 540) {
  //     //   noteToPlay = fNote;
  //     // } else if (musicLineLength > 450) {
  //     //   noteToPlay = eNote;
  //     // } else if (musicLineLength > 360) {
  //     //   noteToPlay = gNote;
  //     // } else if (musicLineLength > 270) {
  //     //   noteToPlay = cNote;
  //     // } else if (musicLineLength > 180) {
  //     //   noteToPlay = dNote;
  //     // } else if (musicLineLength > 90) {
  //     //   noteToPlay = aNote;
  //     // } else if (musicLineLength > 0) {
  //     //   noteToPlay = bNote;
  //     // }
      
  //     // Switch on name to amplify notes played by certain planets
  //     switch (this.name) {
  //       case "mercury": 
  //         noteToPlay.setVolume(0.1);
  //         break;
  //       case "venus":
  //         noteToPlay.setVolume(0.2);
  //         break;
  //       case "earth": 
  //         noteToPlay.setVolume(0.3);
  //         break;
  //       case "mars":
  //         noteToPlay.setVolume(0.5);
  //         break;
  //       case "jupiter":
  //         noteToPlay.setVolume(0.4);
  //         break;
  //       case "saturn":
  //         noteToPlay.setVolume(0.3);
  //         break;
  //       case "uranus":
  //         noteToPlay.setVolume(0.5);
  //         break;
  //       case "neptune":
  //         noteToPlay.setVolume(0.8);
  //         break;
  //       case "pluto":
  //         noteToPlay.setVolume(0.6);
  //         break;
  //     }
  //     noteToPlay.play();
      
  //     // return to ensure that notes don't get played more than they should
  //     return;
  //   }
  // }
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
  this.center = {x:0, y:0};
}

SolarSystem.prototype.addMusicLine = function(x,y) {
  this.musicLines.push(new MusicLine(x,y));
}

SolarSystem.prototype.run = function() {
  push();
  translate(width/2, height/2);
  for (var i = 0; i < this.planets.length; i++) {
    this.planets[i].update();
    this.planets[i].display();
    this.planets[i].checkForMusicLine();
  }
  
  if (this.musicLines.length !== 0) {
    for (var j = 0; j < this.musicLines.length; j++) {
      this.musicLines[j].display();
    }
  }
  
  fill(200,200,0);
  ellipse(this.sun.x, this.sun.y, this.sun.size, this.sun.size);
  pop();
}

SolarSystem.prototype.pause = function() {
  push();
  translate(width/2, height/2);
  for (var i = 0; i < this.planets.length; i++) {
    this.planets[i].update();
    this.planets[i].display();
  }
  
  fill(200,200,0);
  ellipse(this.sun.x, this.sun.y, this.sun.size, this.sun.size);
  pop();  
}

SolarSystem.prototype.resetSystem = function() {
  isPlaying = false;
  this.musicLines = [];
  for (var i = 0; i < this.planets.length; i++) {
    this.planets[i].theta = 0;
  }
  isPlaying = true;
}

function MusicLine(x, y) {
  // TODO: Placement of lines doesn't handle panning properly!!! arg!!!
  this.x = x;
  this.y = y;
  print("line's starting coords: " + this.x + " and " + this.y);
  this.length = dist(this.x,this.y,0,0);
  
  // atan2 gives values between -PI and PI, so to account for this
  // adjust negative values to be positive and > PI
  this.theta = atan2(this.y,this.x);
  if (this.theta < 0) {
    var tempTheta = this.theta;
    this.theta = TWO_PI + tempTheta
  }
}

MusicLine.prototype.display = function() {
  stroke(120);
  line(this.x,this.y,0,0);
}

