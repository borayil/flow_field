function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(20);
}

function setColor(v) {
  let r = map(v.pos.x, 0, windowWidth, 50, 255)
  let g = map(v.pos.y, 0, windowHeight, 255, 50)
  let b = map(v.pos.x, 0, windowWidth, 50, 255)
  let stroke_color = color(r, g, b, lifespanWeight(v))
  stroke(stroke_color)
}

function lifespanWeight(v) {
  
  // Growing
  if (v.lifespan <= MAX_LIFESPAN / 2) {
      return map(v.lifespan, MIN_LIFESPAN, MAX_LIFESPAN / 2, 0, 1000)
  } 
  // Dying
  else {
      return map(v.lifespan, MAX_LIFESPAN / 2, MAX_LIFESPAN, 1000, 0)
  }
}

var timestamp = null
var changeAfter = 10000 // change angle alternation after x seconds
var ascending = true
function alternateAngleChangeScale() {
  if (timestamp == null) {
    timestamp = changeAfter
  }
  /*
  if (angle_change_scale >= max_acs || angle_change_scale <= min_acs) {
    ascending = !ascending 
  }
  */
  if (ascending) {
    angle_change_scale += 0.000000001
  } else {
    angle_change_scale -= 0.000000001
  }
  if (millis() >= changeAfter) {
    ascending = !ascending
    changeAfter *= 2
  }
}



const speed = 1
var min_acs = 0.0005
var max_acs = 0.8000
var angle_change_scale = 0.003// Intensity of angle changes for all vectors
var vectors = []


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(35);
  angleMode(DEGREES)
  noiseDetail(0.05)
  strokeWeight(1)

  
  // Grid params
  var density = windowWidth / 20
  var spacing = windowWidth / density

  // Init vectors and grid
  for(let x = 0; x < windowWidth; x += spacing) {
    for(let y = 0; y < windowHeight; y += spacing) {
      vectors.push(new Vector(random(windowWidth), random(windowHeight)))
      
    }
  }
}

function draw() {
  background(20, 40)
  
  
  for(let i = 0; i < vectors.length; i++) {
    
    let v = vectors[i]
    
    // Angle between Perlin noise field and vector
    let angle = map(noise(v.pos.x*angle_change_scale, v.pos.y*angle_change_scale), 0, 1, 0, 720)

   
    // To make the field itself move, alternate this scale
   
    
    alternateAngleChangeScale()
    
    let field_force = createVector(cos(angle), sin(angle))
    v.pos.add(field_force)
    
    
    
    if (v.done()) v.restart(windowWidth, windowHeight)
    setColor(v)
    v.show()
    
  }
}
