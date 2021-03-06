function RunBuilding(x, z, h, type){
    this.x = x;
    this.y = runGround.y - h;
    this.z = z;
    this.vx = 1/this.z;
    this.img = imgs.buildings[type];
    this.w = h * this.img.width / this.img.height;
    this.h = h;
}
RunBuilding.prototype.update = function(p){
    this.x -= this.vx * (p.ptransX - p.transX);
    if(this.x+this.w+10<0){
        this.x+=width+this.w+15;
    } else if(this.x - 10 > width){
        this.x -= width+this.w+15;
    }
}
RunBuilding.prototype.display = function(){
    push();
    image(this.img, this.x, this.y, this.w, this.h);
    pop();
}
RunBuilding.prototype.run = function(p){
    if(p) this.update(p);
    this.display();
}


function BuildBuilding(x, z, h, type){
    RunBuilding.call(this, x, z, h, type);
    this.y = height-h;
    this.vx *= bGame.scaleFactor;
};
BuildBuilding.prototype = Object.create(RunBuilding.prototype);
