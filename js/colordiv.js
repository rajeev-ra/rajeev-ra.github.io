function ColorDiv(d, f){
    var _v = this;
    this.defaultColor = "#000";

    d3.select(d).style("background", "#eff");
    var svg = d3.select(d).append("svg").attr("width", 290).attr("height", 195).on("contextmenu", function(d) {d3.event.preventDefault();}).on("mousedown", function (d) {d3.event.preventDefault();});

    d3.select(d).append("div").style("left", "256px").style("top", "8px").style("width", "25px").style("height", "25px").style("position","absolute").on("click", function(){f(_v.defaultColor);})
        .append("img").attr("width", "25").attr("height", "25").attr("src", "./images/close_pop.png");

    var gradient = svg.append("defs").append("linearGradient").attr("id", "coldivgradient").attr("x1", "0%").attr("x2", "100%").attr("spreadMethod", "pad");

    this.GetColor = function (r, g, b, j){
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
            var col = this.GetColor(r, g, b, j);
            svg.append("rect").attr("x", i*20 + 10).attr("y", j*20 + 10).attr("width", 18).attr("height", 18).style("fill",col)
            .on("mouseover", function(){_v.handleMouseOver(this);})
            .on("mouseout", function(){_v.handleMouseOut(this);})
            .on("click", function(){_v.handleClick(this);})
            .on("dblclick", function(){_v.handleDblclick(this);});
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
        svg.append("rect").attr("x", i*20 + 10).attr("y", 115).attr("width", 18).attr("height", 18).style("fill",col)
        .on("mouseover", function(){_v.handleMouseOver(this);})
        .on("mouseout", function(){_v.handleMouseOut(this);})
        .on("click", function(){_v.handleClick(this);})
        .on("dblclick", function(){_v.handleDblclick(this);});
    }
    svg.append("rect").attr("x", 35).attr("y", 160).attr("width", 170).attr("height", 8).style("fill", "url(#coldivgradient)");

    this.gradientLeft = gradient.append("stop").attr("offset", "0%").attr("stop-color", "#000").attr("stop-opacity", 1);
    this.gradientRight = gradient.append("stop").attr("offset", "100%").attr("stop-color", "#fff").attr("stop-opacity", 1);
    this.colorvarleft = svg.append("rect").attr("x", 10).attr("y", 165).attr("width", 20).attr("height", 20).style("fill","#000000").style("stroke", "#000000").style("stroke-width", 2).on("click", function(){_v.selectColorSlide(this);});
    this.colorvarright = svg.append("rect").attr("x", 210).attr("y", 165).attr("width", 20).attr("height", 20).style("fill","#ffffff").style("stroke", "#000000").style("stroke-width", 1).on("click", function(){_v.selectColorSlide(this);});
    this.maincolorvar = svg.append("rect").attr("x", 238).attr("y", 145).attr("width", 40).attr("height", 40).style("fill",this.defaultColor).style("stroke", "#000000").style("stroke-width", 1).on("dblclick", function(){_v.handleDblclick(this);});
    this.selectcolorvar = this.colorvarleft;


    this.mixColor = function (v){
        var s = this.colorvarleft.style("fill");
        var cl = s.match(/\d+/g);

        s = this.colorvarright.style("fill");
        var cr = s.match(/\d+/g);

        var r = parseInt((cl[0] * (100 - v) + cr[0] * v) / 100);
        var g = parseInt((cl[1] * (100 - v) + cr[1] * v) / 100);
        var b = parseInt((cl[2] * (100 - v) + cr[2] * v) / 100);
        
        var col = "#" + (r < 16 ? "0" : "") + r.toString(16) + (g < 16 ? "0" : "") + g.toString(16) + (b < 16 ? "0" : "") + b.toString(16);
        this.maincolorvar.style("fill", col);
    }

    this.colorslider = d3.select(d).append("div").style("left", "35px").style("top", "165px").style("width", "170px").style("height", "20px").style("position","absolute").append("input").attr("type", "range").attr("min", 0).attr("max", 100).attr("value", 0)
        .on("input",function(){_v.mixColor(this.value);});
    
    this.handleMouseOver = function (d) {
        var t = d3.select(d);
        var x = parseInt(t.attr("x")) - 1;
        var y = parseInt(t.attr("y")) - 1;
        t.attr("x", x).attr("y", y).attr("width", 20).attr("height", 20);
    }

    this.handleMouseOut = function (d) {
        var t = d3.select(d);
        var x = parseInt(t.attr("x")) + 1;
        var y = parseInt(t.attr("y")) + 1;
        t.attr("x", x).attr("y", y).attr("width", 18).attr("height", 18);
    }

    this.handleClick = function(d){
        var t = d3.select(d);
        this.selectcolorvar.style("fill", t.style("fill"));
        if(this.selectcolorvar.attr("x") < 50){
            this.gradientLeft.attr("stop-color", t.style("fill"))
        }
        else{
            this.gradientRight.attr("stop-color", t.style("fill"))
        }
        this.mixColor(this.colorslider[0][0].value);
    }

    this.handleDblclick = function (d){
        var t = d3.select(d);
        this.defaultColor = t.style("fill");
        f(t.style("fill"));
    }

    this.selectColorSlide = function (d){
        this.selectcolorvar.style("stroke-width", 1);
        this.selectcolorvar = d3.select(d);
        this.selectcolorvar.style("stroke-width", 2);
    }
}