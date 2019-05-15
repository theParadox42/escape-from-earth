var imgs = {};
function drawAnimation(anim, x, y, w, h){
    push();
    translate(x, y);
    scale(w/anim.getWidth(), h/anim.getHeight());
    animation(anim, 0, 0);
    pop();
};
function preload(){
    //Player
    imgs.player = loadImage("/art/earth/player.png");
    //Cloud
    imgs.cloud = loadAnimation("/art/cloud/00.png", "/art/cloud/04.png");
    imgs.cloud.frameDelay = 2;
    //Rocket
    //On
    imgs.rocketOn = loadAnimation("/art/rocket/rocketon/00.png","/art/rocket/rocketon/05.png");
    imgs.rocketOn.frameDelay = 5;
    //Off
    imgs.rocketOff = loadAnimation("/art/rocket/rocketoff/00.png", "/art/rocket/rocketoff/05.png");
    imgs.rocketOff.frameDelay = 5;
    imgs.martian = loadImage("/art/mars/martian.png");
    imgs.fueltank = loadImage("/art/mars/fuel.png");
    imgs.asteroid = loadImage("/art/space/asteroid.png");
}
