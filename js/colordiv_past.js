var colorvarleft, colorvarright, maincolorvar, selectcolorvar, colorslider, gradientLeft, gradientRight, colorCallBackFun, setColor="#000";
function AddColorDiv(d, f){
    colorCallBackFun = f;
    d3.select(d).style("background", "#eee");
    var svg = d3.select(d).append("svg").attr("width", 290).attr("height", 195)
        .on("contextmenu", function(d) {
            d3.event.preventDefault();
        })
        .on("mousedown", function (d) {
            d3.event.preventDefault();
        });


    d3.select(d).append("div").style("left", "256px").style("top", "8px").style("width", "25px").style("height", "25px").style("position","absolute").on("click", function(){f(setColor);})
        .append("img").attr("width", "25").attr("height", "25").attr("src", "./images/close_pop.png");

    var gradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("spreadMethod", "pad");

    gradientLeft = gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#000")
        .attr("stop-opacity", 1);

    gradientRight = gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#fff")
        .attr("stop-opacity", 1);

    for(var i = 0; i < 12; i++){
        var r, g, b;
        switch(i){
            case 0: r = 15; g = 0; b = 0; break;
            case 1: r = 15; g = 8; b = 0; break;
            case 2: r = 15; g = 15; b = 0; break;
            case 3: r = 8; g = 15; b = 0; break;
            case 4: r = 0; g = 15; b = 0; break;
            case 5: r = 0; g = 15; b = 8; break;
            case 6: r = 0; g = 15; b = 15; break;
            case 7: r = 0; g = 8; b = 15; break;
            case 8: r = 0; g = 0; b = 15; break;
            case 9: r = 8; g = 0; b = 15; break;
            case 10: r = 15; g = 0; b = 15; break;
            case 11: r = 15; g = 0; b = 8; break;
        }
        for(var j = 0; j < 5; j++){
            var col = GetColor(r, g, b, j);
            svg.append("rect").attr("x", i*20 + 10).attr("y", j*20 + 10).attr("width", 18).attr("height", 18).style("fill",col).on("mouseover", handleMouseOver).on("mouseout", handleMouseOut).on("click", handleClick).on("dblclick", handleDblclick);
        }
    }

    for(var i = 0; i < 12; i++){
        var col = "";
        switch(i){
            case 0: col="#fff"; break;
            case 1: col="#eee"; break;
            case 2: col="#ddd"; break;
            case 3: col="#bbb"; break;
            case 4: col="#aaa"; break;
            case 5: col="#999"; break;
            case 6: col="#888"; break;
            case 7: col="#777"; break;
            case 8: col="#555"; break;
            case 9: col="#333"; break;
            case 10: col="#222"; break;
            case 11: col="#000"; break;
        }
        svg.append("rect").attr("x", i*20 + 10).attr("y", 115).attr("width", 18).attr("height", 18).style("fill",col).on("mouseover", handleMouseOver).on("mouseout", handleMouseOut).on("click", handleClick).on("dblclick", handleDblclick);
    }

    selectcolorvar = colorvarleft = svg.append("rect").attr("x", 10).attr("y", 165).attr("width", 20).attr("height", 20).style("fill","#000000").style("stroke", "#000000").style("stroke-width", 2).on("click", selectColorSlide);
    colorvarright = svg.append("rect").attr("x", 210).attr("y", 165).attr("width", 20).attr("height", 20).style("fill","#ffffff").style("stroke", "#000000").style("stroke-width", 1).on("click", selectColorSlide);
    maincolorvar = svg.append("rect").attr("x", 238).attr("y", 145).attr("width", 40).attr("height", 40).style("fill",setColor).style("stroke", "#000000").style("stroke-width", 1).on("dblclick", handleDblclick);
    svg.append("rect").attr("x", 35).attr("y", 160).attr("width", 170).attr("height", 8).style("fill", "url(#gradient)");

    colorslider = d3.select(d).append("div").style("left", "35px").style("top", "165px").style("width", "170px").style("height", "20px").style("position","absolute").append("input").attr("type", "range").attr("min", 0).attr("max", 100).attr("value", 0).attr("oninput","mixColor(this.value)");
}

function handleMouseOver(d, i) {
    var t = d3.select(this);
    var x = parseInt(t.attr("x")) - 1;
    var y = parseInt(t.attr("y")) - 1;
    t.attr("x", x).attr("y", y).attr("width", 20).attr("height", 20);
}

function handleMouseOut(d, i) {
    var t = d3.select(this);
    var x = parseInt(t.attr("x")) + 1;
    var y = parseInt(t.attr("y")) + 1;
    t.attr("x", x).attr("y", y).attr("width", 18).attr("height", 18);
}

function handleClick(d, i){
    var t = d3.select(this);
    selectcolorvar.style("fill", t.style("fill"));
    if(selectcolorvar.attr("x") < 50){
        gradientLeft.attr("stop-color", t.style("fill"))
    }
    else{
        gradientRight.attr("stop-color", t.style("fill"))
    }
}

function handleDblclick(d, i){
    var t = d3.select(this);
    maincolorvar.style("fill", t.style("fill"));
    colorCallBackFun(t.style("fill"));
}

function selectColorSlide(d, i){
    selectcolorvar.style("stroke-width", 1);
    selectcolorvar = d3.select(this);
    selectcolorvar.style("stroke-width", 2);
}

function GetColor(r, g, b, j){
    var c = [r, g, b];
    switch(j){
        case 0:
        for(var i = 0; i < 3; i++){
            switch(c[i]){
                case 8: c[i] = 13; break;
                case 0: c[i] = 10; break;
            }
        }
        break;
        case 1:
        for(var i = 0; i < 3; i++){
            switch(c[i]){
                case 8: c[i] = 10; break;
                case 0: c[i] = 5; break;
            }
        }
        break;
        case 2:
        break;
        case 3:
        for(var i = 0; i < 3; i++){
            switch(c[i]){
                case 15: c[i] = 10; break;
                case 8: c[i] = 5; break;
            }
        }
        break;
        case 4:
        for(var i = 0; i < 3; i++){
            switch(c[i]){
                case 15: c[i] = 5; break;
                case 8: c[i] = 2; break;
            }
        }
        break;
    }
    var col = "#";
    for(var i = 0; i < 3; i++){
        col+= c[i].toString(16);
    }
    return col;
}

function mixColor(v){
    var s = colorvarleft.style("fill");
    var cl = s.match(/\d+/g);

    s = colorvarright.style("fill");
    var cr = s.match(/\d+/g);

    var r = parseInt((cl[0] * (100 - v) + cr[0] * v) / 100);
    var g = parseInt((cl[1] * (100 - v) + cr[1] * v) / 100);
    var b = parseInt((cl[2] * (100 - v) + cr[2] * v) / 100);
    
    var col = "#" + (r < 16 ? "0" : "") + r.toString(16) + (g < 16 ? "0" : "") + g.toString(16) + (b < 16 ? "0" : "") + b.toString(16);
    maincolorvar.style("fill", col);
}