// Boolean to see if button is pressed or not
var w = false;
var a = false;
var s = false;
var d = false
var space = false;

//Detecting Key press

document.addEventListener('keydown', press);
function press (e){
    if (e.keycode == 87){w=true;}
    if (e.keycode == 83){s=true;}
    if (e.keycode == 65){a=true;}
    if (e.keycode == 68){d=true;}
    if (e.keycode == 32){space =true;}
}
 //key release

 document.addEventListener('keyup', release);
 function release(e){
    if (e.keycode == 87){w=false;}
    if (e.keycode == 83){s=false;}
    if (e.keycode == 65){a=false;}
    if (e.keycode == 68){d=false;}
    if (e.keycode == 32){space =false;}
 }