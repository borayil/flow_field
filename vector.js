const MAX_LIFESPAN = 10000

function Vector(x, y) {
    this.pos = createVector(x, y);
    this.speed = 1
    this.lifespan = random(10,MAX_LIFESPAN)
    
    this.show = function () {
        
        ellipse(this.pos.x, this.pos.y, 1)
        this.lifespan -= 0.2
    }



    this.done = function(width, height) {
        return (this.pos.y > height || this.pos.x > width) || (this.lifespan <= 0)
    }

    this.checkBounds = function() {
        return (this.x >= 0 && this.x <= windowWidth) 
        && (this.y >= 0 && this.y <= windowHeight);
    } 

    this.restart = function(width, height) {
        this.lifespan = MAX_LIFESPAN
        this.pos.x = random(width)
        this.pos.y = random(height)
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
    } 

    
}