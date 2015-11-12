"use strict"

var video;
var audio;

var tracker;
var hair;
var aura;
var auraSound;
var screamSound;
var isSuperSaiyan = false;

function preload() {
  hair = loadImage('hair.png');
  aura = loadImage('aura.png');
  auraSound = loadSound('aura.mp3');
  screamSound = loadSound('scream.wav');
}

function setup() {



  // audio = createCapture(AUDIO);
  // audio.hide();
  video = createCapture(VIDEO);
  // video.hide();
  video.size(600, 400);
  // video.position(0,0);

  var cnv = createCanvas(600, 400);
  cnv.position(0, 0);
  tracker = new clm.tracker();
  tracker.init(pModel);

  tracker.start(video.elt);

  var button = createButton('Go Super Saiyan');
  // button.position(20,700);
  button.mousePressed(function() {
      screamSound.play();
      setTimeout(function() {
        isSuperSaiyan = true;
        auraSound.play();
      }, 5000);
  });
}

var dir = 1;
var a = 100;

function draw() {
  clear();
  // background(0);

  var positions = tracker.getCurrentPosition();

  // Debugging face tracker - uncomment to see points on face
  // for (var i = 0; i < positions.length; i++) {
  //   fill(200);
  //   ellipse(positions[i][0], positions[i][1], 5,5);
  //   text(i, positions[i][0], positions[i][1]);
  // }

  if (isSuperSaiyan) {
    if (positions) {
      ellipse(positions[21][0], positions[21][1], 10, 10);
      if (a >= 255 || a <= 30) {
        dir = -dir;
      }
      a += 30 * dir;

      tint(255, a);
      image(aura, 0, 0, 600, 400);
      noTint();
      image(hair, (positions[21][0] - 100), (positions[21][1] - 210), 250, 250);
    }
  }
}