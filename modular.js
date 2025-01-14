/*

Modular Arithmetic
Visualizing time tables
@hspencer ~ 2016

*/

var yellowDot = false; // draw the yellow dot?
var prop, propHtml;

let a, b; // xy ellipse
let theta;

let yd; 

function setup() {
  var myCanvas = createCanvas(windowWidth, 700);
  myCanvas.parent('modular');
  ellipseMode(CENTER);
  propHtml = document.getElementById('yell');

  theta = createSlider(-PI, PI, TWO_PI, 0.001);
  a = createSlider(-width, width, width/2.4, 1);
  b = createSlider(-height, height, height/3, 1);

  theta.parent("controls");
  a.parent("controls");
  b.parent("controls");

}

function draw() {
  background(255);
  prop = mouseX/width ;
  var num = document.getElementById('num').value;
  var mult = document.getElementById('mult').value;
  ct(width / 2, height / 2, height * 0.44, num, mult);

  textAlign(CENTER);
  fill(0, 50);
  text(theta.value()+"  -  "+a.value()+"  -  "+b.value(), width/2, height - 48);
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
    var x1 = cos(i * inc + theta.value()) * a.value();
    var y1 = sin(i * inc + theta.value()) * b.value();

    // result
    var x2 = cos(result * inc + theta.value()) * a.value();
    var y2 = sin(result * inc + theta.value()) * b.value();

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
      fill(0, 100); 
      noStroke();//stroke(255, 222, 0);
      strokeWeight(3);
      ellipse(xm, ym, 7, 7);
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
  pr = constrain(pr, 1, 7);
  for (var t = 0; t < TWO_PI; t += inc) {
    ellipse(cos(t + theta.value()) * a.value(), sin(t + theta.value()) * b.value(), pr, pr);
  }
  pop();
}

function keyPressed() {
  if (key == ' ') {
    yellowDot = !yellowDot;
    print("yellowDot");
  }
}
