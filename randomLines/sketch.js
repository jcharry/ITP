var sprite;
var center;
var newPos;
var slider;

var r;
var g;
var b;
var strokeColor;
var counter;

function setup() {
  createCanvas(900,700);
  // translate(width/2, height/2);
  center = {x:width/2,y:height/2};
  newPos = {x: center.x, y: center.y};
  
  // p5 function to ceate a slider
  // createSlider(minValue, maxValue, startValue)
  slider = createSlider(1,40,10);
  slider.position(10,10); // set position of slider
  

  
  background(100);
  
  fill(230);
  stroke(0);
  strokeWeight(2);
  rect(30,30,840,640);
  
  stroke(255);
  strokeWeight(0);
  text("Click to re-center the squiggly line", 350, 20);
  text("Aggressiveness", 150, 22);
  
  
  r = 28;
  g = 53;
  b = 79;
  counter = 0;
}

function draw() {
  
  // take value from the slider, use value to update randomly created positions
  var value = slider.value();
  newPos.x += random(-value, value); 
  newPos.y += random(-value, value);
  
  // Check if new point is within bounding rect
  if (newPos.x < width - 30 && newPos.x > 30 && newPos.y > 30 && newPos.y < height-30) {

    strokeColor = color(r,g,b);
    stroke(strokeColor);
    strokeWeight(1);
    print(counter);
    // r++; 
    // g++; 
    if (counter > 50) {
      // reset color and counter
      b = 79;
      r = 28;
      counter = 0;
    } else {
      print("counter is not 20!");
      b += 5;
      r += 3;
    }
    counter++;
  
    // Draw line
    line(center.x,center.y,newPos.x,newPos.y);
    
    // Update first point to second point
    center.x = newPos.x;
    center.y = newPos.y;  
    
  }

}

function mousePressed() {
  if (mouseX > 30 && mouseX < width - 30 && mouseY > 30 && mouseY < height - 30) {

    center.x = width/2;
    center.y = height/2;
    newPos.x = center.x;
    newPos.y = center.y;
    
  }



/* DON'T WORRY ABOUT THIS. Unless you want to.
// function Slider(minValue, maxValue, startValue) {
//   this.minValue = minValue;
//   this.maxValue = maxValue;
//   this.startValue = startValue;
//   this.position = null;

// }

// Slider.prototype.setPosition = function(x1,y1) {
//   this.position = {x: x1 , y: y1};
// }

// // Slider.prototype.checkSelection = function() {
// //   if (mouseX > )
// // }

// Slider.prototype.display = function() {
//   if (this.position !== null) {
//     stroke(255);
//     fill(255);
//     line(this.position.x,this.position.y, this.position.x+100, this.position.y);
//     ellipse(this.position.x+this.startValue, this.position.y, 10,10);
//   } else {
//     print("null - position not set by human, set it for them to a default value");
//     this.position = {x:10, y:10};
//   }
// }

// Slider.prototype.moveSlider = function() {
  
// }
*/




}