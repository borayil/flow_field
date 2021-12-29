function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function checkBounds(vector) {
  return vector.x >= 0 && vector.x <= windowWidth && vector.y >= 0 && v.y <= windowHeight
}

const NOISE_SCALE = 0.005// Keep noise under control
const speed = 1
var vectors = new Array(MAX_VECTOR_AMT)
var MAX_VECTOR_AMT = 100

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);
  
  // Grid params
  var density = 50
  var spacing = windowWidth / density
  var idx = 0

  // Init vectors and grid
  for(let x = 0; x < windowWidth; x += spacing) {
    for(let y = 0; y < windowHeight; y += spacing) {
      vectors[idx] = new Vector(x, y)
      idx += 1
    }
  }
}

function draw() {
  

  
  noStroke()
  fill(255)
  for(let i = 0; i < vectors.length; i++) {
    let v = vectors[i]

    let angle = map(noise(v.pos.x, v.pos.y), 0, 1, 0, 720)
    v.pos.add(createVector(cos(angle), sin(angle)))
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