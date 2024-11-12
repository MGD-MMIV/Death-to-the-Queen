/*-------------------------------------------
Game Setup
 1. canvas 
 2. context
 3. frame rate
 4. animation timer runs main function 60 frames per second
-------------------------------------------*/
var c = document.querySelector(`canvas`)
var ctx = c.getContext(`2d`)
var fps = 1000/60
var timer = setInterval(main, fps)


/*------------Declare Variables Here--------*/
var avatarHealth = 100;
avatarHealth.color = `red`; 
avatarHealth.x = 10;
avatarHealth.y = 25;
//image reference for the avatar
var avatarImg = new Image();
avatarImg.src = "images/mrt.jpg";
avatarImg.onload = function() 
{
    timer = setInterval(main, fps);
}
var avatar = new GameObject();
avatar.color = `blue`;
avatar.x = 90;
avatar.y = 680;
avatar.w = 100;
avatar.h = 100;
avatar.vx = 3.5;
avatar.vy = 3.5;

//array for the pellets
var amt2 = 10;
var pellets = [];
for(var a=0; a<amt2; a++)
{
    pellets[a] = new GameObject();
    pellets[a].color = `blue`;
    pellets[a].x = avatar.x;
    pellets[a].y = avatar.y;
    pellets[a].w = 8;
    pellets[a].h = 8;
    pellets[a].vx = 6;
    pellets[a].vy = 6;
//collission detection for the pellets to the bugs
    while(pellets[a].overlaps(bugs[i]))
    {
        if(pellets[a].x < bugs[i].x)
        {
            bugs[i].x-=1;
        }
        if (pellets[a].x >= bugs[i].x)
        {
            pellets[a].x++;
        }
    }
}
var queen = new GameObject();
queen.color = `black`;
queen.w = 150;
queen.h = 150;
queen.vx = 4;
queen.vy = 4;

var testBug = new GameObject();
testBug.color = `red`;
testBug.x = 467;
testBug.y = 768;
testBug.w = 75;
testBug.h = 75;
testBug.vx = 4.5;
testBug.vy = 4.5;

var plat = new GameObject();
plat.color = `gray`;
plat.w = 2;
plat.h = 100;

var pwrup = new GameObject();
pwrup.color = `purple`;
pwrup.x = rand(0, c.width);
pwrup.y = rand(0, c.height);
pwrup.w = 6;
pwrup.h = 6;

var amt1 = 14;
var bugs = [];
for(var i=0; i<amt1; i++)
{
    bugs[i] = new GameObject();
    bugs[i].color = `green`;
    bugs[i].w = 75;
    bugs[i].h =75;
    bugs[i].x = rand(0, c.width);
    bugs[i].y = rand(0, c.height);
    bugs[i].vx = 4.5;
    bugs[i].vy = 4.5;
//collission detection for bugs to avatar
    while(bugs[i].overlaps(avatar))
    {
        if(bugs[i].x < avatar.x)
        {
            avatar.x-=1;
        }
        if(bugs[i].x >= avatar.x)
        {
            avatar.x++;
        }
    }
}


/*--------------main()------------------------
This is the function that makes the game work
---------------------------------------------*/

function main()
{
    //erases the screen//
    ctx.clearRect(0,0,c.width,c.height); 
    //avatar movement based on player input on the keyboard//
    if(d==true){avatar.x += avatar.vx;}
    if(a==true){avatar.x += -avatar.vx;}
    if(w==true){avatar.y += -avatar.vy;}
    if(s==true){avatar.y += avatar.vy;}
    //keeps the avatar on screen//
    if(avatar.x < 0 + avatar.w/2){avatar.x = 0 + avatar.w/2;}
    if(avatar.x > c.width + -avatar.w/2){avatar.x = c.width + -avatar.w/2;}
    if(avatar.y < 0 + avatar.h/2){avatar.y = 0 + avatar.h/2;}
    if(avatar.y > c.height + -avatar.h/2){avatar.y = c.height + -avatar.h/2;}  

    //draw the pictures//
    ctx.beginPath();
    ctx.moveTo();
    ctx.lineTo();

    //makes the avatar shoot in the direction the player is facing//
    if(space==true){pellets.x += pellets.vx;}

    //makes the bugs get "killed" when the pellets overlap the bugs//


}

//random number generator
function rand(_low, _high)
{
    return Math.random()*(_high - _low) + _low;
}
//Converts degrees to radians
function radians(_deg)
{
    return _deg * Math.PI/180
}

//Converts radians to degrees
function degrees(_rad)
{
    return _rad * 180/Math.PI
}
/*-------Diagram--------

               /|        c = the hypoteneuse
            c / |        b = height
             /  | b      a = width
            /   |        T = arch tangent angle
           /T___|
             a

--------------------------

To get a and b (displacement) when you know two points
  
    a = destination.x - starting.x
    b = destination.y - starting.y

To get the total distance (hypotenuese) between two points
    c = Math.sqrt(_a*_a + _b*_b)

To get the arc tangent angle (labeled T in the diagram)
    radians = Math.atan2(b, a)

To find a and b if you know c and T
    a = Math.cos(T) * c
    b = Math.sin(T) * c

*/
