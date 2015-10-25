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
    // print('jupiter\'s x: ' + this.x + 'jupiter\'s y: ' + this.y);
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
    if (this.theta - solarSystem.musicLines[i].theta < 0.005 && this.theta - solarSystem.musicLines[i].theta > -0.005) {
      if (!solarSystem.musicLines[i].note.isPlaying()) {
        solarSystem.musicLines[i].note.play();
      }
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
    // if (isPlaying) {
    this.planets[i].update();
    // }
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
  this.x = x;
  this.y = y;
  this.length = dist(this.x, this.y, 0, 0);
  this.volume = 0.1;

  if (this.length > 540) {
    this.note = gNote;
  } else if (this.length > 450) {
    this.note = fNote;
  } else if (this.length > 360) {
    this.note = eNote;
  } else if (this.length > 270) {
    this.note = dNote;
  } else if (this.length > 180) {
    this.note = cNote;
  } else if (this.length > 90) {
    this.note = bNote;
  } else if (this.length > 0) {
    this.note = aNote;
  }

  this.note.setVolume(this.volume);

  // atan2 gives values between -PI and PI, so to account for this
  // adjust negative values to be positive and > PI
  this.theta = atan2(this.y, this.x);
  if (this.theta < 0) {
    this.theta = TWO_PI + this.theta;
  }
}

MusicLine.prototype.display = function() {
  stroke(120);
  line(this.x, this.y, 0, 0);
}