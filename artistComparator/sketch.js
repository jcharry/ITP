// How diverse is this artist?

// var apiKey = '0UXDG57YDSQ89NUEK';
var baseURI = 'http://developer.echonest.com/api/v4/artist/search?api_key=0UXDG57YDSQ89NUEK';

var response;
var input;
var mappedAudioParams = [];
var bs = [];
var currentData;
var songs = [];

var c;

var legendButton;
var shouldShowLegend = false;
var legendCloseButton;

var artists = [];

function setup() {
  angleMode(DEGREES);

  lastSearch = {
    name: '',
    values: []
  }
  currentSearch = {
    name: '',
    values: []
  }

  // Canvas used for drawing visualization
  c = createCanvas(windowWidth, windowHeight);
  // print(windowHeight);
  c.translate(windowWidth / 2, windowHeight / 2);
  // c.position(220, 0);

  var p = createP("Search for an artist");
  p.position(11, 3);
  p.style('margin', '0px 0px 0px 0px');
  p.style('color', 'white');
  p.style('font-family', 'Futura');
  p.style('font-size', '16pt');
  input = createInput();
  input.position(10, 35);
  input.class('input');
  var searchButton = createButton('Search');
  searchButton.class('button');
  searchButton.id('searchButton');
  searchButton.position(180, 36);
  searchButton.mousePressed(search);

  legendButton = createButton('Key');
  legendButton.class('button');
  legendButton.position(windowWidth - 50, 10);
  legendButton.mousePressed(showLegend);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  translate(windowWidth / 2, windowHeight / 2);
  legendButton.position(windowWidth - 50, 10);

}

// Trigger search when Enter key is pressed
function keyPressed() {
  if (keyCode === ENTER) {
    search();
  }
}

var legendDiv;

function showLegend() {
  shouldShowLegend = true;
  legendButton.hide();

  legendDiv = createDiv('');
  legendDiv.size(600, 600);
  legendDiv.style('background-color', 'white');
  legendDiv.position(((windowWidth - 600) / 2), ((windowHeight - 600) / 2));

  legendCloseButton = createButton('Close');
  legendCloseButton.parent(legendDiv);
  legendCloseButton.style('float', 'right');
  legendCloseButton.style('font-family', 'Gill Sans');
  legendCloseButton.style('font-size', '16pt');
  legendCloseButton.mousePressed(closeLegend);

  for (var i = 0; i < descArray.length; i++) {
    var p = createP(descArray[i]);
    p.parent(legendDiv);
    p.style('font-family', 'Gill Sans');
    p.style('font-size', '12pt');
    p.style('width', '590px');
    ps.push(p);
  }


}
var descArray = ['Description: The most popular 100 tracks for each artist are aggregated and averaged to obtain values for each category', 'Energy: Represents a perceptual measure of intensity and powerful activity released throughout the track. Typical energetic tracks feel fast, loud, and noisy.',
  'Danceability: Describes how suitable a track is for dancing', 'Acousticness: Represents the likelihood a recording was created by solely acoustic means', 'Happiness: Describes the musical positiveness conveyed by a track. Note that in the case of vocal music, lyrics may differ semantically from the perceived acoustic mood.', 'Loudness: Represents max decible level of a track', 'Duration: Average length of top 100 tracks',
  'Instrumentalness: Represents how much of a track is without vocals', 'Tempo: Represents the average tempo for top 100 tracks'
];
var ps = [];

function closeLegend() {
  legendCloseButton.remove();
  shouldShowLegend = false;
  legendButton.show();

  for (var i = 0; i < ps.length; i++) {
    ps[i].remove();
  }
  legendDiv.remove();
}

function search() {
  var artist = input.value();
  response = loadJSON(baseURI + '&name=' + artist, handleData);
}



function removeButtons() {
  if (bs.length !== 0) {
    for (var i = 0; i < bs.length; i++) {
      bs[i].remove();
    }
  }
}

function handleData(data) {

  // data contains JSON data for search.  Save it to local var so we 
  // don't have to fetch more data unless search is tapped again
  currentData = data;

  // if new data comes in - remove any buttons corresponding to an old search
  removeButtons();

  // place buttons on screen with search result
  for (var i = 0; i < data.response.artists.length; i++) {
    var b = createButton(data.response.artists[i].name);
    b.position(10, i * 30 + 70);
    b.style('font-family', 'Futura');
    b.style('font-size', '12pt');
    b.style('background-color', 'rgb(255,255,255)');
    bs.push(b);
    b.mousePressed(selectArtist); // register button callback to get artists name
  }
}

// Fired when you tap an artist button
function selectArtist(e) {
  // if an artist is selected, get their artist ID from the saved JSON data

  // clear out audio data
  // audioParams = [];
  songs = [];
  mappedAudioParams = [];

  // get artist name from button
  var selectedArtistName = e.target.innerHTML;

  // remove artist selection buttons
  removeButtons();

  // find artist that matches
  for (var i = 0; i < currentData.response.artists.length; i++) {
    if (currentData.response.artists[i].name === selectedArtistName) {
      var selectedArtistID = currentData.response.artists[i].id;

      // fire off request to get songs from selected artist
      searchForSongs(selectedArtistID);
    }
  }
}

