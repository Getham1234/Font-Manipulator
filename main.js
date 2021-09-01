noseX = 0;
noseY = 0;
LeftWristX = 0;
RightWristX = 0;
difference = 0;
function setup(){
    video = createCapture(VIDEO);
    video.size(500, 500);
    video.position(50, 120);

    canvas = createCanvas(450, 450);
    canvas.position(800, 200);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw(){
    word = document.getElementById("text_input").value;
    background("#bad7db");
    text(word, noseX, noseY);
    textSize(difference);
    stroke("black");
    document.getElementById("square_dimensions").innerHTML = "The x and y coordinates are " + floor(noseX) + ", " + floor(noseY) + " and the width and heght is " + difference + "."
}

function modelLoaded(){
    console.log("Model Loaded!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("Nose X is " + noseX + " and Nose yy is " + noseY);
        LeftWristX = results[0].pose.leftWrist.x;
        RightWristX = results[0].pose.rightWrist.x;
        difference = floor(LeftWristX - RightWristX);
    }
}