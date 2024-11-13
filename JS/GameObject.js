class GameObject {
    constructor() {
        // Object properties (or attributes)
        // Object position
        this.x = c.width / 2;
        this.y = c.height / 2;

        // Object angle
        this.angle = 0;

        // Object dimensions
        this.w = 100;
        this.h = 100;

        // Object velocity
        this.vx = 5;
        this.vy = 5;

        // Gravity data
        this.gravity = 0.05;
        this.gravitySpeed = 0;
    }

    newPos() {
        this.gravitySpeed += this.gravity;
        this.x += this.vx;  // Use vx instead of speedX
        this.y += this.vy + this.gravitySpeed;  // Use vy instead of speedY
        this.hitBottom();
    }

    hitBottom() {
        var rockBottom = c.height - this.h;  // Use c instead of myCanvas and this.h instead of height
        if (this.y > rockBottom) {
            this.y = rockBottom;
        }
    }

    // Moves an object by adding its velocity to its position on each axis
    move() {
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }

    // Each function below returns a side of this object's bounding box
    top() {
        return this.y - this.h / 2;
    }

    bottom() {
        return this.y + this.h / 2;
    }

    left() {
        return this.x - this.w / 2;
    }

    right() {
        return this.x + this.w / 2;
    }

    /*-------Collision Function ----------------
    Used to check for collision between 2 objects
    This method checks to see where the various sides of one object are in relationship to another object's sides
    -------------------------------------------*/
    overlaps(_obj) {
        return (
            this.top() < _obj.bottom() &&
            this.bottom() > _obj.top() &&
            this.left() < _obj.right() &&
            this.right() > _obj.left()
        );
    }
}
