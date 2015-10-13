var c;
var h;
var s;
var b;

var stateToShow;
var distanceDragged;
var startCoords;
var newCoords;


function setup() {

  frameRate(20);
  var p1 = createP("select a drawing");
  p1.id("instructionText");
  var p2 = createP("click and drag to change saturation and brightness");
  p2.id("cornerText");

  h = 0;
  s = 100;
  b = 100;

  distancePanned = {
    x: 300,
    y: 300
  };
  startCoords = {
    x: 0,
    y: 0
  };

  createButtons();

  stateToShow = "";

  c = createCanvas(windowWidth, windowHeight);
  // c.position(0, 40);
  // c.mouseOver()

  colorMode(HSB, 360, 100, 100, 1);
  rectMode(CENTER);
}

function draw() {
  background(0);

  switch (stateToShow) {
    case "flower":
      flower();
      break;
    case "coneOfHues":
      coneOfHues();
      break;
    case "mutedFlower":
      mutedFlower();
      break;
    case "randomRects":
      randomRects();
      break;
    case "triangles":
      triangles();
      break;
    case "snakingLines":
      snakingLines();
      break;
    case "pyramids":
      pyramids();
      break;
  }
}

function windowResized() {
  h1 = 0;
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  startCoords = {
    x: mouseX,
    y: mouseY
  };
}

function mouseDragged() {
  // on drag, get new coords, update old coords to new coords, keep track of distance
  // Because we're not drawing, pwinMouse has no value, since there's no
  // previous "frame"
  newCoords = {
    x: mouseX,
    y: mouseY
  };
  var distTraveled = {
    x: newCoords.x - startCoords.x,
    y: newCoords.y - startCoords.y
  };
  distancePanned.x += distTraveled.x;
  distancePanned.y += distTraveled.y;

  startCoords = newCoords;

  if (distancePanned.x >= 600) {
    distancePanned.x = 600;
  } else if (distancePanned.x <= 0) {
    distancePanned.x = 0;
  }

  if (distancePanned.y >= 600) {
    distancePanned.y = 600;
  } else if (distancePanned.y <= 0) {
    distancePanned.y = 0;
  }
}

/*
 *
 *
 * DRAWINGS
 *
 */
function coneOfHues() {
  push();
  translate(width / 2 - 100, height / 2 - 100);
  for (var i = 0; i < 360; i++) {
    push();
    // rotate(i);
    translate(i, i);
    fill(h, map(distancePanned.x, 0, 600, 0, 100), map(distancePanned.y, 0, 600, 0, 100), 0.5);
    stroke(0, 0, 0, 0.3);
    rect(0, 0, 500 - i, 360 - i);
    if (h == 360) {
      h = 0;
      i
    }
    h++
    pop();
  }
  pop();
}

function flower() {

  push();
  translate(width / 2, height / 2);
  for (var i = 0; i < 360; i++) {
    push();
    rotate(i * 10);

    fill(h, map(distancePanned.x, 0, 600, 0, 100), map(distancePanned.y, 0, 600, 0, 100), 0.3);
    noStroke();
    stroke(0, 0, 0, 0.1);
    rect(0, 0, 720 - i * 2, 720 - i * 2);
    if (h == 360) {
      h = 0;
    }
    h++
    pop();
  }
  pop();
}

// Rotating squares
// rotating by i, then translating away from center by i each time! cool!
function mutedFlower() {
  push();
  translate(windowWidth / 2, windowHeight / 2);
  for (var i = 0; i < 360; i++) {
    push();
    rotate(i);
    translate(i, i);
    fill(h, map(distancePanned.x, 0, 600, 0, 100), map(distancePanned.y, 0, 600, 0, 100), 0.3);
    rect(0, 0, 360 - i, 360 - i);
    if (h == 360) {
      h = 0;
    }
    h++
    pop();
  }
  pop();
}

