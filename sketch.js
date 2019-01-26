var myData;
var myImage;
var myColors = ['#2151B2', '#FF5D3E', '#256DFF', '#8CCC09', '#78B200'];


function preload(){
  // put preload code here
  myData = loadJSON('assets/dataone.json');
  myImage = loadImage('assets/data-numbers-ss-1920.jpg');

}

var balls = [];

function setup() {
  // put setup code here
  createCanvas(windowWidth,windowHeight);
  //get it as JSON
  for (var i = 0; i < myData.dataone.length; i++) {
    var dt = myData.dataone[i];

    var x = random(width);
    var y = random(height);
    var nc = dt.CURRENTLY;
    var n = dt.PROVINCE;
    var np = dt.PLANNED;
    var newBall = new Ball(x, y, nc, np, n);
    balls.push(newBall);
    console.log(dt);
  }
}


function mousePressed(){
    for (var j = 0; j < balls.length; j++){
      balls[j].click();
    }
}



function draw() {
  // put drawing code here

  image(myImage, 0, 0, myImage.width, myImage.height);
  myImage.filter("gray");
  
  var myText = 'This is the current distribution of data centers in various cities!';

  textFont('Josefin Sans');
  textAlign(CENTER);
  textSize(30);
  text(myText,width/2,height-40);

  for (var j = 0; j < balls.length; j++) {
  balls[j].display();
  balls[j].move();
  }

}

function Ball(_x, _y, _n, _nc, _np) {

  this.x = _x;
  this.y = _y;
  this.name = _n;
  this.score = _nc;
  this.id = _np;
  this.speed = 1;

  this.color = color(myColors[1]);

  this.size = 50;

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };

  this.display = function() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);

    fill(color(myColors[3]));
    textSize(20);
    text(this.id, this.x - 40, this.y - 40);
  }

  this.click = function() {
    var d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.size) {
      this.display = function() {
        textSize(20);
        text(this.name, this.x - 40, this.y - 40);
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
