let canvas;
let context;

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
    isCrouching: false  // Track crouch state
};

let avatarIdle = [
    'Image/Exterminator/ExterminatorIdle1.png',
    'Image/Exterminator/ExterminatorIdle2.png'
];

let avatarWalk = [
    'Image/Exterminator/ExterminatorRunning&Jumping.png',
    'Image/Exterminator/ExterminatorRun2.png'
];

let avatarCrouch = 'Image/Exterminator/ExterminatorCrouch.png'; // Crouch image

window.onload = init;

function init(){
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    window.requestAnimationFrame(gameLoop);
}

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

function gameLoop(timeStamp){
    update();
    draw();

    window.requestAnimationFrame(gameLoop);
}

function update(){
    // Update position
    avatar.x += avatar.speedX;
    avatar.y += avatar.speedY;

    // Apply gravity if in the air
    if (!avatar.onGround) {
        avatar.speedY += avatar.gravity;
    }

    // Collision with ground
    if (avatar.y >= 684) {  // Assuming ground level is y=684
        avatar.y = 684;
        avatar.speedY = 0;
        avatar.onGround = true;
    }

    // Update frame if necessary
    avatar.frameCounter++;
    if (avatar.frameCounter >= avatar.frameDelay) {
        avatar.frameCounter = 0;

        // Check if avatar is idle or moving, then choose correct animation
        if (avatar.isIdle) {
            avatar.currentFrame = (avatar.currentFrame + 1) % avatarIdle.length;
        } else {
            avatar.currentFrame = (avatar.currentFrame + 1) % avatarWalk.length;
        }
    }
}

function draw(){
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    let background = new Image();
    background.src = 'Image/Level.png';
    context.drawImage(background, 0, 0, 1300, 800);

    // Check if crouching
    if (avatar.isCrouching) {
        // Draw crouch image, adjust position downward
        let crouchImage = new Image();
        crouchImage.src = avatarCrouch;
        context.drawImage(crouchImage, avatar.x, avatar.y, avatar.width, avatar.height);
    } else {
        // Select correct frame based on movement
        let avatarImage = new Image();
        if (avatar.isIdle) {
            avatarImage.src = avatarIdle[avatar.currentFrame];
        } else {
            avatarImage.src = avatarWalk[avatar.currentFrame];
        }

        // Save the context state before flipping
        context.save();

        // Flip image if facing left
        if (avatar.facingLeft) {
            context.scale(-1, 1);  // Flip horizontally
            context.drawImage(avatarImage, -avatar.x - avatar.width, avatar.y, avatar.width, avatar.height);
        } else {
            context.drawImage(avatarImage, avatar.x, avatar.y, avatar.width, avatar.height);
        }

        // Restore the context state to avoid affecting other drawings
        context.restore();
    }
}
