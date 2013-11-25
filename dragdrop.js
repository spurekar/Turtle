;

var Dragger = function() {
    //this.img = img;
    this.xpos = 0;
    this.ypos = 0;
    this.current = false;
    //this.img.addEventListener('mousedown', this.startDrag, false);
    //this.addEventListenter('mouseup', this.stopDrag, false);
    //this.addEventListener('mousemove', this.dragDiv, false);

    this.draw = function() {
        ctx.drawImage(this.img, this.xpos, this.ypos);
    };
};

Dragger.prototype = {
    // start dragging
    startDrag:function(e){
        // determine event object
        if(!e){var e=window.event};
        // determine target element
        var targ=e.target?e.target:e.srcElement;
        if(targ.className!='draggable'){
            btnClick(e);
            return;
        };
        // calculate event X,Y coordinates
        offsetX=e.clientX;
        offsetY=e.clientY;
        // assign default values for top and left properties
        if(!targ.style.left){targ.style.left='0px'};
        if(!targ.style.top){targ.style.top='0px'};
        // calculate integer values for top and left properties
        coordX=parseInt(targ.style.left);
        coordY=parseInt(targ.style.top);
        this.current = true;
        // move div element
        document.onmousemove=dragDiv;
    },

    // continue dragging
    divDrag:function(e){
        if(this.drag != true){return};
        if(!e){var e=window.event};
        var targ=e.target?e.target:e.srcElement;
        // move div element
        targ.style.left=coordX+e.clientX-offsetX+'px';
        targ.style.top=coordY+e.clientY-offsetY+'px';
        console.log(targ.style.left,targ.style.top);
        return false;
    },

    // stop dragging
    stopDrag:function(){
        this.current = false;
    }
};

/*window.onload=function(){
  document.onmousedown=startDrag;
  document.onmouseup=stopDrag;
  }*/
