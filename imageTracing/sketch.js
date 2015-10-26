var img;
var shouldDraw;
capture;

function preload() {
  img = loadImage("assets/catdog.jpg")
}

function setup() {
  createCanvas(1440, 900);
  image(img, 0, 40);
  loadPixels();
  
  capture = createCapture(VIDEO);
  capture.size(1300,900);

  shouldDraw = false;
}

function draw() {
  
  // image(capture,0,40,1300,900);
  
  print(img.get(700,400));

  // Noise button
  fill(100);
  strokeWeight(1);
  stroke(0);
  rect(0, 0, 80, 40); // Noise button
  rect(1400 - 80, 0, 80, 40); // Reset button
  rect(80, 0, 80, 40); // Pink-i-fy button
  rect(160, 0, 80, 40); // Threshold button
  stroke(255);
  strokeWeight(0);
  fill(255);
  text("noise", 25, 25);
  text("pinkify", 105, 25);
  text("reset", 1400 - 50, 25);
  text("threshold", 175, 25);

  checkMouse();

  if (shouldDraw) {
    
    var x1 = width/2;
    var y1 = height/2;
    print(img.get(x1,y1));
    
    // look at the nearest 9 pixels, pick the direction in which the pixel
    // color has the greatest difference, then draw a line
    for (var i = 0; i < 9; i++) {
      // print(img.get(x1,y1));
    }
    
    
    var d = pixelDensity;
    for (var i = 0; i < d; i++) {
      for (var j = 0; j < d; j++) {
        
      }
    }
  }
}

function checkMouse() {

  // Noise button
  if (mouseX >= 0 && mouseX < 80 && mouseY >= 0 && mouseY < 40) {
    // Noise button
    // Highlight square
    fill(60, 60, 100, 255);
    rect(0, 0, 80, 40);
    stroke(255);
    strokeWeight(0);
    fill(255);
    text("noise", 25, 25);

    if (mouseIsPressed) {
      print("clicked");
      noiseFilter();
    }
  }

  if (mouseX > 1320 && mouseX < 1400 && mouseY >= 0 && mouseY <= 40) {
    fill(60, 60, 100, 255);
    rect(1320, 0, 80, 40);
    stroke(255);
    strokeWeight(0);
    fill(255);
    text("reset", 1350, 25);

    if (mouseIsPressed) {
      reset();
    }
  }

  if (mouseX > 80 && mouseX < 160 && mouseY >= 0 && mouseY <= 40) {
    if (mouseIsPressed) {
      pinkify();
    }
  }

  if (mouseX > 160 && mouseX < 220 && mouseY >= 0 && mouseY <= 40) {
    if (mouseIsPressed) {
      threshold();
    }
  }

  if (mouseX > 220 && mouseX < 280 && mouseY >= 0 && mouseY <= 40) {
    if (mouseIsPressed) {
      shouldDraw = true;
    } else {
      shouldDraw = false;
    }
  }

}

function threshold() {
  filter(THRESHOLD);
}

function noiseFilter() {
  for (var i = 0; i < pixels.length; i += 4) {
    pixels[i] = pixels[i] + random(-20, 20);
    pixels[i + 1] = pixels[i + 1] + random(-20, 20);
    pixels[i + 2] = pixels[i + 2] + random(-20, 20);
    pixels[i + 3] = pixels[i + 3] + random(-200, -100);
  }
  updatePixels();
}

function pinkify() {
  var d = pixelDensity
  for (var i = 0; i < pixels.length; i += 4) {
    pixels[i] = pixels[i] + 50;
    pixels[i + 1] = pixels[i + 1] - 30;
    pixels[i + 2] = pixels[i + 2] + 10;
    // pixels[i+3] = pixels[i+3] + random(-200,-100);
  }
  updatePixels();
}

function reset() {
  clear();
  image(img, 0, 40);
  loadPixels();
}