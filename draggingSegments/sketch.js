var x = [0,0,0,0,0,0];
var y = [0,0,0,0,0,0];
var segLength = 30;

function setup() {
  createCanvas(600,400);
  
  strokeWeight(10);
  stroke(255,100);
}

function draw() {
  background(0);
  
  dragSegment(0, mouseX, mouseY);
  for (var i = 1; i < x.length-1; i++) {
    dragSegment(i,x[i-1],y[i-1]);
  }
  
  dragSegment(x.length-1,x[x.length-2],y[x.length-2]);
  // dragSegment(1, x[0], y[0]);
  
}

var dragSegment = function(i, xin, yin) {
  var dx = xin - x[i];
  var dy = yin - y[i];
  var angle = atan2(dy,dx);
  x[i] = xin - cos(angle)*segLength;
  y[i] = yin - sin(angle)*segLength;
  
  segment(x[i],y[i],angle);
}

function segment(x,y,a) {
  push();
  translate(x,y);
  rotate(a);
  line(0,0, segLength, 0);
  pop();
}