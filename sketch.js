var boxes = [];
var origin;

function preload() {
  imgPaperBG = loadImage("assets/tex/paper.jpg");
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.style("z-index", -999);
  origin = createVector(width/2, height);
  boxes[0] = new canvasBox ( "Hello", 0, -100, 150, 85, 0);
  boxes[1] = new canvasBox ( "Hi", 0, -100, 105, 75, 1);
}

var f = 0;

function draw() {
  background(random(128, 156), random(75, 184), random(27, 85));
  ellipse(mouseX, mouseY, 85, 85);
  f = frameCount%100;
  if (f == 0){
    for (var i = 0; i < boxes.length; i++){
      boxes[i].truePositionV.set(random(-width/2, width/2), random(-height));
    }
  }
  
  for (var i = 0; i < boxes.length; i++){
    boxes[i].stopMotion();
    boxes[i].place();
  }
}

function canvasBox (inputText, inputX, inputY, inputWidth, inputHeight, idInput){
  var v = 3; // Variability/randomness of corner positioning when in stopMotion mode.
  var dropShadowHeight = 2;
  var padding = 10;
  var bgTex = imgPaperBG;
  // var this.id = idInput;
  
  this.width = inputWidth;
  this.height = inputHeight;
  
  var bgW, bgH, wDiff, hDiff;
  
  var safeOuterWidth = this.width + (2 * v);
  var safeOuterHeight = this.height + (2 * v);
  
  var boxMatte = createGraphics(safeOuterWidth, safeOuterHeight);
      boxMatte.noStroke();
  var boxMatteRender;
  var boxFillRender;
  
  var boxFill = createGraphics(safeOuterWidth, safeOuterHeight);
      boxFill.imageMode(CENTER);
      
  var boxRender = createGraphics(safeOuterWidth + dropShadowHeight, safeOuterHeight + dropShadowHeight);
      boxRender.imageMode(CENTER);
      boxRender.blendMode(BLEND);
      boxRender.noStroke();
      boxRender.fill(0);

  this.truePositionV = createVector(inputX, inputY);
  this.apparentPositionV = this.truePositionV.copy();

  // this.dragToMouse = function() {
  //   if (handProgress > 0.98){
  //     var mouseMovementV = p5.Vector.sub(mouse.armSafe, mouse.clicked);
  //     this.truePositionV.set(p5.Vector.add(activeBoxPickUpPositionV, mouseMovementV));
  //   }
  //   // this.truePositionV.set(inputVector.x, inputVector.y);
  // }
  
  this.initialise = function(){
    bgW = bgTex.width;
    bgH = bgTex.height;
    
    wDiff = (bgW - this.width)/2;
    hDiff = (bgH - this.height)/2;  
    
    this.stopMotion();
    this.place();
  }
  
  this.stopMotion = function() {
    boxMatte.clear();
    boxFill.clear();
    boxRender.clear();
    // boxMatte.fill(64);
    
    // Creating an alpha mask for the box, a quadrilateral with random corners.
    boxMatte.quad(
      randomise(v, v), randomise(v, v), // TL
      randomise(this.width - v, v), randomise(v, v), // TR
      randomise(this.width - v, v), randomise(this.height - v, v), // BR
      randomise(v, v), randomise(this.height - v, v) // BL
    );
    
    boxMatteRender = boxMatte.get();

    var vr = v * 8;
    var bgRandX = random(-wDiff + vr, wDiff - vr);
    var bgRandY = random(-hDiff + vr, hDiff - vr);
    
    boxFill.image(bgTex, safeOuterWidth/2 + bgRandX, safeOuterHeight/2 + bgRandY);
 
    // Apply mask to fill.
    boxFillRender = boxFill.get();
    boxFillRender.mask(boxMatteRender);

    boxRender.push();
      boxRender.image(boxFillRender, safeOuterWidth/2, safeOuterHeight/2);
    boxRender.pop();
    
    content.position(random(padding - v, padding + v), random(padding - v, padding + v));
    content.style("rotate", random(-1, 1.5));
    
    if (random()<0.5){
      content.style("font-family", "Times New Roman");
    } else {
      content.style("font-family", "Georgia");
    }
  }
  
  this.place = function() {
    this.apparentPositionV = this.truePositionV.copy();
    this.boxDiv.position(origin.x - this.width/2 + this.apparentPositionV.x, origin.y - this.height/2 + this.apparentPositionV.y);
  }

  var mySketch = function (p) {
    p.preload = function() {
      // Only run the sketch once texture is loaded.
      // bgTex = loadImage("assets/tex/paper.jpg");
    }
    
    p.setup = function() {
      this.cnv = p.createCanvas(safeOuterWidth, safeOuterHeight).class("canvasBox");
      this.cnv.style("z-index", 99);
    };
    
    p.draw = function() {
      // p.println("draw running");
      p.clear();
      p.background("red");
      p.image(boxRender);
    }
  }
  
  var myContainerID = 'canvasBox'+idInput; // ie. canvasBox4, according to the order they are created
  
  // Create div for background canvas
  this.boxDiv = createDiv("").id(myContainerID);
  this.boxDiv.size(boxRender.width, boxRender.height);
  this.boxDiv.style("position", "relative");
  this.boxDiv.position(inputX, inputY);
  this.boxDiv.style("z-index",  -30 - idInput);
  
  // Create div for text (etc) content
  var content = createDiv(inputText).class("boxContent");
      content.parent(myContainerID);
      content.style("font-family", "Serif");
      content.style("font-size", "20px");
      content.size(boxRender.width - (2 * padding), boxRender.height - (2 * padding));
      content.attribute("align", "center");
  
  // Creating the actual p5 canvas for this box and attaching it to the div we created.    
  this.sketch = new p5(mySketch, myContainerID);
  
  this.toggleDebug = function(){
    if (debug){
      content.style("outline", "2px solid blue");
      this.boxDiv.style("outline", "2px solid red");
    } else {
      content.style("outline", "");
      this.boxDiv.style("outline", "");
    }
  }
  
  this.setZIndex = function(inputZ){
    this.boxDiv.style("z-index", inputZ);
  }
  
  this.collisionCheck = function(){
    var startingZIndex = this.boxDiv.elt.style.zIndex;
    var myBox = this.boxDiv.elt.getBoundingClientRect();
    // Topmost box zIndex is -30, we might start at something like -32.
    if (startingZIndex == -30){
      // Do nothing
    } else {
      for (var i = 0; i <= boxes.length; i++){
        if ( i == boxes.length ){
          // If we've reached the end of the for loop without breaking, bingo! No boxes overlap us. Let's move to the top of the stack.
          // We set our zIndex to one higher than the top, then move all the boxes above our old position (including us) down one spot.
          // Remember our 'zero' point is -30.
          this.setZIndex(-29);
          for (var j = 0; j < boxes.length; j++){
            var curDiv = boxes[j].boxDiv.elt;
            // Ignore boxes below us in the stack order
            if ( curDiv.style.zIndex < startingZIndex ) {
              newZ = curDiv.style.zIndex - 1;
              println("newZ: " + newZ);
              boxes[j].boxDiv.style("z-index", newZ);
            }
          }
        } else if ( boxes[i].boxDiv.elt.style.zIndex < startingZIndex ){
          // Ignore boxes below us in the stack order
          // If the box lies above us, check if its overlapping us.
          var collisionBox = boxes[i].boxDiv.elt.getBoundingClientRect();
          
          if ( myBox.left < collisionBox.right &&
               myBox.right > collisionBox.left &&
               myBox.top < collisionBox.bottom &&
               myBox.bottom > collisionBox.top ) {
            // If it is overlapping us, break the loop and do nothing.
            break;
          } else {
            // If not, continue the loop.
            continue;
          }
        }
      }
    }
  }
  
  this.initialise();
}


function randomise(a, b){
  return a + random(-b, b);
}
