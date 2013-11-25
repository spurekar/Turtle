;

pendown = true;
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
    H = window.innerWidth/2;
    W = window.innerHeight/2;

    //Set up main canvas
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.height = H;
    canvas.width = H;
    ctx.fillStyle = "#2E2E2E";
    ctx.fillRect(0,0,H,H);

    //Create player
    player = new Player();

    //Set up path drawing
    ctx.beginPath();
    ctx.moveTo(player.xpos,player.ypos);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;

   /* //Create dragging elements
    forward = new Dragger();
    forward.img = document.getElementById("forward");
    forward.img.addEventListener('mousedown', forward.startDrag, false);
    reverse = new Dragger();
    reverse.img = document.getElementById("reverse"); 
*/

    //Capture key presses
    addEventListener('keydown', keypress, false);
    addEventListener('mousedown', btnClick, false);
};

function gameLoop() {
    draw();
    requestAnimFrame(gameLoop);
};

function draw() {
    //Create empty canvas
    ctx.fillStyle = "#2E2E2E";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.strokeStyle = "green";

    ctx.save();

    //handle turns by rotating canvas
    ctx.translate(player.xpos,player.ypos);
    ctx.rotate(degToRad(player.angle));
     
    //draw turtle
    player.draw();

    //rotate back
    ctx.rotate(degToRad(-player.angle));
    ctx.translate(-player.xpos,-player.ypos);
    
    if (pendown == true) {
        //draw path
        ctx.lineTo(player.xpos,player.ypos);
    }
    ctx.stroke();

    clearBtn.draw();
    forwardBtn.draw();
    reverseBtn.draw();
    rightTurnBtn.draw();
    leftTurnBtn.draw();
    spiralBtn.draw();

    ctx.restore();
};

var Player = function() {
    this.xpos = canvas.width/2;
    this.ypos = canvas.height/2;
    this.angle = 0;
    this.img = new Image();
    this.img.src = 'Turtle.png';

    this.draw = function() {
        ctx.drawImage(this.img,-this.img.width/2,-this.img.height/2);
    }
};

Player.prototype= {
    turnTurtle:function(direction) {
        this.angle += {
            "right": 90, "left": -90
        }[direction]
        rotate = this.angle;
        console.log(this.angle);
    },

    SPEED: 10,
    moveForward: function() {
        var vec = angleToVector(this.angle);
        this.xpos += vec.x * this.SPEED;
        this.ypos += vec.y * this.SPEED;
        console.log(this.xpos,this.ypos,this.angle);
    },

    moveBack: function() {
        var vec = angleToVector(this.angle);
        this.xpos -= vec.x * this.SPEED;
        this.ypos -= vec.y * this.SPEED;
        console.log(this.xpos,this.ypos,this.angle);
    }
};

var angleToVector = function(angle) {
    var r = degToRad(angle);
    var x = Math.sin(r);
    var y = -Math.cos(r);
    var normVec = this.normalize({x:x, y:y});
    return normVec;
};

var magnitude = function(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
};

var normalize = function(vector) {
    return {
        x: vector.x/magnitude(vector),
        y: vector.y/magnitude(vector)
    };
};

var degToRad = function(degrees) {
    return degrees*Math.PI/180;
};

clearBtn = {
    w: 80,
    h: 30,
    x: 10,
    y: 10,

    draw: function() {
        ctx.strokeStyle = "white";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x,this.y,this.w,this.h);

        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText("Reset", this.x+40, this.y+15 );
    }
};

forwardBtn = {
    w: 80,
    h: 30,
    x: 10,
    y: 50,

    draw: function() {
        ctx.strokeStyle = "white";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x,this.y,this.w,this.h);

        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText("Forward", this.x+40, this.y+15 );
    }
};

reverseBtn = {
    w: 80,
    h: 30,
    x: 10,
    y: 90,

    draw: function() {
        ctx.strokeStyle = "white";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x,this.y,this.w,this.h);

        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText("Reverse", this.x+40, this.y+15 );
    }
};

rightTurnBtn = {
    w: 80,
    h: 30,
    x: 10,
    y: 130,

    draw: function() {
        ctx.strokeStyle = "white";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x,this.y,this.w,this.h);

        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText("Right 90", this.x+40, this.y+15 );
    }
};

leftTurnBtn = {
    w: 80,
    h: 30,
    x: 10,
    y: 170,

    draw: function() {
        ctx.strokeStyle = "white";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x,this.y,this.w,this.h);

        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText("Left 90", this.x+40, this.y+15 );
    }
};

spiralBtn = {
    w: 80,
    h: 30,
    x: 10,
    y: 210,

    draw: function() {
        ctx.strokeStyle = "white";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x,this.y,this.w,this.h);

        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText("Spiral", this.x+40, this.y+15 );
    }
};


function keypress(e) { //e is event given by listener
    switch (e.which) {
        case 37: //left arrow
            player.turnTurtle("left");
            console.log("left");
            break;
        case 38: //up arrow
            player.moveForward();
            console.log("forward");
            break;
        case 39: //right arrow
            player.turnTurtle("right");
            console.log("right");
            break;
        case 40: //down arrow
            player.moveBack();
            console.log("backward");
            break;
        case 32: //spacebar
            console.log("nothing");
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
    var my = e.offsetY;
    console.log(mx,clearBtn.x);

    //Click start button
    if(mx >= clearBtn.x && mx <= (clearBtn.x + clearBtn.w)) {
        if(my >= clearBtn.y && my <= (clearBtn.y + clearBtn.h)) {
            main();
        }
        if(my >= forwardBtn.y && my <= (forwardBtn.y + forwardBtn.h)) {
            player.moveForward();
        }
        if(my >= reverseBtn.y && my <= (reverseBtn.y + reverseBtn.h)) {
            player.moveBack();
        }
        if(my >= rightTurnBtn.y && my <= (rightTurnBtn.y + rightTurnBtn.h)) {
            player.turnTurtle("right");
        }
        if(my >= leftTurnBtn.y && my <= (leftTurnBtn.y + leftTurnBtn.h)) {
            player.turnTurtle("left");
        }
    }
};

function trackPosition(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
};

