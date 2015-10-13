// DOM elements!

var cards = [];
var deck = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king", "ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"];
var back = 'assets/back.jpg';

// function preload() {
//   // back = loadImage('assets/back.jpg');
// }

var shuffledDeck = [];
var backgroundImageString = 'url(' + '\'' + 'assets/back.jpg' + '\'' + ') ';

function setup() {
  noCanvas();

  print(backgroundImageString);

  shuffledDeck = shuffle(deck);
  print(shuffledDeck);

  for (var i = 0; i < 26; i++) {
    var card = createDiv(i);
    card.class("card");
    // card.id("card"+i);
    cards.push(card);
    card.mousePressed(function(e) {
      flipCard(e.target.innerHTML);
    });
  }
}


var isAnotherCardUp = false;
var currentIndex;
var lastIndex;

function flipCard(index) {

  currentIndex = index;
  var currentCard = cards[index];

  // Format image name as string that .style() can understand
  // should look like: url('assets/image.png')
  var cardImage = 'assets/' + shuffledDeck[index] + '.png';
  var string = 'url(' + '\'' + cardImage + '\'' + ')';

  if (!isAnotherCardUp) {
    // keep track of this card
    lastIndex = index;
    // this is the first card that's being clicked
    // upon click, change the background image
    currentCard.style('background-image', string);

    // set flag so we know a card is turned up
    isAnotherCardUp = true;
  } else {
    currentCard.style('background-image', string);
    setTimeout(runMore, 1000);

    isAnotherCardUp = false;
  }

}

function runMore() {
  // if current card matches the last card...
  if (shuffledDeck[lastIndex] === shuffledDeck[currentIndex]) {
    cards[currentIndex].remove();
    cards[lastIndex].remove();
  } else {
    print(currentIndex);
    print(lastIndex);
    
    for (var i = 0; i<cards.length; i++) {
      cards[i].style('background-image', backgroundImageString);
    }
    // cards don't match, set their background images to back of card
    // cards[currentIndex].style('background-image', backgroundImageString);
    // cards[lastIndex].style('background-image', backgroundImageString);
    lastIndex = null;
  }
}




function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}