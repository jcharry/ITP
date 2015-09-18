/*
Create a portrait of your neighbor. 
Use only 2D primitive shapes – arc(), curve(), ellipse(), 
line(), point(), quad(), rect(), triangle()

and basic color functions – background(), colorMode(), 
fill(), noFill(), noStroke(), stroke(). 

Remember to use createCanvas() to specify the dimensions of your canvas.
*/

var img;
var mySound = new buzz.sound("assets/banjo.mp3");

var imageHeight = 639;
var imageWidth = 488;

var skinColor;
var bodyColor;
var pantsColor;
var banjoNeckColor;
var banjoHeadColor;
var banjoBodyColor;
var noseColor;
var mouthColor;
var hairColor;
var couchColor;
var blackColor;
var whiteColor;

var clockText = ["XII", "I", "II", "III", "VI", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

function setup() {
  createCanvas(imageWidth * 2, imageHeight); // Equals height of image and twice width of image
  fill(105, 11, 25, 255);
  rect(0, 0, 488, 639);

  // set all relevant color vars
  skinColor = color(216, 162, 160);
  pantsColor = color(17, 23, 37);
  bodyColor = color(126, 135, 169);
  banjoNeckColor = color(123, 110, 120);
  banjoHeadColor = color(209, 196, 162);
  banjoBodyColor = color(70, 74, 99);
  couchColor = color(90, 83, 75)
  noseColor = color(203, 143, 145);
  mouthColor = color(184, 115, 133);
  hairColor = color(222, 188, 153);

  // Standard colors
  blackColor = color(0, 0, 0);
  whiteColor = color(255, 255, 255);

  img = loadImage("assets/img.jpg");
  image(img, 488, 0);

}

/* Question: When draw runs, does it redraw on top of whatever is already drawn?
  Or does it smartly clear objects from memory once they're no longer visible?  
  If objects are just drawn over one another, 
  couldn't this lead to memory issues as the animation continues?
  If we just continue to draw over and over, eventually the program will have so many
  objects in memory that it may compromise performance.  
  */

function draw() {

  // Couch
  fill(couchColor);
  quad(203, 397, 99, 482, 94, 637, 485, 636);
  triangle(204, 396, 488, 415, 486, 636);
  line(238, 429, 169, 501);
  line(169, 501, 160, 634);
  line(209, 514, 485, 538);
  line(169, 569, 361, 583);
  line(361, 583, 362, 532);
  line(361, 583, 486, 594);

  // Body rect
  fill(bodyColor);
  rect(142, 254, 102, 173);

  // Legs
  fill(pantsColor);
  quad(245, 429, 202, 634, 180, 634, 190, 430);
  quad(184, 481, 148, 572, 128, 576, 143, 481);
  quad(128, 575, 125, 639, 140, 639, 149, 573);

  // Banjo body ellipses
  fill(banjoBodyColor);
  ellipse(166, 428, 110, 110);
  fill(whiteColor);
  ellipse(166, 428, 100, 100);

  // Arms
  /* If I wanted to fill the arm more precisely, I could use this...
  beginShape()
  fill(skinColor)
  vertex(158,429);
  vertex(92,354);
  vertex(114,297);
  vertex(137,315);
  vertex(116,348);
  vertex(179,414);
  vertex(179,414);
  endShape(CLOSE) 
  */
  // But to remain faithful to the constraints...I can use quad()
  stroke(skinColor);
  strokeWeight(1);
  fill(skinColor);
  quad(158, 420, 97, 354, 116, 348, 179, 414);
  quad(97, 354, 120, 297, 137, 315, 116, 348);
  quad(250, 316, 270, 300, 280, 365, 262, 374);
  quad(280, 365, 307, 341, 302, 336, 273, 359);

  // Lines for neck of banjo
  stroke(banjoNeckColor);
  strokeWeight(1);
  fill(banjoNeckColor);
  quad(201, 391, 353, 284, 360, 292, 211, 405);

  // Head of banjo
  stroke(banjoHeadColor);
  fill(banjoHeadColor);
  quad(362, 295, 380, 290, 360, 264, 355, 284);
  quad(380, 290, 396, 267, 381, 261, 360, 264);

  // Hand covering neck
  stroke(skinColor);
  strokeWeight(1);
  fill(skinColor);
  quad(309, 343, 318, 323, 312, 317, 303, 338);

  // Sleeves
  stroke(blackColor);
  strokeWeight(1);
  fill(bodyColor);
  quad(112, 293, 142, 254, 143, 310, 139, 318);
  quad(244, 318, 244, 254, 265, 270, 276, 300);

  // Face ellipse
  noStroke()
  fill(skinColor);
  ellipse(193, 236, 60, 80);

  // Eyes
  stroke(0, 0, 0, 150);
  strokeWeight(2);
  arc(207, 230, 13, 13, .8, PI - .5);
  arc(183, 230, 13, 13, .8, PI - .5);

  // Nose
  stroke(noseColor);
  triangle(193, 243, 190, 253, 194, 251);

  // Mouth
  stroke(mouthColor);
  arc(193, 263, 25, 12, 0 - .3, PI + .3);
  arc(193, 259, 20, 8, 0, PI);

  // Hair arcs
  fill(hairColor);
  arc(212, 201, 44, 44, HALF_PI - .5, PI + .2);
  arc(180, 198, 35, 50, 0, PI - .8);

  // Draw lines for the hair
  for (var i = 0; i < 10; i++) {
    stroke(hairColor);
    strokeWeight(1);
    line(161 + i, 205 - i / 2, 161 + i, 262 - i)
    line(222 + i, 220 - i, 222 + i, 253 + i)
  }

  // Remove stroke from lines
  noStroke()

  // Draw arc for top of head connecting ends points of hair lines
  arc(197, 211, 70, 30, PI, .3);

  // Clock ellipses
  fill(16, 16, 18);
  ellipse(335, 103, 127, 127);
  fill(118, 117, 95);
  ellipse(335, 103, 117, 117);

  // Clock hands
  stroke(0, 0, 0);
  strokeWeight(3);
  line(347, 117, 317, 76);
  line(346, 97, 305, 130);

  // add clock text
  // circle is at center (355,103), rad = 117/2
  // translate coords to center of circle
  var arclength = 0;
  var r = 97 / 2;
  
  // total circle arc is r*2PI.  So break into 12 equal lengths.
  var arcDistanceBetweenChars = r * 2 * PI / 12;

  // Saves translations which can later be removed with pop()
  push();
  translate(329, 106);
  stroke(blackColor);
  strokeWeight(1);
  noFill();
  // ellipse(0, 0, r * 2, r * 2);
  for (var j = 0; j < 12; j++) {
    // transform text postion based on iteration #
    // We do so by translating to polar coords
    // and setting the new origin of the window
    // to the current position along the circle
    // we update arclength to keep track of where we are
    
    // theta is used to translate to polar coords
    var theta = 3*PI/2 + arclength / r;

    // Update origin to be at the location of the proper polar coords
    push();
    // x = rcos(theta) and y = rsin(theta).  Yay math!
    translate(r * cos(theta), r * sin(theta));
    // place the clock text at the new origin
    text(clockText[j], 0, 0);
    pop();

    // Update arclength to new position
    arclength += arcDistanceBetweenChars;

  }
  // translate back to origin (remove all drawing styles)
  pop();



  // Display image & play song if mouse is tapped
  noStroke()
  if (mouseIsPressed) {
    image(img, 488, 0);
    mySound.play()

  } else {
    mySound.pause()
    fill(255, 255, 255);
    rect(488, 0, 488, 639);
    fill(0, 0, 0);
    text("Click!", 536, 56);
  }

}

function mousePressed() {
  print(mouseX)
  print(mouseY)
}