let img;
let video;
let value = 0;
let valueX = 0;
let mobilenet;
let predictor;
let trainButton;
let addButton;
let saveButton;

function imageReady() {
    console.log("Image is ready!!");
}

function imageFailed() {
    console.log("Failed to load image!!");
}

function modelReady() {
    console.log("Model is ready!!");
}

function videoReady() {
    console.log("Video is ready!!")
}

function whileTraining(loss) {
    if (loss == null) {
      console.log('Training Complete');
      predictor.predict(gotResults);
    } else {
      console.log(loss);
    }
}

function gotResults(error, result) {
    if (error) {
      console.error(error);
    } else {
      value = result.value;
      predictor.predict(gotResults);
    }
}

function setup() {
    createCanvas(800, 600);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    predictor = mobilenet.regression(video, videoReady);

    slider = createSlider(0, 1, 0.5, 0.01);

    addButton = createButton("Add example image");
    addButton.mousePressed(function() {
        console.log("Added image", slider.value());
        predictor.addImage(slider.value());
    });

    trainButton = createButton("train");
    trainButton.mousePressed(function() {
        predictor.train(whileTraining);
    });

    saveButton = createButton("save");
    saveButton.mousePressed(function() {
        predictor.save();
        mobilenet.save();
    });
}

function draw() {
    background(0);
    image(video, 0, 0, width, height);
    fill(255);
    rect(value * height, 0.5 * width, 50, 50);
    textSize(16);
    text(value, 10, height - 10);
}