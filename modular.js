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
  
  var inc = TWO_PI/num;
  var pr = map(inc, 0, PI, 2, r*.2); // point radius
  pr = constrain(pr, 1, 40);

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
  var lineAlpha = map(num, 0, 600, 150, 15);
  lineAlpha = constrain(lineAlpha, 5, 150);
  stroke(0, lineAlpha);
  for (var i = 0; i < num; i++) {
    var result = (i * mult) % num;
    line(cos(i*inc)*r, sin(i*inc)*r, cos(result*inc)*r, sin(result*inc)*r);
  }
  pop();
}