function randomRects() {
  push();
  translate(windowWidth / 2, windowHeight / 2);
  for (var i = 0; i < 360; i++) {
    push();

    translate(random(-200, 200), random(-100, 100));
    rotate(random(0, TWO_PI));

    fill(h, map(distancePanned.x, 0, 600, 0, 100), map(distancePanned.y, 0, 600, 0, 100), 0.3);
    stroke(0, 0, 0, 0.3)
    rect(0, 0, 360 - i, 360 - i);
    if (h == 360) {
      h = 0;
    }
    h++
    pop();
  }
}

function triangles() {
  push();
  translate(windowWidth / 2 - 400, windowHeight / 2);
  for (var i = 0; i < 720; i++) {
    push();

    translate(i, 0);
    rotate(i * 3);

    // fill(h, map(distancePanned.x, 0, 600, 0, 100), map(distancePanned.y, 0, 600, 0, 100), 0.3);
    stroke(h, map(distancePanned.x, 0, 600, 0, 100), map(distancePanned.y, 0, 600, 0, 100), 0.3)
    triangle(-30, -30, +30, +30, i, i);
    if (h == 360) {
      h = 0;
    }
    h += 0.5
    pop();
  }
}

function snakingLines() {
  push();
  translate(windowWidth / 2 - 400, windowHeight / 2);


  for (var i = 0; i < 720; i++) {
    push();

    translate(1 * 0.5, 0);
    // rotate(i*3);
    rotate(10 / i * 200);

    // fill(h, map(distancePanned.x, 0, 600, 0, 100), map(distancePanned.y, 0, 600, 0, 100), 0.3);
    stroke(i, map(distancePanned.x, 0, 600, 0, 100), map(distancePanned.y, 0, 600, 0, 100), 0.5)
    strokeWeight(1);
    line(i - 30, i - 30, i + 30, i + 30);
    // ellipse(0, 0, 360 - i, 360 - i);
    // if (h == 360) {
    //   h = 0;
    // }
    // h++
    pop();
  }
}

function pyramids() {
  push();
  translate(windowWidth / 2, windowHeight / 2);

  for (var i = 0; i < 360; i++) {
    push();
    // rotate(i);
    translate(i * 20);

    fill(h, map(distancePanned.x, 0, 600, 0, 100), map(distancePanned.y, 0, 600, 0, 100), 0.3);
    stroke(0, 0, 0, 0.3)
    rect(0, 0, 360 - i * 3, 360 - i);
    if (h == 360) {
      h = 0;
    }
    h++
    pop();
  }
}
/* 
 *
 * CREATE BUTTONS
 *
 */
function createButtons() {
  rectangleButton = createButton("psychadelic flower");
  // rectangleButton.position(70, 10);
  rectangleButton.class("button");
  rectangleButton.mousePressed(function() {
    // h = 0;
    stateToShow = "flower";
  });

  coneButton = createButton("cone");
  // coneButton.position(300, 10);
  coneButton.class("button");

  coneButton.mousePressed(function() {
    // h = 0;
    stateToShow = "coneOfHues";
  });

  mutedFlowerButton = createButton("muted flower");
  // mutedFlowerButton.position(200, 10);
  mutedFlowerButton.class("button");

  mutedFlowerButton.mousePressed(function() {
    // h = 0;
    stateToShow = "mutedFlower";
  });

  randomRectsButton = createButton("rectangles");
  // randomRectsButton.position(400, 10);
  randomRectsButton.class("button");

  randomRectsButton.mousePressed(function() {
    // h = 0;
    stateToShow = "randomRects";
  });

  triangleButton = createButton("triangles");
  // triangleButton.position(500, 10);
  triangleButton.class("button");

  triangleButton.mousePressed(function() {
    // h = 0;
    stateToShow = "triangles";
  });

  linesButton = createButton("snaking lines");
  // linesButton.position(600, 10);
  linesButton.class("button");

  linesButton.mousePressed(function() {
    // h = 0;
    stateToShow = "snakingLines";
  });

  pyramidButton = createButton("pyramids");
  // pyramidButton.position(700, 10);
  pyramidButton.class("button");

  pyramidButton.mousePressed(function() {
    stateToShow = "pyramids";
  });

}