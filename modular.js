/*

  Modular Arithmetic
  Visualizing time tables
  @hspencer ~ 2016

*/


function setup() {
  var myCanvas = createCanvas(700, 700);
  myCanvas.parent('modular');
  ellipseMode(CENTER);
}

function draw() {
  background(255);
  var num = document.getElementById('num').value;
  var mult = document.getElementById('mult').value
  ct(width/2, height/2, height*.4, num, mult);
}

function ct(x, y, r, num, mult) {
  var pr = 5; // point radius
  var inc = TWO_PI/num;
  push();
  translate(x, y);
  rotate(PI);
  
  // cicle of points
  noStroke();
  fill('#EA5B13');
  for (var t = 0; t < TWO_PI; t+=inc) {
    ellipse(cos(t)*r, sin(t)*r, pr, pr);
  }
  
  // lines
  stroke(0, 100);
  for (var i = 0; i < num; i++) {
    var result = (i * mult) % num;
    line(cos(i*inc)*r, sin(i*inc)*r, cos(result*inc)*r, sin(result*inc)*r);
  }
  pop();
}
