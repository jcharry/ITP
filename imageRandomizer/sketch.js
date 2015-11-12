var squareSize = 150;
var shuffledImgSquares = [];
var imgSquares = [];

var readyToDraw = false;

function handleImage(loadedImg) {
	loadedImg.resize(windowWidth,windowHeight);

	var numberOfColumns = floor(loadedImg.width/squareSize);
	var numberOfRows = floor(loadedImg.height/squareSize);

	// Resize image according to square size
	if ((loadedImg.width % squareSize) !== 0) {
		var diff = loadedImg.width - (squareSize * numberOfColumns);
		loadedImg.resize(loadedImg.width-diff,0);
	}
	if ((loadedImg.height & squareSize) !== 0) {
		var diff = loadedImg.height - (squareSize * floor(numberOfRows));
		loadedImg.resize(loadedImg.width,loadedImg.height-diff);

	}

	// load the resized image
	image(loadedImg,0,0, loadedImg.width,loadedImg.height);

	// break up image into squares
	
	
	// for each square area in the image - get pixels and push to array
	for (var i = 0; i < loadedImg.width; i+=squareSize) {
		for (var j = 0; j < loadedImg.height; j+=squareSize) {
			noFill();
			stroke(255,0,0);
			rect(i,j,squareSize,squareSize);

			// get the pixels for each square
			var p = get(i,j,squareSize,squareSize);
			var dS = new draggableSquare(p);
			imgSquares.push(dS);
		}
	}

	// shuffle the img array
	shuffledImgSquares = shuffle(imgSquares);

	var currentColumn = 0;
	var currentRow = 0;
	for (var i = 0; i < shuffledImgSquares.length; i++) {
		// figure out which column we're in
		if ((currentRow*squareSize) >= loadedImg.width) {
			currentColumn++;
			currentRow = 0;
		}
		shuffledImgSquares[i].y = currentColumn*squareSize;
		shuffledImgSquares[i].x = currentRow*squareSize;
		// image(shuffledImgSquares[i],currentRow*squareSize,currentColumn*squareSize,squareSize,squareSize);
		currentRow++;
	}

	readyToDraw = true;
}

function draggableSquare(img) {
	this.x;
	this.y;
	this.size = squareSize;
	this.image = img;

	this.display = function() {
		image(this.image,this.x,this.y,this.size,this.size);
	}
}

var capture;
var capturing = true;
var cnv;
function setup() {

	loadImage('cat.jpg', handleImage);

	var button = createButton('shuffle');
	button.mousePressed(shuffle);
	

	cnv = createCanvas(windowWidth, windowHeight);
	// cnv.position(0,0);

}

function shuffle() {

	//TODO: SCOPE ISSUE's in here!
		// shuffle the img array
	shuffledImgSquares = shuffle(imgSquares);

	var currentColumn = 0;
	var currentRow = 0;
	for (var i = 0; i < shuffledImgSquares.length; i++) {
		// figure out which column we're in
		if ((currentRow*squareSize) >= loadedImg.width) {
			currentColumn++;
			currentRow = 0;
		}
		shuffledImgSquares[i].y = currentColumn*squareSize;
		shuffledImgSquares[i].x = currentRow*squareSize;
		// image(shuffledImgSquares[i],currentRow*squareSize,currentColumn*squareSize,squareSize,squareSize);
		currentRow++;
	}
}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

var tappedIndex;
function mousePressed() {
	for (var i = 0; i < shuffledImgSquares.length; i++) {
		var tile = shuffledImgSquares[i];
		if ( (mouseX > tile.x) && (mouseX < (tile.x+tile.size)) && (mouseY > tile.y) && (mouseY < (tile.y+tile.size)) ) {
			tappedIndex = i;
		}
	}
}

function mouseDragged() {
	// get tile to drag
	var tileToDrag = shuffledImgSquares[tappedIndex];
	tileToDrag.x = mouseX-tileToDrag.size/2;
	tileToDrag.y = mouseY-tileToDrag.size/2;
}

function draw() {
	background(0);

	if (readyToDraw) {
		for (var i = 0; i < shuffledImgSquares.length; i++) {
			shuffledImgSquares[i].display();
		}
	}

}