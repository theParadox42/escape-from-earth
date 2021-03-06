function FlyPlayer(x, y){
    this.x = x;
    this.y = y;
    //Having actual x and y velocities make it more realistic
    this.vx = 0;
    this.vy = 0;
    this.maxv = 14;
    this.r = 90; //rotation
    this.health = 3;
    this.w = 100;
    this.h = 40;
    this.speed = 5;
    this.rvel = 0;
    // Same thing until I change them
    this.offImg = {};
    this.onImg = {};
    this.shootCooldown = 0;
    this.thrustCooldown = 30;
}
FlyPlayer.prototype.init = function(){
    this.offImg = imgs.rocketOff;
    this.onImg = imgs.rocketOn;
    this.h = this.w * this.onImg.getHeight() / this.onImg.getWidth();
}
FlyPlayer.prototype.run = function(cx){
    this.display();
    this.control();
    this.update(cx);
    this.collide();
    if(this.health < 1){
        game.getFunc().init();
    }
}
FlyPlayer.prototype.displayHealth = function(){
    push();
    stroke(94, 94, 94);
    strokeWeight(10);
    fill(0, 0, 0)
    rect(width-200, 50, 150, 50);
    fill(39, 183, 20);
    noStroke();
    rect(width-200+5, 55, map(this.health, 0, 3, 0, 140), 40);
    pop();
}
FlyPlayer.prototype.update = function(cx){
    this.shootCooldown ++;
    this.thrustCooldown ++;
    this.r += this.rvel;
    this.rvel *= 0.9;
    this.x+=this.vx;
    this.y+=this.vy;
    var m = mag(this.vx, this.vy);
    if(m>this.maxv){
        this.vx *= this.maxv/m;
        this.vy *= this.maxv/m;
    }

    this.speed *= 0.9;
    this.speed = constrain(this.speed, -5, 5);

    if(this.y - this.h / 1.7 > height){
        this.y -= height + this.h / 1.8 + this.h / 1.7;
    } else if(this.y + this.h / 1.7 < 0){
        this.y += height + this.h / 1.8 + this.h / 1.7;
    }

    if(typeof cx == "number"){
        this.x = constrain(this.x, 0, abs(cx));
    } else {
        this.x = max(this.x, 0);
    }
}
FlyPlayer.prototype.collide = function(){
    for(var i in lasers){
        var l = lasers[i];
        if(l.belongsTo !== "player"){
            let distance = dist(this.x, this.y, l.x, l.y);
            let r = l.radius + (this.w + this.h) / 4;
            if (distance < r) {
                l.dead = true;
                this.health --;
            }
        }
    }
}
FlyPlayer.prototype.control = function(){
    if((keys[" "] || keys[32])&&this.thrustCooldown>30){
        this.speed += 0.3;
        this.vx*=0.8;
        this.vy*=0.8;
    	this.vx += this.speed*sin(this.r);
        this.vy -= this.speed*cos(this.r);
    } else {
        this.vx*=0.99;
        this.vy*=0.99;
    }
    if(keys.z && this.shootCooldown>15){
        lasers.push(new Laser(this.x, this.y, this.r, 20));
        this.shootCooldown = 0;
    }
    if(keys[RIGHT_ARROW]||keys.d){
        this.rvel += 0.5
    }
    if(keys[LEFT_ARROW]||keys.a){
        this.rvel -= 0.5
    }
    if(keys.x){
        this.speed*=0.8;
        this.vx*=0.8;
        this.vy*=0.8;
    }
}
FlyPlayer.prototype.display = function(){
    push();
    imageMode(CENTER); //rotate from center
    translate(this.x, this.y);
    rotate(this.r);
    // scale(this.w/this.imgT.width, this.h/this.imgT.height)
    if(keys[" "]||keys[32]){
        drawAnimation(this.onImg, 0, 0, this.w, this.h);
    } else {
        drawAnimation(this.offImg, 0, 0, this.w, this.h);
    }
    pop();
}
let flyPlayer = new FlyPlayer(100, 100)
