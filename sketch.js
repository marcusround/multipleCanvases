function preload() {
  img = loadImage("assets/tex/paper.jpg")
}

function setup() {
  createBoxes();
  cnv = createCanvas(300, 300);
  
}

function draw() {
  background(random(128, 232), random(64, 128), random(150, 210)); //purple
}

function createBoxes() {
  for (var i = 0; i < 10; i++){
    var sketch1 = function (p) {
      p.setup = function(){
        p.createCanvas(300, 300);
        p.imageMode(CENTER);
      }
      var n =0;
      p.draw = function(){
        p.background(random(64, 128), random(128, 232), random(150, 210)); // cyan
        f = frameCount%100;
        if (f == 0 ){
          n = random(TAU);
        }
        p.rotate(n);
        p.image(img, width/2, height/2);
      }
    }
  
  var canvas1 = new p5(sketch1);

  }
  }
