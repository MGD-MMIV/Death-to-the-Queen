let canvas;
let context;
let climbDistance = 20;

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
        canvas.width = 1300;
        canvas.height = 800;
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

let bullet = [];

function shootBullet(){
    bullet.push({
    x:  avatar.facingLeft ? avatar.x : avatar.x + avatar.width, // Center of character
    y: avatar.y + avatar.height / 2 -5,
    width: 10,
    height: 10,
    speed: 5,
    direction: avatar.facingLeft ? -1 : 1 
    });
}

function die(dead){
    dead.y = 900;
}



function update(){
    // Update position
    avatar.x += avatar.speedX;
    avatar.y += avatar.speedY;
    // update the avatars climbing state
    function updateAvatarPosition() {
        if (isAvatarNearLadders(avatar, ladders) && avatar.isClimbing) {
            if (keys["ArrowUp"]) {
                avatar.y -=2;
            }
            if (keys["ArrowDown"]) {
                avatar.y += 2;
            }
        }
    }
    // Apply gravity if in the air
    if (!avatar.onGround) {
        avatar.speedY += avatar.gravity;
    }
    
    // Collision with ground and walls
    if (avatar.y >= 684) {  // Assuming ground level is y=684
        avatar.y = 684;
        avatar.speedY = 0;
        avatar.onGround = true;
    }
    if (avatar.x < 0) avatar.x = 0;
    if (avatar.x + avatar.width > canvas.width) avatar.x = canvas.width - avatar.width;

    // ensures avatar climbs ladder when avatar is at ladder coordinates
    if (avatar.x>= ladders.x && avatar.x <= ladder.x + ladder.width) {
        avatar.y -=2;
}
    ladders.forEach (function(ladder, index) {
        console.log(`Ladder ${index + 1}:`, ladder);
    });
    
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

    bullet.forEach((b, index) => {
        b.x += b.speed * b.direction;

        // Check for out-of-bounds bullets
        if (b.x + b.width < 0 || b.x > canvas.width) {
            bullet.splice(index, 1);
            return;
        }

        if (
            b.x < enemy1.x + enemy1.width &&
            b.x + b.width > enemy1.x &&
            b.y < enemy1.y + enemy1.height &&
            b.y + b.height > enemy1.y
        ) {
            enemy1.hp -= avatar.dmg; // Decrease enemy health
            bullet.splice(index, 1); // Remove bullet on impact

            // Check if enemy is defeated
            if (enemy1.hp <= 0) {
                console.log("Enemy defeated!");
                die(enemy1);
            }
        }
    });
}
function isAvatarNearLadders(avatar, ladders) {
                    return(
                        avatar.x + avatar.width > ladders.x && 
                        avatar.x < ladders.x + ladders.width &&
                        Math.abs(avatar.y + avatar.height - ladders.y) <= climbDistance
                    );
}

function draw(){
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);


    //draw the avatar
    context.fillStyle = `blue`;
    context.fillRect(avatar.x, avatar.y, avatar.width, avatar.height);

    //draw the ladders
    ladders.forEach(ladder => {
        context.fillStyle = "blue";
        context.fillRect(ladders.x, ladders.y, ladders.width, ladders.height);
    });
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

    context.fillStyle = 'green';
    bullet.forEach((bullet) => {
        context.fillRect(bullet.x,bullet.y,bullet.width,bullet.height)
    })

    let enemy1Image = new Image();
            if (enemy1.isIdle){
                enemy1Image.src = enemyIdle[enemy1.currentFrame];
                context.drawImage(enemy1Image,enemy1.x,enemy1.y,enemy1.width,enemy1.height);
            }
        }
gameLoop();
