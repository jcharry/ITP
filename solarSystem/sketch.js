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
  var planetClicked = false;
  if (!dragging) {
    
    // check to see if a planet was clicked
    // Iterate through all planets, get distance from mouse click to planet
    // if it's within planet radius (planet.scaledSize), then we have a planet!
    for (var i = 0; i < solarSystem.planets.length; i++) {
      var planet = solarSystem.planets[i];
      if (dist((mouseX - (c.width / 2) - distancePanned.x), (mouseY - (c.height / 2) - distancePanned.y), planet.x, planet.y) < planet.scaledSize) {
        print(planet.name + ' clicked');
        planetClicked = true;
      }
    }
    
    // Only place a music line if we didnt' click a line
    if (!planetClicked) {
      solarSystem.addMusicLine((mouseX - (c.width / 2) - distancePanned.x), (mouseY - (c.height / 2) - distancePanned.y));
    }
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