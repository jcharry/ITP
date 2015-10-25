// Query by genre testing

// var apiKey = '0UXDG57YDSQ89NUEK';
var baseURI = 'http://developer.echonest.com/api/v4/genre/list?api_key=0UXDG57YDSQ89NUEK';
var searchParameter

function setup() {
  angleMode(DEGREES);

  c = createCanvas(windowWidth, windowHeight);
  c.translate(windowWidth / 2, windowHeight / 2);
  var input = createInput();
  input.position(10, 10);
  var b = createButton("search");
  b.mousePressed(function() {
    print(input.value());
    searchParameter = input.value();
    var url = 'http://developer.echonest.com/api/v4/genre/search?api_key=0UXDG57YDSQ89NUEK&results=100&name=' + searchParameter;
    loadJSON(url, handleData);
  });
  b.position(10, 30);
}

function handleData(data) {
  print(data);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  translate(windowWidth / 2, windowHeight / 2);
}



function draw() {

}