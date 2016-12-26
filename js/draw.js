var wheelDown = false;
var bgX = 0;
var bgY = 0;
function AddEventListeners(){    
    window.addEventListener("mousedown", MouseDown, false);
    window.addEventListener("mouseup", MouseUp, false);
    window.addEventListener("mousemove", MouseMove, false);
    window.addEventListener('mousedown', function(e){ e.preventDefault(); }, false);
}

function MouseDown(e){
    if(e.button == 1){
        wheelDown = true;
        document.body.style.cursor = 'all-scroll';
    }
}

function MouseUp(e){
    if(e.button == 1){
        wheelDown = false;
        document.body.style.cursor = "auto";
    }
}

function MouseMove(e){
    if(wheelDown){
        bgX += e.movementX;
        bgX %= 32;
        document.body.style.backgroundPositionX = bgX + "px";

        bgY += e.movementY;
        bgY %= 32;
        document.body.style.backgroundPositionY = bgY + "px";

        document.body.style.cursor = 'all-scroll';
    }
}