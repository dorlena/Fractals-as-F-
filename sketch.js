

var angle, angle2; // global variables for the main angles determining the design of my fractals
var tround = 0; // global variable controlling the spin direction of the nebulae
var xoff = 0; // the variable to offset Perlin noise value 

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  var nr = map(noise(xoff), 0, 1, PI/6, PI/2); // Perlin noise will be used for the angle of my fractal branches (30 - 90)
  //2 angles will vary based on the mouse position: vertical and horizontal axes
  angle = map(mouseX, 0, width, nr, nr*2);
  angle2 = map(mouseY, 0, height, -nr/2, nr/2);
  
  push()
  // Start the tree from the center
  translate(width / 2, height / 2);

  if (mouseIsPressed) { //keep the mouse pressed for more hypnotic results
    rotate(tround * 1);
    tround++;
  } 
  
  // here are multiple calls for all my branches to grow
  for (t = 0; t <= 360; t += 36) {
    var nc = floor(map(nr, PI/6, PI/2, 5, 55)); // color of the branches is also determined by Perlin Noise
    print(nc);
    stroke(200+nc, nc, nc);
    push();
    rotate(angle2 + t);
    branch(angle * 100, 1);
    pop();
    stroke(150+nc, nc*2, nc);
    push();
    rotate(angle2 + t);
    branch(angle * 200, 1);
    pop();
    stroke(100+nc, nc*4, nc);
    push();
    rotate(angle2 + t);
    branch(angle * 300, 1);
    pop();
  }
  pop();
  xoff += 0.01; // moving forward my Perlin Noise "timeline"
}


function branch(len, generation) {
  // Draw the branch
  strokeWeight(map(generation, 1, 10, 0, 3));
  line(0, 0, 0, -len);

  // Move to the end and shrink.
  translate(0, -len);
  len *= 0.66;

  generation++;
  
  // the recursion happens here
  if (len > 1) {
    push();
    rotate(angle/2*angle);
    branch(len * 0.5, generation);
    pop();
    
    // the other branch
    push();
    rotate(angle2*1);
    branch(len, generation);
    pop();
  }
}