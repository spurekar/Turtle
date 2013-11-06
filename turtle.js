;

pendown = true;
rotate = 0;
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
    //ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "#2E2E2E";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.strokeStyle = "green";
    ctx.strokeRect(0,0,canvas.width,canvas.height);


    //handle turns by rotating canvas
    if (rotate != 0) {
        ctx.translate(player.xpos,player.ypos);
        ctx.rotate(rotate);
        ctx.translate(-player.xpos,-player.ypos);
        rotate = 0;
    };
   
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
    this.angle = 0;

    this.draw = function() {
        var img = new Image();
        img.src = 'Turtle.png';
        ctx.drawImage(img,this.xpos-img.width/2,this.ypos-img.height/2);
    }

};

Player.prototype= {
    turnTurtle:function(direction) {
        this.angle += {
            "right": -90, "left": 90
        }[direction]
        rotate = this.angle;
        console.log(this.angle);
    },

    SPEED: 10,
    move: function() {
        var vec = angleToVector(this.angle);
        this.xpos += vec.x * this.SPEED;
        this.ypos += vec.y * this.SPEED;
        console.log(this.xpos,this.ypos,this.angle);
    }
};

var angleToVector = function(angle) {
    var r = degToRad(angle);
    var x = -Math.sin(r);
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
            player.turnTurtle("left");
            console.log("left");
            break;
        case 38: //up arrow
            player.move();
            console.log("forward");
            break;
        case 39: //right arrow
            player.turnTurtle("right");
            console.log("right");
            break;
        case 40: //down arrow
            player.move;
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

    //Click start button
    if(mx >= clearBtn.x && mx <= (clearBtn.x + clearBtn.w)) {
        main();
    }
};

function trackPosition(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
}