function searchForSongs(id) {
  // query API for song data
  // print(id);
  var songData = loadJSON('http://developer.echonest.com/api/v4/song/search?api_key=0UXDG57YDSQ89NUEK&artist_id=' + id + '&sort=song_hotttnesss-desc&bucket=song_hotttnesss&results=100&bucket=audio_summary', handleSongData);
}

// Song data is returned from artist query
function handleSongData(data) {

  var namesArray = [];

  // first get all song ID's out of JSON
  for (var i = 0; i < data.response.songs.length; i++) {
    var song = data.response.songs[i];
    var songName = song.title.toLowerCase();

    // remove duplicate songs - get name of song, check if it exists in array holding song names
    // up to this point.  If it does not exist (i.e. indexOf() returns -1), then add it to 
    // the names array to be used for checking, and also add the song object to a separate array
    if (namesArray.indexOf(songName) === -1) {
      namesArray.push(songName);
      songs.push(song);
    }
  }

  // get parameters for tracks
  getTrackParameters();
}

// var audioParams = [];
var labels = ['Energy', 'Tempo', 'Acousticness', 'Instrumentalness', 'Duration', 'Loudness', 'Happiness', 'Danceability'];

function getTrackParameters() {
  // Parameters we have to work with:
  // Energy, Liveness, Tempo, Speechiness, Acousticness, Instrumentalness, 
  // Mode, Time Signature, Duration, Loudness, Valence, Danceability
  // audioParams = [energy (0-1), tempo(0-500), acousticness (0-1), instrumentalness (0-1), duration (0-3600s), loudness (-100,100), valence(0-1), danceability(0-1)];
  var audioParams = [0, 0, 0, 0, 0, 0, 0, 0];
  for (var i = 0; i < songs.length; i++) {
    var a = songs[i].audio_summary

    audioParams[0] += a.energy; // 0-1
    audioParams[1] += a.tempo; // 0-500
    audioParams[2] += a.acousticness;
    audioParams[3] += a.instrumentalness;
    audioParams[4] += a.duration;
    audioParams[5] += a.loudness;
    audioParams[6] += a.valence;
    audioParams[7] += a.danceability;
  }

  for (var i = 0; i < audioParams.length; i++) {
    audioParams[i] = audioParams[i] / songs.length;
  }

  mappedAudioParams[0] = map(audioParams[0], 0, 1, 0, windowHeight / 2 - 30);
  mappedAudioParams[1] = map(audioParams[1], 0, 500, 0, windowHeight / 2 - 30);
  mappedAudioParams[2] = map(audioParams[2], 0, 1, 0, windowHeight / 2 - 30);
  mappedAudioParams[3] = map(audioParams[3], 0, 1, 0, windowHeight / 2 - 30);
  mappedAudioParams[4] = map(audioParams[4], 0, 1200, 0, windowHeight / 2 - 30);
  mappedAudioParams[5] = map(audioParams[5], -100, 100, 0, windowHeight / 2 - 30);
  mappedAudioParams[6] = map(audioParams[6], 0, 1, 0, windowHeight / 2 - 30);
  mappedAudioParams[7] = map(audioParams[7], 0, 1, 0, windowHeight / 2 - 30);

  // if there are already two saved artists, get rid of the first one
  if (artists.length >= 2) {
    artists.splice(0, 1);
  }
  artists.push(new Artist(songs[0].artist_name, mappedAudioParams));

  compareArtists();
}

function Artist(name, values) {
  this.name = name;
  this.values = values;
  this.c = color(random(0,255), random(0,255), random(0,255),255/2);

  this.display = function() {
    stroke(this.c);
    strokeWeight(0);
    // text(this.name, 20,-20);
    var theta = 0;
    for (var i = 0; i < this.values.length; i++) {
      strokeWeight(5);
      // stroke(this.c);
      line(0, 0, this.values[i] * cos(theta), this.values[i] * sin(theta));
      theta += 360 / 8;
    }
  }
}

function compareArtists() {
  // compare last two searches

}

function draw() {
  background(93, 83, 105);
  var theta = 0;
  fill(93, 173, 158);

  // Draw labels
  textFont('Futura');
  textAlign(CENTER);
  textSize(18);
  for (var i = 0; i < labels.length; i++) {
    text(labels[i], ((windowHeight / 2) - 20) * cos(theta), ((windowHeight / 2) - 20) * sin(theta));
    theta += 360 / 8;
  }
  
  for (var i = 0; i < artists.length; i++) {
    artists[i].display();
    stroke(artists[i].c);
    fill(artists[i].c);
    strokeWeight(0);
    // noFill();
    text(artists[i].name, 200, (i*100)-50);
  }
}