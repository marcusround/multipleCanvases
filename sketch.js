function setup() {
  createBoxes();
  cnv = createCanvas(300, 300);
  
}

function draw() {
  background(random(128, 232), random(64, 128), random(150, 210)); //purple
}

function createBoxes() {
  var sketch1 = function (p) {
    p.setup = function(){
      p.createCanvas(300, 300);
    }
    
    p.draw = function(){
      p.background(random(64, 128), random(128, 232), random(150, 210)); // cyan
    }
  }
  
  var canvas1 = new p5(sketch1);
}