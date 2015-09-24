var raindrops;
var system;
var person;
var amountOfRainCaught;
var playing;

function setup() {
  createCanvas(600, 480);
  //frameRate (fr); //start refresh at FPS

  // Initialize system object
  bucket = new Bucket;
  system = new System;
  amountOfRainCaught = 0;
  playing = true;

  // Initialize empty raindrops array
  raindrops = [];

}

function draw() {

  background(28, 53, 79);
  stroke(255);
  strokeWeight(0);
  text("Use left and right arrows to move the bucket", width / 2 - 120, height - 20);

  system.run();

  // every few frames, generate another drop
  if (frameCount % 2 === 0) {
    system.addDrop(random(20, width - 20), random(20, 60));
  }
  
  // check for endgame condition
  if (amountOfRainCaught > 40) {
    fill(100);
    rect(0, 0, width, height);
    stroke(255);
    strokeWeight(1);
    fill(255);
    text("YOU SAVED ALL THE CHILDREN", width / 2 - 70, height / 2);
    
    // create Reset button
    fill(0, 0, 40);
    rect(20, 20, 80, 60);
    stroke(255);
    fill(255);
    strokeWeight(0);
    text("reset", 37, 45);
  }
}

// Reset game button
function resetGame() {
  // flip playing flag to false
  playing = !playing
  print(playing);

  // reset amount of rain caught so bucket is empty
  amountOfRainCaught = 0;
}

// If the game is over, check for mouse click inside the reset button
function mousePressed() {
  if (mouseX > 20 && mouseX < 80 && mouseY > 20 && mouseY < 60 && playing === true) {

    // trigger method to reset game
    resetGame();

    // flag to identify if game is currently being played toggled back to true
    playing = !playing;
  }
}

// Update bucket location if either arrow is tapped
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    bucket.position.x -= 10;
    print(bucket.position.x);
  } else if (keyCode === RIGHT_ARROW) {
    bucket.position.x += 10;
  }
  return false;
}

// A simple raindrop class
// We initialize with a position, a random size, and an image which
// looks like a raindrop
function Raindrop(pos) {
  this.position = pos;
  this.size = random(5, 20);
  this.img = loadImage("assets/drop.png");
}

// change height of raindrop
Raindrop.prototype.update = function() {
  this.position.y += 5;
}

// display image of raindrop
Raindrop.prototype.display = function() {
  image(this.img, this.position.x, this.position.y, this.size, this.size);
}

// Check if raindrop hits bottom of screen
Raindrop.prototype.checkEdge = function() {
  if (this.position.y >= height - 20) {
    return true;
  }
}

// check for drop proximity to bucket
// if sufficiently close, add the rain to the bucket
// map the size of the rain drop to a much smaller range to adjust
// the length of the game
// returns true if rain has been added, which is later checked in system.run()
Raindrop.prototype.checkBucket = function() {
  if (dist(this.position.x, this.position.y, bucket.position.x, bucket.position.y - 20) <= 20) {
    var rainToAdd = map(this.size, 5, 20, 0.1, 2);
    amountOfRainCaught += rainToAdd;
    print("added " + rainToAdd + " to bucket.  Total rain captured: " + amountOfRainCaught);
    return true;
  }
}

// A class to interact with the bucket
// only need to give it a position to initialize
// otherwise the pos is updated upon clicking either left or right arrows
function Bucket(pos) {
  this.position = {
    x: width / 2,
    y: height - 100
  };
}

// Display method to draw lines and fill water rect
Bucket.prototype.display = function() {
  stroke(255);
  strokeWeight(3);
  var xOffset = 20;
  var yOffset = 20;
  line(this.position.x - xOffset, this.position.y - yOffset, this.position.x - xOffset, this.position.y + yOffset);
  line(this.position.x - xOffset, this.position.y + yOffset, this.position.x + xOffset, this.position.y + yOffset);
  line(this.position.x + xOffset, this.position.y + yOffset, this.position.x + xOffset, this.position.y - yOffset);

  noStroke();
  rectMode(CORNERS);
  fill(0, 0, 200);
  rect(this.position.x - xOffset + 3, this.position.y + yOffset - 3, this.position.x + xOffset - 3, this.position.y + yOffset - amountOfRainCaught);

}

// System class to contain the drops and bucket
function System() {
  this.raindrops = [];
  this.bucket = bucket;
}

// Simple method to add drop to raindrops array
System.prototype.addDrop = function(x, y) {
  pos = {
    x: x,
    y: y
  };
  raindrops.push(new Raindrop(pos))
}

// Method to run the system.  Iterate through all the raindrops
// and update their position, check their edges, which removes them if they
// get too close to the bottom of the screen, check for proximity to the bucket
// which if triggered adds rain to the bucket.  Then display the drops,
// and display the bucket.
System.prototype.run = function() {
  for (var i = 0; i < raindrops.length; i++) {
    raindrops[i].update();
    if (raindrops[i].checkEdge()) {
      this.removeDrop(i);
    }
    if (raindrops[i].checkBucket()) {
      this.removeDrop(i);
    }
    raindrops[i].display();
  }

  this.bucket.display();
}

// Simple method to remove drops from the array when needed
// index of the drop to be removed is passed to this method
System.prototype.removeDrop = function(index) {
  raindrops.splice(index, 1);
}