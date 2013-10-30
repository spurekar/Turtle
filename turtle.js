;

pendown = true;
deg = 0;
mouse = {};

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame || 
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function( callback ){ 
        return window.setTimeout(callback,1000/60); 
    }; 
})();

function main() {
    H = 0;
    W = 0;
    init();
    gameLoop();
};


function init() {
    H = window.innerHeight-50;
    W = window.innerWidth-50;

    //Set up main canvas
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.height = H;
    canvas.width = H;
    ctx.fillStyle = "#2E2E2E";
    ctx.fillRect(0,0,H,H);

    //Set up button canvas
    btncnvs = document.getElementById("btncnvs");
    var tempstr = "-" + (canvas.height +4) + "px";
    btncnvs.style.top = tempstr;
    btns = btncnvs.getContext("2d");
    btncnvs.height = H;
    btncnvs.width = H;
    
    //Create player
    player = new Player();

    //Set up path drawing
    ctx.beginPath();
    ctx.moveTo(player.xpos,player.ypos);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    //Capture key presses
    addEventListener('keydown', keypress, false);
    btncnvs.addEventListener('mousemove', trackPosition, false);
    btncnvs.addEventListener('mousedown', btnClick, false);
};

function gameLoop() {
    draw();
    requestAnimFrame(gameLoop);
};

function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "#2E2E2E";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.translate(player.xpos,player.ypos);

    //handle turns by rotating canvas
    ctx.rotate(deg*Math.PI/180);
    deg = 0;
    ctx.translate(-player.xpos,-player.ypos);

    //draw turtle
    player.draw();
    
    if (pendown == true) {
    //draw path
        ctx.lineTo(player.xpos,player.ypos);
    }
    ctx.stroke();

    clearBtn.draw();

    ctx.restore();
    btns.restore();
};

var Player = function() {
    this.xpos = canvas.width/2;
    this.ypos = canvas.height/2;

    this.draw = function() {
        var img = new Image();
        img.src = 'Turtle.png';
        ctx.drawImage(img,this.xpos-img.width/2,this.ypos-img.height/2);
    }

    this.moveLeft = function(dist) {
        this.xpos -= dist;
        console.log("left");
    }
    this.moveRight = function(dist) {
        this.xpos += dist;
        console.log("right");
    }
    this.moveForward = function(dist) {
        this.ypos -= dist;
        console.log("forward");
    }
    this.moveReverse = function(dist) {
        this.ypos += dist;
        console.log("reverse");
    }
};

clearBtn = {
    w: 70,
    h: 30,
    x: 10,
    y: 10,

    draw: function() {
        btns.strokeStyle = "white";
        btns.lineWidth = "2";
        btns.strokeRect(this.x,this.y,this.w,this.h);

        btns.font = "18px Arial, sans-serif";
        btns.textAlign = "center";
        btns.textBaseline = "middle";
        btns.fillStyle = "white";
        btns.fillText("Reset", this.x+35, this.y+15 );
    }
};

function keypress(e) { //e is event given by listener
    switch (e.which) {
        case 37: //left arrow
            player.moveLeft(20);
            break;
        case 38: //up arrow
            player.moveForward(20);
            break;
        case 39: //right arrow
            player.moveRight(20);
            break;
        case 40: //down arrow
            player.moveReverse(20);
            break;
        case 32: //spacebar
            deg += 90;
            console.log("turn");
            break;
        case 80: //p
            if (pendown== true) {
                pendown = false;
            }
            else { 
                pendown = true;
                ctx.moveTo(player.xpos,player.ypos);
            }
            console.log("pen changed");
            break;
        default:
            break;
    }
};

function btnClick(e) {
    //Store mouse positions
    var mx = e.offsetX;

    //Click start button
    if(mx >= clearBtn.x && mx <= (clearBtn.x + clearBtn.w)) {
        main();
    }
};

function trackPosition(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
}
