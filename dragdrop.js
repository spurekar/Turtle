;

// start dragging
function startDrag(e){
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
    drag=true;
    // move div element
    document.onmousemove=dragDiv;
}

// continue dragging
function dragDiv(e){
    if(!drag){return};
    if(!e){var e=window.event};
    var targ=e.target?e.target:e.srcElement;
    // move div element
    targ.style.left=coordX+e.clientX-offsetX+'px';
    targ.style.top=coordY+e.clientY-offsetY+'px';
    console.log(targ.style.left,targ.style.top);
    return false;
}

// stop dragging
function stopDrag(){
    drag=false;
}

/*window.onload=function(){
    document.onmousedown=startDrag;
    document.onmouseup=stopDrag;
}*/