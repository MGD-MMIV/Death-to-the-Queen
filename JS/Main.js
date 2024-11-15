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
    jumpPower: -10,
    onGround: true,
};

window.onload = init;

function init(){
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    window.requestAnimationFrame(gameLoop);
}


//Declares function which is than put into EventListener Above for Keydown and Key up
function keyDownHandler(event){
    if (event.key === 'd') avatar.speedX = 5;       // Move right
    if (event.key === 'a') avatar.speedX = -5;      // Move left
    if (event.key === 'w' && avatar.onGround) {     // Jump
        avatar.speedY = avatar.jumpPower;
        avatar.onGround = false;
    }
    if (event.key === 's') avatar.speedY = 5;       // Move down for crouch
}

function keyUpHandler(event){
    if (event.key === 'd' || event.key === 'a') avatar.speedX = 0; // Stop horizontal movement
    if (event.key === 's') avatar.speedY = 0; // Stop downward movement if `s` was held for descend/crouch
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

    // Gravity effect
    if (!avatar.onGround) {
        avatar.speedY += avatar.gravity;
    }

    // Collision with ground
    if (avatar.y >= 684) {  // Assuming ground level is y=684
        avatar.y = 684;
        avatar.speedY = 0;
        avatar.onGround = true;
    }
}

function draw(){
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    let background = new Image();
    background.src = 'Image/Level.png';
    context.drawImage(background, 0, 0, 1300, 800);

    // Draw character (idle or move frame)
    let avatarImage = new Image();
    avatarImage.src = 'Image/Exterminator/ExterminatorIdle1.png';
    context.drawImage(avatarImage, avatar.x, avatar.y, avatar.width, avatar.height);
}
