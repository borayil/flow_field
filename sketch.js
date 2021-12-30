function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(35);
}

function setColor(pos) {
  let r = map(mouseX, 0, windowWidth, 50, 255)
  let g = map(mouseY, 0, windowHeight, 255, 50)
  let b = map(mouseX, 0, windowWidth, 50, 255)
  fill(r,g,b)

}


const speed = 1
const ANGLE_CHANGE_SCALE = 0.005// Intensity of angle changes for all vectors
var vectors = []


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(35);
  angleMode(DEGREES)
  noiseDetail(1)
  
  // Grid params
  var density = 100
  var spacing = windowWidth / density

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
    
    // Angle between Perlin noise field and vector
    let angle = map(noise(v.pos.x*ANGLE_CHANGE_SCALE, v.pos.y*ANGLE_CHANGE_SCALE), 0, 1, 0, 720)

    // Angle between vector and mouse
    let angle_mouse = atan2((v.pos.y - mouseY), (v.pos.x - mouseX)) * 180 / PI 

    // Add (or sub) 90 deg to this angle
    angle_mouse -= 270


    
    let field_force = createVector(cos(angle), sin(angle))
    let mouse_force = createVector(cos(angle_mouse), sin(angle_mouse))

    // Weigh movement by the inverse of the distance between vector particle and rotator point
    
    // Distance to rotator point (mouse)
    let dist_mouse = v.pos.dist(mouse_force)
    mouse_force.mult((1 + 1/dist_mouse) * 20)
  

    v.pos.add(mouse_force)
    
    
    setColor(v.pos)
    if (v.done()) v.restart(windowWidth, windowHeight)
    v.show()
  }
}
