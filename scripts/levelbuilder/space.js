function buildSpaceLevel(){
    buildSpaceLevel.run();
}
buildSpaceLevel.init = function(){
    this.objects = currentBuildingLevel.objects;
    this.dock = {
        w: 200,
        h: height,
        p: 10
    }
    this.nm = height / 100

    this.loadObjects();

    this.carrying = "asteroids";
    this.carryingsize = 25;

    this.tx = 0;
}
buildSpaceLevel.loadObjects = function(){
    FlyFreeplay.set(currentBuildingLevel, game.currentScene)
    FlyFreeplay.init();
    this.w = FlyFreeplay.level.w
}
buildSpaceLevel.runDock = function(){
    push();
    fill(50);
    rect(0, 0, this.dock.w, this.dock.h);

    pop();
}
buildSpaceLevel.display = function(){
    push();
    translate(this.dock.w, 0);

    FlyFreeplay(true, this.w + this.dock.w, 0);
    

    pop();

    this.runDock();
}
buildSpaceLevel.run = function(){
    this.display();

    if(clicked){
        this.placeObject();
    }

    this.tx += 15
    flyPlayer.x = constrain(this.tx + width/2, width/2, FlyFreeplay.level.w);
}
buildSpaceLevel.placeObject = function(){
    if(this.objects[this.carrying] && this.objects[this.carrying] instanceof Array){
        var mx = mouseX - this.dock.w - FlyFreeplay.transX;
        var my = mouseY;
        var xv = mx / height * 100;
        var yv = my / height * 100;
        this.objects[this.carrying].push([
            xv, yv,
            this.carryingsize
        ])
    } else {
        console.log(this.objects[this.carrying] +", "+this.carrying)
    }
    this.loadObjects();
}
