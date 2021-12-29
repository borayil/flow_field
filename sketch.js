function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setColor(pos) {
  let r = map(pos.x, 0, windowWidth, 50, 255)
  let g = map(pos.y, 0, windowHeight, 255, 50)
  let b = map(pos.x, 0, windowWidth, 50, 255)
  fill(r,g,b)

}


const speed = 1
const ANGLE_CHANGE_SCALE = 0.0005// Intensity of angle changes for all vectors
var vectors = []


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(35);
  angleMode(DEGREES)
  noiseDetail(1)
  
  // Grid params
  var density = 100
  var spacing = windowWidth / density
  var idx = 0

  // Init vectors and grid
  for(let x = 0; x < windowWidth; x += spacing) {
    for(let y = 0; y < windowHeight; y += spacing) {
      vectors.push(new Vector(random(windowWidth), random(windowHeight)))
      
    }
  }
}

function draw() {
  background(20, 20)
  noStroke()
  
  for(let i = 0; i < vectors.length; i++) {
    let v = vectors[i]
    let mouse = createVector(mouseX, mouseY)
    let angle = map(noise(v.pos.x*ANGLE_CHANGE_SCALE, v.pos.y*ANGLE_CHANGE_SCALE), 0, 1, 0, 720)
    let angle_mouse = atan2(v.pos.y - mouseY, v.pos.x - mouseX) * 180 / PI
    
    v.pos.add(createVector(cos(angle), sin(angle)))
    v.pos.add(createVector(cos(angle_mouse), sin(angle_mouse)))
    setColor(v.pos)
    if (v.done()) v.restart(windowWidth, windowHeight)
    v.show()
  }
}


/*

for(let i = 0; i < vectors.length; i++) {
    let v = vectors[i]
    
    let n = noise(v.pos.x * NOISE_SCALE, v.pos.y * NOISE_SCALE)
    n = TWO_PI * n 

    // Update vector
    v.followField(n)
    v.followMouse(mouseX, mouseY)
    if (v.done(windowWidth, windowHeight)) {
      v.restart(windowWidth, windowHeight)
    }
    v.show()
  }

*/