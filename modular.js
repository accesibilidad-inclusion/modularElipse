/*

Modular Arithmetic
Visualizing time tables
@hspencer ~ 2016

*/

var yellowDot = false; // draw the yellow dot?
var prop, propHtml;



function setup() {
  var myCanvas = createCanvas(700, 700);
  myCanvas.parent('modular');
  ellipseMode(CENTER);
  propHtml = document.getElementById('yell');
}

function draw() {
  background(255);
  prop = mouseX/width;
  var num = document.getElementById('num').value;
  var mult = document.getElementById('mult').value;
  ct(width / 2, height / 2, height * 0.44, num, mult);
}

function ct(x, y, r, num, mult) {
  push();
  translate(x, y);
  rotate(PI);

  var inc = TWO_PI / num;  // distance between points
  var currentNumber = 0;

  // lines
  var alpha = map(num, 0, 600, 110, 30); // alpha of the line
  alpha = constrain(alpha, 25, 150);

  for (var i = 0; i < num; i++) {
    var result = (i * mult) % num;

    // origin
    var x1 = cos(i * inc) * r;
    var y1 = sin(i * inc) * r;

    // result
    var x2 = cos(result * inc) * r;
    var y2 = sin(result * inc) * r;

    // prop % to result
    var xm = lerp(x1, x2, prop);
    var ym = lerp(y1, y2, prop);

    stroke(10, 10, 1, alpha);
    strokeWeight(1);
    line(x1, y1, x2, y2);

    // calc current number
    if(dist(mouseX-width/2, mouseY-height/2, x2, y2) < pr*4){
      currentNumber = num;
      ellipse(0, 0, 20, 20);
    }else{
      currentNumber = 0;
    }

    // draw yellow dot
    if (yellowDot) {
      stroke(255, 222, 0);
      strokeWeight(3);
      point(xm, ym);
      propHtml.innerHTML = prop.toPrecision(3);
    }else{
      propHtml.innerHTML = "&hellip;";
    }
  }

  // draw current number
  textFont("Helvetica");
  textSize(48);
  text(toString(t), x, y);

  // cicle of points
  noStroke();
  fill(255, 60, 0);
  var pr = map(inc, 0, PI, 2, r * 0.2); // point radius
  pr = constrain(pr, 1, 40);
  for (var t = 0; t < TWO_PI; t += inc) {
    ellipse(cos(t) * r, sin(t) * r, pr, pr);
  }
  pop();
}

function keyPressed() {
  if (key == ' ') {
    yellowDot = !yellowDot;
  }
}
