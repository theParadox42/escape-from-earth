let manOnTheMoon = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    img: 0,
    run: function(){
        this.display();
    },
    display: function(){
        push();
        translate(this.x, this.y);
        imageMode(CENTER)
        image(this.img, 0, 0, this.w, this.h);
        pop();
    },
    init: function(){
        this.img = imgs.manOnTheMoon[0];
        this.w = max(width/3, height/2);
        this.h = this.w * this.img.height / this.img.width;
        this.x = width/2;
        this.y = height*0.67-this.h/2;
        console.log(this.w)
    }
}