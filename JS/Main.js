/*-------------------------------------------
Game Setup
 1. canvas 
 2. context
 3. frame rate
 4. animation timer runs main function 60 frames per second
-------------------------------------------*/
var c = document.querySelector(`myCanvas`);
var ctx = c.getContext(`2d`);
var fps = 1000/60;
var timer = setInterval(main, fps);




//Declaring character/enemy objects
var c = document.getElementById("myCanvas");
var img = new Image();
img.src = "Image/Level.png";
img.onload = function() 
{
    ctx.drawImage(img.src, 10, 10, 1300, 800);
    
};
var avatar; 
var bugs;
var queen;

//Animations vars and sourcing character image
let avatarIdle1 = new Image();
avatarIdle1 = 'Image/Exterminator/ExterminatorIdle1.png'

//declare characters as game objects
avatar = new GameObject();
bugs = new GameObject();
queen = new GameObject();

//load image
avatarIdle1.onload = () =>{
    ctx.drawImage(avatarIdle1,this.x,this.y,100,100);
}


