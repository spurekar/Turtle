function main() {
    init();
    player.draw();
};


function init() {
    H = window.innerHeight;
    W = window.innerWidth;

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.height = H;
    canvas.width = W;
    ctx.fillStyle = "#2E2E2E";
    ctx.fillRect(0,0,W,H);

    player = new Player();
};

var Player = function() {
    var xpos = canvas.width/2;
    var ypos = canvas.height/2;

    this.draw = function() {
        var img = new Image();
        img.src = 'Turtle.png';
        ctx.drawImage(img,xpos,ypos);
    }
};

