var redDiv, blueDiv, greenDiv, c;

var divClicked;

// object to easily access divs
var divs = {
  red: redDiv,
  blue: blueDiv,
  green: greenDiv
};

function setup() {
  colorMode(HSB);

  c = createCanvas(800, 600);
  // c.parent('canvasContainer');
  c.id('c');
  c.position(100, 0);

  redDiv = createDiv('');
  blueDiv = createDiv('');
  greenDiv = createDiv('');

  redDiv.class('draggable');
  blueDiv.class('draggable');
  greenDiv.class('draggable');

  // redDiv.parent('colorContainer');
  // blueDiv.parent('colorContainer');
  // greenDiv.parent('colorContainer');

  // set positions:
  redDiv.position(0, 0);
  blueDiv.position(0, 200);
  greenDiv.position(0, 100);

  // Register callbacks
  redDiv.mousePressed(function() {
    divClicked = 'red';
  });
  blueDiv.mousePressed(function() {
    divClicked = 'blue';
  });
  greenDiv.mousePressed(function() {
    divClicked = 'green';
  });
  redDiv.style('background-color', 'red');
  blueDiv.style('background-color', 'blue');
  greenDiv.style('background-color', 'green');

  var p = createP("drag and drop colors onto canvas");
  p.position(10, 300);
  p.size(85, 80);

  p = createP("click on a square on the canvas to change it's hue");
  p.position(10, 400);
  p.size(85, 115);

}

function mouseDragged() {
  switch (divClicked) {
    case 'red':
      dragDiv(redDiv);
      break;
    case 'blue':
      dragDiv(blueDiv);
      break;
    case 'green':
      dragDiv(greenDiv);
      break;
  }
}

function dragDiv(d) {
  d.position(mouseX + 50, mouseY - 50);
  // d.clientY = mouseY;
}

function mouseReleased() {
  // if Div was dropped above canvas - create a new div, and place div back
  // where it was
  // get div that is currently being dragged
  // mouse was over canvas upon release
  if (mouseX > 0 && mouseX < c.width && mouseY > 0 && mouseY < c.height) {
    // create new div over the canvas
    switch (divClicked) {
      case 'red':
        createCanvasElement('red', mouseX, mouseY);
        break;
      case 'blue':
        createCanvasElement('blue', mouseX, mouseY);
        break;
      case 'green':
        createCanvasElement('green', mouseX, mouseY);
        break;
    }
  }

  // move div's back to where they started
  redDiv.position(0, 0);
  blueDiv.position(0, 200);
  greenDiv.position(0, 100);

  // Null out divCLicked so You dont' grab the same div again
  divClicked = ''
}

function mousePressed() {
  for (var i = 0; i < squaresToDraw.length; i++) {
    var s = squaresToDraw[i];
    if (mouseX > s.x && mouseX < (s.x + s.width) && mouseY > s.y && mouseY < (s.y + s.height)) {
      //draw border and handles

      s.border

      var hueInput = prompt("Enter hue value (0-360)");
      if (!isNaN(hueInput) && hueInput >= 0 && hueInput <= 360 && hueInput !== null) {
        print("hueInput is a number");
        s.h = hueInput;

      } else {
        alert("make sure to enter a number between 0 and 360!");
      }
      // provide user ability to change parameters of selected square
      // print(s.bgColor = color(hsba));

      // break out of the for loop to ensure only 1 square is selected
      break;
    }
  }
}

function createCanvasElement(s, x, y) {
  if (s === 'red') {
    squaresToDraw.push(new Square(0, 100, 100, x, y));
  } else if (s === 'blue') {
    squaresToDraw.push(new Square(240, 100, 100, x, y));
  } else {
    squaresToDraw.push(new Square(120, 100, 100, x, y));
  }
}

var squaresToDraw = [];

function Square(h, s, b, x, y) {
  this.h = h;
  this.s = s;
  this.b = b;

  this.width = 100;
  this.height = 100;
  this.x = x - this.width / 2;
  this.y = y - this.height / 2;
}

Square.prototype.display = function() {
  fill(this.h, this.s, this.b, 0.5);
  noStroke();
  rect(this.x, this.y, this.width, this.height);
}

function draw() {
  background('white');
  for (var i = 0; i < squaresToDraw.length; i++) {
    squaresToDraw[i].display();
  }
}