function keyDownHandler(event){
    if (event.key === 'd') {
        avatar.speedX = 5;       // Move right
        avatar.isIdle = false;
        avatar.facingLeft = false;  // Not facing left
    }
    if (event.key === 'a') {
        avatar.speedX = -5;      // Move left
        avatar.isIdle = false;
        avatar.facingLeft = true;  // Facing left
    }
    if (event.key === 'w' && avatar.onGround) {     // Jump
        avatar.speedY = avatar.jumpPower;
        avatar.onGround = false;
    }
    if (event.key === 's') {  // Crouch
        avatar.isCrouching = true;
    }

    if (event.key === ' ') {
        shootBullet()
    }

    if (event.key === `ArrowUp`) {
        avatar.isClimbing = true;
    }

    if (event.key === `ArrowDown`) {
        avatar.isClimbing = false;
        }
    }

function keyUpHandler(event){
    if (event.key === 'd' || event.key === 'a') {
        avatar.speedX = 0;
        avatar.isIdle = true;  // Set to idle when movement stops
    }
    if (event.key === 's') {  // Stop crouch
        avatar.isCrouching = false;
    }
}
