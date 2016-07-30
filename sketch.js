function preload() {
  img = loadImage("assets/tex/paper.jpg")
}

var boxes = [];
var f = 0;

function setup() {
  createBoxes();
  cnv = createCanvas(300, 300);
}

function draw() {
  f = frameCount%100;
  
  background(random(128, 232), random(64, 128), random(150, 210)); //purple
  
  // if ( f == 0 ){
  //   for (var i = 0; i < boxes.length; i++){
  //     boxes[i].position(random(width), random(height));
  //   }
  // }
}

function createBoxes() {
  for (var i = 0; i < 10; i++){
    boxes[i].sketch = function (p) {
      p.setup = function(){
        boxes[i].sketch.cnv = p.createCanvas(300, 300);
        p.imageMode(CENTER);
      }
      var n =0;
      p.draw = function(){
        p.background(random(64, 128), random(128, 232), random(150, 210)); // cyan
        if (f == 0 ){
          n = random(TAU);
        }
        p.rotate(n);
        p.image(img, width/2, height/2);
      }
    }
  
  // boxes[i] = new p5(sketch1);
  // boxes[i].style("position", "absolute");
  }
}
