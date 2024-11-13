/*-------------------------------------------
Game Setup
 1. canvas 
 2. context
 3. frame rate
 4. animation timer runs main function 60 frames per second
-------------------------------------------*/
var c = document.querySelector('#myCanvas');  // Ensure this matches your canvas element's ID
var ctx = c.getContext('2d');
var fps = 1000 / 60;
var timer = setInterval(main, fps);

// Declaring character/enemy objects
var avatar;
var bugs;
var queen;

// Declare characters as game objects
avatar = new GameObject();
bugs = new GameObject();
queen = new GameObject();

// Animations vars and sourcing character image
var avatarIdle1 = new Image();
avatarIdle1.src = "Image/Exterminator/ExterminatorIdle1.png";
avatarIdle1.onload = function() {
    ctx.drawImage(avatarIdle1, 1, 1, 100, 100);  // Adjust width and height as needed
};

avatarIdle1.onload = function() {
    console.log("Image loaded successfully.");
    ctx.drawImage(avatarIdle1, 0, 0, 100, 100); // Adjust the position and size as needed
};

avatarIdle1.onerror = function() {
    console.error("Failed to load image. Check the path:", avatarIdle1.src);
};

function main()
{
    //erases the screen
    ctx.clearRect(0,0,c.width,c.height); 

    //moves the player if the variables in the controls.js are equal to true
    if(d==true){ avatar.x += avatar.vx; }
    if(a==true){ avatar.x += -avatar.vx;}
    if(w==true){ avatar.y += -avatar.vy;}
    if(s==true){ avatar.y += avatar.vy; }

    /*-----------collision detection--------------------
    collision detection ALWAYS goes before the render and...
    usually goes after the movement of the objects
    ---------------------------------------------------*/

    //Keeps avatar on screen
    if(avatar.x < 0 + avatar.w/2){avatar.x = 0 + avatar.w/2;}
    if(avatar.x > c.width + -avatar.w/2){avatar.x = c.width + -avatar.w/2;}
    if(avatar.y < 0 + avatar.h/2){avatar.y = 0 + avatar.h/2;}
    if(avatar.y > c.height + -avatar.h/2){avatar.y = c.height + -avatar.h/2;} 

}