function RunPlayer(x, y){
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = this.w;
    this.slowSpeed = 6;
    this.normalSpeed = 10;
    this.fastSpeed = 15;
    this.vx = this.normalSpeed;
    this.gvx = this.vx;
    this.vy = 0;
    this.mvx = 5;
    this.mvy = 20;
    this.transX = 0;
    this.controlTrans = true;
    this.grounded = false;
    this.ducking = false;
};
RunPlayer.prototype.init = function(){
    this.img = imgs.player;
    this.h = this.w*this.img.height/this.img.width;
    this.dh = this.h/2.3;
    this.oh = this.h;
    this.y = runGround.y-this.h;
    this.ox = this.x;
    this.oy = this.y;
};
RunPlayer.prototype.collide = function(){
    if(this.y+this.h+this.vy>runGround.y){
        this.vy = min(0, this.vy);
        this.grounded = true;
    }
}
RunPlayer.prototype.control = function(){
    var xs = this.ducking ? 0.6 : 1;
    if(keys[RIGHT_ARROW] || keys.d){
        this.gvx = this.fastSpeed * xs;
    } else if(keys[LEFT_ARROW] || keys.a){
        this.gvx = this.slowSpeed * xs;
    } else {
        this.gvx = this.normalSpeed * xs;
    } if((keys[DOWN_ARROW] || keys.s) && !this.grounded){
        this.vy+=0.3;
    } if((keys[UP_ARROW] || keys.w || keys[32] || mouseIsPressed) && this.grounded){
        this.vy-=15;
    } else if(keys[DOWN_ARROW] || keys.s){
        if(this.grounded && !this.ducking){
            this.y += abs(this.dh-this.oh)+1;
            this.ducking = true;
        } else if(!this.grounded){
            this.ducking = false;
        }
    } else {
        this.ducking = false;
    }
    this.h = this.ducking ? this.dh : this.oh;
}
RunPlayer.prototype.update = function(){
    //Collisions
    this.collide();
    //Input
    this.control();
    // Gravity
    this.vy+=0.5;
    // Friction
    this.vy *= 0.99;
    // Max velocities
    this.vy = constrain(this.vy, -this.mvy, this.mvy);
    // Smooth speed changes
    this.vx = lerp(this.vx, this.gvx, 0.1);
    // Position affected by speed
    this.x+=this.vx;
    this.y+=this.vy;
    this.y = min(this.y, runGround.y-this.h);
    // Resets grounded
    this.grounded = false;
    // Translate
    this.viewSpace = width/3;
    if(this.x > this.viewSpace && this.controlTrans){
        this.transX = -this.x+this.viewSpace;
    }
};
RunPlayer.prototype.display = function(){
    push();
    translate(this.x+this.w/2,this.y);

    if (this.vx>=0) scale(-1, 1);
    image(this.img, -this.w/2, 0, this.w, this.h);

    pop();
};
RunPlayer.prototype.run = function(){
    this.update();
    this.display();
};
RunPlayer.prototype.reset = function(){
    this.vx = 0;
    this.vy = 0;
    this.x = this.ox;
    this.y = this.oy;
    this.transX = 0;
    this.controlTrans = true;
}
let runPlayer = new RunPlayer(-100,0);
