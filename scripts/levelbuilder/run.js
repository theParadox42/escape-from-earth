function buildRunMap(){
    background(200, 225, 250);

    if(typeof currentBuildingLevel != "object") return levelBuilder.setType("none");
    if(typeof buildRunObjs.length != "number") buildRunMap.update();


    push();
    translate(runPlayer.transX, 0);

    runGround.display();

    for(var i = 0; i < buildRunObjs.length; i ++){
        var o = buildRunObjs[i];
        o.display();
    }

    push();
    stroke(0);
    strokeWeight(2);
    for(var i = 0; i < currentBuildingLevel.map.length + 1; i ++){
        line(i * runObstacleWidth, 0, i * runObstacleWidth, height);
    }
    pop();

    runPlayer.updateTranslate(true, currentBuildingLevel.map);

    buildRunMap.menu.runItems();
    if(clicked){
        buildRunMap.menu.handleClick();
    }

    pop();
}
var buildRunObjs = null;

buildRunMap.handleClick = function(){
}
buildRunMap.init = function(){
    this.carrying = "x";
    runPlayer.reset();
    runPlayer.x = 0;
    runGround.init();
    this.menu.init();
};
buildRunMap.menu = {
    carrying: "_",
    items: {},
    paused: false,
    pause: function(){
        resetMatrix();
        push();
        fill(0, 0, 0, 150);
        noStroke();
        rect(0, 0, width, height);
        pop();
        this.pausedImg = get();
        this.paused = true;
    },
    update: function(){
        buildRunObjs = [];
        var runmap = currentBuildingLevel.map;
        for(var i = 0; i < runmap.length; i ++){
            switch(runmap[i]){
                case "x":
                    buildRunObjs.push(new RunTrash(i * runObstacleWidth));
                break;
                case "c":
                    buildRunObjs.push(new RunCar(i * runObstacleWidth))
                break;
                case "^":
                    buildRunObjs.push(new RunSpike(i * runObstacleWidth))
                break;
                case "l":
                    buildRunObjs.push(new RunStreetLight(i * runObstacleWidth));
                break;
            }

        }

    },
    getDockDimensions: function(){
        var dockWidth = this.items.length * this.iconSize + this.items.length * this.padding,
        dockHeight = this.padding*2+this.iconSize,
        dx = width / 2 - dockWidth / 2,
        dy = this.padding;
        return {
            x: dx,
            y: dy,
            w: dockWidth,
            h: dockHeight
        }
    },
    runItems: function(){

        var savedClickData = clicked,
            savedMouseX = mouseX,
            savedMouseY = mouseY;
        if(this.paused) {
             clicked = false;
             mouseX = -1;
             mouseY = -1;
        }

        // the Dock/Blocks
        push();
        fill(255, 200);
        noStroke();
        var d = this.getDockDimensions();
        rect(d.x, d.y, d.w, d.h, this.padding);
        var j = 0;
        for(var i in this.items){
            if(i == "length") continue;
            var x = map(j, 0, this.items.length, d.x+this.padding, d.x+d.w-this.padding);
            image(this.items[i].img,x+(this.iconSize-this.items[i].w)/2, d.y+this.padding+(this.iconSize-this.items[i].h)/2, this.items[i].w, this.items[i].h);
            if(mouseX>x&&mouseX<x+this.iconSize&&mouseY>d.y+this.padding&&mouseY<d.y+d.h-this.padding){
                cursor(HAND);
                if(clicked){
                    if(this.items[i].paused){
                        this.pause();
                    } else {
                        this.carrying = i;
                    }
                    clicked = false;
                    savedClickData = false;
                }
            }
            j ++;
        }
        pop();

        // The left and right arrows
        push();
        var arrows = {
            cy: height/2,
            w: 50,
            h: 50
        }

        pop();


        if(this.paused) return this.runPause(savedMouseX, savedMouseY, savedClickData);

        // Handle clicks outside of buttons & stuff
        if(mouseX>d.x&&mouseX<d.x+d.w&&mouseY>d.y&&mouseY<d.y+d.h){
            clicked = false;
        } else {
            cursor("none");
            var itemCarrying = this.items[this.carrying];
            image(itemCarrying.img, mouseX-itemCarrying.w/2, mouseY-itemCarrying.h/2, itemCarrying.w, itemCarrying.h)
        }
    },
    runPause: function(smx, smy, sc){
        mouseX = smx;
        mouseY = smy;
        clicked = sc;

        push();
        image(this.pausedImg, 0, 0, width, height);

        fill(245);
        stroke(10);
        strokeWeight(3);
        rect(width/4,    100,  width/2,    80, 20);
        rect(width/4,    200,  width/4-10, 80, 20);
        rect(width/2+10, 200,  width/4-10, 80, 20);
        rect(width/4,    300,  width/4-10, 60, 20);
        rect(width/2+10, 300,  width/4-10, 60, 20);
        noStroke();
        fill(10);
        textFont(fonts.londrina);
        textSize(50);
        textAlign(CENTER, CENTER);
        text("Resume",      width/2, 140);
        text("Save",        width/4, 240, width/4);
        text("Save & Quit", width/2, 240, width/4);
        textSize(30);
        text("Quit",        width/4, 330, width/4);
        text("Edit Name",   width/2, 330, width/4);
        pop();

        clicked = false;
    },
    handleClick: function(){
        if(this.paused){
        } else {
            this.placeBlock();
        }
    },
    placeBlock: function(){

        var i = floor((mouseX-runPlayer.transX) / runObstacleWidth);
        if(i == currentBuildingLevel.map.length - 1) return;
        var mapArr = currentBuildingLevel.map.split("");
        if(mapArr[i] == "="){
            mapArr[i-1] = "_";
        } else if(mapArr[i] == "c"){
            mapArr[i+1] = "_";
        }
        mapArr[i] = this.carrying;
        if(this.carrying == "c"){
            mapArr[i+1] = "=";
        }
        currentBuildingLevel.map = mapArr.join("");

        this.update();
    },
    init: function(){
        this.padding = 20;
        this.iconSize = 80;
        this.update();

        // Image stuff
        var imgPairs = {
            "x": "trash",
            "^": "spike",
            "l": "streetlight",
            "c": "brokenCar",
            "_": "x",
            "pause": "pausebtn"
        }
        this.items = {};
        this.items.length = 0;
        for(var i in imgPairs){

            this.items[i] = {
                img: imgs[imgPairs[i]],
            }
            if(this.items[i].img.width > this.items[i].img.height){
                this.items[i].w = this.iconSize;
                this.items[i].h = this.iconSize * this.items[i].img.height / this.items[i].img.width;
            } else {
                this.items[i].h = this.iconSize;
                this.items[i].w = this.iconSize * this.items[i].img.width / this.items[i].img.height;
            }
            if(i.length != 1) this.items[i].paused = true;
            this.items.length ++;
        }
    }
}
