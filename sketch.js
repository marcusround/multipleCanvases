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
  
  for (var i = 0; i < boxes.length; i++){
    boxes[i].sketch.cnv.position(random(width), random(height));
  }
}

function createBoxes() {
  for (var i = 0; i < 10; i++){
    boxes[i] = new Box();
  }
}

function Box() {
  
  var sktch = function (p) {
      p.setup = function(){
        this.cnv = p.createCanvas(300, 300);
        this.cnv.style("position", "relative");
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
    
  this.sketch = new p5(sktch);
}
