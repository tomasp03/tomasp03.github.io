let video;
let mobilenet;
let classifier;
let Button;

function modelReady(){
  console.log("Model is ready!");
}

function videoReady(){
  console.log("Video is ready!");
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  mobilenet = ml5.featureExtractor('Mobilenet', modelReady);
  classifier = mobilenet.classification(video, videoReady);
  Button = createButton("sluchatka");
  Button.mousePressed(function(){
    classifier.addImage(video, "sluchatka")
  });

}

function draw() {
  image(video, 0, 0);
  mobilenet.addImage(video, "Tomas");
}