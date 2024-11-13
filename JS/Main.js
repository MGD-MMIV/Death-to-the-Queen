/*-------------------------------------------
Game Setup
 1. canvas 
 2. context
 3. frame rate
 4. animation timer runs main function 60 frames per second
-------------------------------------------*/
var c = document.querySelector(`MyCanvas`)
var ctx = c.getContext(`2d`)
var fps = 1000/60
var timer = setInterval(main, fps)

//Declaring character/enemy objects
var avatar; 
var Bugs;
var Queen;

//Animations vars and sourcing character image
let avaterIdle1 = new Image();
avatarIdle1 = 'Image/Exterminator/Mr.ExterminatorIdle1.png'

//declare characters as game objects
avatar = new GameObject();
Bugs = new GameObject();
Queen = new GameObject();

//load image
avaterIdle1.onload = () =>{
    ctx.drawImage(avaterIdle1,this.x,this.y,100,100);
}


