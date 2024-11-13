let canvas;
    let context;

    window.onload = init;

    function init(){
        canvas = document.getElementById('myCanvas');
        context = canvas.getContext('2d');

        // Start the first frame request
        window.requestAnimationFrame(gameLoop);
    }

    function gameLoop(timeStamp){
        draw();

        // Keep requesting new frames
        window.requestAnimationFrame(gameLoop);
    }

    var avatar;
    var bugs;
    var queen;
    


    function draw(){    
        
        var image = new Image();
        image.src = `Image/Level.png`;
        context.drawImage(image, 0, 0, 1300, 800, 0, 0, 1300, 800);
        var avatarIdle1 = new Image();
        avatarIdle1.src = 'Image/Exterminator/ExterminatorIdle1.png';
        context.drawImage(avatarIdle1,25,684);

    }