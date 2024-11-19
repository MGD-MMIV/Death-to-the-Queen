let avatar = {
    x: 25,
    y: 684,
    width: 100,
    height: 100,
    speedX: 0,
    speedY: 0,
    gravity: 0.5,
    jumpPower: -9,
    onGround: true,
    frameDelay: 10,
    frameCounter: 0,
    currentFrame: 0,
    isIdle: true,
    facingLeft: false, // Track direction for flipping
    isCrouching: false,
    hp: 5, 
    dmg: 0.5,  // Track crouch state
}

let enemy1 = {
    x: 785,
    y: 634,
    width: 150,
    height: 150,
    speedX: 0,
    speedY: 0,
    gravity: 0.5,
    onGround: true,
    frameDelay: 20,
    frameCounter: 0,
    currentFrame: 0,
    isIdle: true,
    facingLeft: false, // Track direction for flipping
    hp: 5,
    dmg: 1.5,
    visble: true,
}
