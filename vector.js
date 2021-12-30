const MIN_LIFESPAN = 10
const MAX_LIFESPAN = 100


function Vector(x, y) {
    this.pos = createVector(x, y);
    this.lifespan = random(MIN_LIFESPAN,MAX_LIFESPAN)


    this.show = function () {
        point(this.pos.x, this.pos.y)
        this.lifespan -= 0.2
    }

    this.done = function(width, height) {
        return (this.pos.y > height || this.pos.x > width) || (this.lifespan <= 0)
    }

    this.restart = function(width, height) {
        this.pos.x = random(width)
        this.pos.y = random(height)
        this.lifespan = MAX_LIFESPAN
    } 

    
}