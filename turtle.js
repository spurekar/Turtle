function main() {
    init();
    player.draw();
};


function init() {
    H = window.innerHeight-100;
    W = window.innerWidth-100;

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.height = H;
    canvas.width = W;
    ctx.fillStyle = "#2E2E2E";
    ctx.fillRect(0,0,W,H);

    player = new Player();

    addEventListener('keydown', keypress, false);
};

var Player = function() {
    var xpos = canvas.width/2;
    var ypos = canvas.height/2;

    this.draw = function() {
        var img = new Image();
        img.src = 'Turtle.png';
        ctx.drawImage(img,xpos,ypos);
    }

    this.moveLeft = function() {
        console.log("left");
    }
    this.moveRight = function() {
        console.log("right");
    }
    this.moveForward = function() {
        console.log("forward");
    }
    this.moveReverse = function() {
        console.log("reverse");
    }
    this.moveTurn = function() {
        console.log("turn");
    }
};

function keypress(e) { //e is event given by listener
    switch (e.which) {
        case 37: //left arrow
            player.moveLeft();
            break;
        case 38: //up arrow
            player.moveForward();
            break;
        case 39: //right arrow
            player.moveRight();
            break;
        case 40: //down arrow
            player.moveReverse();
            break;
        case 32: //spacebar
            player.moveTurn();
            break;
        default:
            break;
    }
};
