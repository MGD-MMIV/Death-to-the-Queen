let canvas;
let context;

let avatarIdle = [
    'Image/Exterminator/ExterminatorIdle1.png',
    'Image/Exterminator/ExterminatorIdle2.png'
];

let avatarWalk = [
    'Image/Exterminator/ExterminatorRunning&Jumping.png',
    'Image/Exterminator/ExterminatorRun2.png'
];

let avatarCrouch = 'Image/Exterminator/ExterminatorCrouch.png'; // Crouch image

let enemyIdle = [
    'Image/NormalEnemies/NormalEnemieIdle1.png',
    'Image/NormalEnemies/NormalEnemieIdle2.png'
]

let enemyAttack = [
    'Image/NormalEnemies/NormalEnemieAttack.png'
]

window.onload = init;

function init(){
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    window.requestAnimationFrame(gameLoop);
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

        if (enemy1.isIdle){
            enemy1.currentFrame = (enemy1.currentFrame+ 1) % enemyIdle.length;
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

        let enemy1Image = new Image();
            if (enemy1.isIdle){
                enemy1Image.src = enemyIdle[enemy1.currentFrame];
                context.drawImage(enemy1Image,enemy1.x,enemy1.y,enemy1.width,enemy1.height);
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
