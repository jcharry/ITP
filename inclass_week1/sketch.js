var firstX = 0;
var firstY = 0;
var secondX = 0;
var secondY = 0;
var mouseCounter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() { // Called 60 times per sec

  //Stroke testing?
  // stroke(50,100,20,1)
  // stroke(200,200,200);
  // strokeWeight(4);
  // ellipse(100,200,100,200);
  // line(20,20,80,80);
  // rect(random(200),random(300), 20, 20)
  // rect(0,0,windowWidth, windowHeight)

  // Draws lines if you press the mouse!
  // if (mouseCounter == 0) {
  //   if (mouseIsPressed) {
  //     firstX = mouseX;
  //     firstY = mouseY;
  //     mouseCounter = 1;
  //     console.log(mouseCounter)
  //     // line(mouseX,mouseY,mouseX+50,mouseY-50);
  //   }
  // } else if (mouseCounter == 1) {
  //   if (mouseIsPressed) {
  //     secondY = mouseY;
  //     secondX = mouseX;
  //     line(firstX,firstY,secondX,secondY);
  //     mouseCounter = 0;
  //   }
  // }
}

function mousePressed() {
  print("mouse pressed")
  if (mouseCounter == 0) {
    firstX = mouseX;
    firstY = mouseY;
    mouseCounter = 1;
    print(mouseCounter)
  } else if (mouseCounter == 1) {
    secondX = mouseX;
    secondY = mouseY;
    mouseCounter = 0;
    line(firstX, firstY, secondX, secondY);
    print(mouseCounter);
  }
}

var rectWidth = 20;
var rectHeight = windowHeight;
function mouseDragged() {
  print(rectWidth)
  var c = color(random(255), random(255), random(255), 35);
  fill(c);
  rect(mouseX - rectWidth/2, 0, rectWidth, windowHeight);
}
