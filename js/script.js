var sX, sY;
var shape;
var clickDown = false;
var shapeType = 2;
var fill = false;
var fill_clr = "#000000";

function drawBG(){
    var width = $( window ).width();
    var height = $( window ).height();
    var sq_size = 15;
    var c=$("#myCanvas");
    var s=$("#svgDraw");
    s[0].oncontextmenu = function (e) {
        e.preventDefault();
    };
    c[0].width = width;
    c[0].height = height;
    var ctx=c[0].getContext('2d');
    ctx.fillStyle="#DDDDDD";
    var odd = true;
    for(var i = 0; i <= width; i += sq_size){
        odd = !odd;
        for(var j = 0; j <= height; j += (sq_size * 2)){
            if(odd)
                ctx.fillRect(i,j,sq_size,sq_size);
            else
                ctx.fillRect(i,j +sq_size,sq_size,sq_size);                
        }
    }    
}

function init(){
    var s=document.getElementById("svgDraw");
    s.addEventListener("mousedown", MouseDown, false);
    s.addEventListener("mouseup", MouseUp, false);
    s.addEventListener("mousemove", MouseMove, false);


    $("#button-1").click(function(){shapeType = 1});
    $("#button-2").click(function(){shapeType = 2});
    $("#button-3").click(function(){shapeType = 0});    
    $("#button-4").click(function(){
        if(fill){
            fill = false;
            $("#button-4").text("Fill");
        }
        else{
            fill = true;
            $("#button-4").text("No fill");
        }
    });
    $("#button-5").click(function(){fill_clr = "#FFFFFF"});   
    $("#button-6").click(function(){fill_clr = "#000000"});   
}


function MouseDown(e){
    if(e.button == 0){
        StartShape(e.x - 60, e.y);
    }
}

function MouseUp(e){
    clickDown = false;
    document.body.style.cursor = "auto";
}

function MouseMove(e){
    if(clickDown){
        DrawingShape(e.x - 60, e.y);
    }
}

function StartShape(x, y){
    clickDown = true;
    sX = x;
    sY = y;
    var svgns = "http://www.w3.org/2000/svg";
    document.body.style.cursor = "crosshair";
    switch(shapeType){
    case 0:
        shape = document.createElementNS(svgns, 'rect');
        shape.setAttributeNS(null, 'x', x);
        shape.setAttributeNS(null, 'y', y);
        if(fill){
            shape.setAttributeNS(null, 'fill-opacity', '1.0');
        }
        else{
            shape.setAttributeNS(null, 'fill-opacity', '0.0');
        }
        shape.setAttributeNS(null, 'stroke', '#000000');
        shape.setAttributeNS(null, 'fill', fill_clr);
        document.getElementById('svgDraw').appendChild(shape);
        break;
    case 1:
        shape = document.createElementNS(svgns, "circle");
        shape.setAttributeNS(null, "cx", x);
        shape.setAttributeNS(null, "cy", y);
        shape.setAttributeNS(null, "r",  0);
        if(fill){
            shape.setAttributeNS(null, 'fill-opacity', '1.0');
        }
        else{
            shape.setAttributeNS(null, 'fill-opacity', '0.0');
        }
        shape.setAttributeNS(null, 'stroke', '#000000');
        shape.setAttributeNS(null, 'fill', fill_clr);
        document.getElementById('svgDraw').appendChild(shape);
        break;
    case 2:
        shape = document.createElementNS(svgns, 'ellipse');
        shape.setAttributeNS(null, 'cx', x);
        shape.setAttributeNS(null, 'cy', y);
        if(fill){
            shape.setAttributeNS(null, 'fill-opacity', '1.0');
        }
        else{
            shape.setAttributeNS(null, 'fill-opacity', '0.0');
        }
        shape.setAttributeNS(null, 'stroke', '#000000');
        shape.setAttributeNS(null, 'fill', fill_clr);
        document.getElementById('svgDraw').appendChild(shape);
        break;
    }
}

function DrawingShape(x, y){
    document.body.style.cursor = "crosshair";
    switch(shapeType){
    case 0:
        var v = y - sY;
        if(v < 0){
            shape.setAttributeNS(null, 'y', y);
            shape.setAttributeNS(null, 'height', -v);
        }
        else{
            shape.setAttributeNS(null, 'y', sY);
            shape.setAttributeNS(null, 'height', v);
        }
        v = x - sX;
        if(v < 0){
            shape.setAttributeNS(null, 'x', x);
            shape.setAttributeNS(null, 'width', -v);
        }
        else{
            shape.setAttributeNS(null, 'x', sX);
            shape.setAttributeNS(null, 'width', v);
        }
        break;
    case 1:
        var difX = x - sX;
        var difY = y - sY;
        var v = Math.sqrt(difX * difX + difY * difY);
        shape.setAttributeNS(null, "r",  v);
        break;
    case 2:
        var v = y - sY;
        if(v < 0){
            shape.setAttributeNS(null, 'ry', -v);
        }
        else{
            shape.setAttributeNS(null, 'ry', v);
        }
        v = x - sX;
        if(v < 0){
            shape.setAttributeNS(null, 'rx', -v);
        }
        else{
            shape.setAttributeNS(null, 'rx', v);
        }
        break;
    }
}

function EndShape(x, y){

}