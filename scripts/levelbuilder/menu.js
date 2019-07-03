function levelBuilderMenu(){

    background(225);

    levelBuilderMenu.home.check();

    if(levelsBuilt.length <= 0){
        push();
        textAlign(CENTER, BOTTOM);
        fill(0);
        textFont(fonts.londrina);
        textSize(40);
        text("You don't have any levels", width/2, height/2-60);
        pop();

        push();
        fill(255);
        stroke(0);
        strokeWeight(5);
        textFont(fonts.londrina);
        textSize(25);
        levelBuilderMenu.newLevel.draw(color(0));
        pop();
    } else {
        push();
        translate(0, 100);
        scroller.update();
        let p = 20;
        var x = p;
        var y = p;
        let w = communityDisplays[0].w;
        let h = communityDisplays[0].h;
        var across = floor(width/(w+p));
        var going = 0;
        var my = 0;
        for(var i = 0; i < communityDisplays.length; i ++){
            communityDisplays[i].draw(x, y);
            going++;
            x+=p+w;
            if(going>=across){
                x = p;
                y+=h+p
                going = 0;
                if(y+h>height-100){
                    my = y+h-height+100+p;
                }
            }
        }
        if(scroller.maxY == undefined){
            scroller.maxY = -my;
        }
        pop();
    }

    push();
    noStroke();
    fill(0, 0, 0, 10);
    rect(0, 95, width, 10);
    fill(255);
    rect(0, 0, width, 100);
    textAlign(CENTER, BOTTOM);
    fill(0);
    textFont(fonts.arcade);
    textSize(50);
    stroke(200);
    strokeWeight(3);
    text("Level Builder", width/2, 75);

    pop();

    push();
    fill(255);
    stroke(0);
    strokeWeight(5);
    textFont(fonts.bladerunner);
    textSize(25);
    levelBuilderMenu.home.display(color(0));
    pop();

}
levelBuilderMenu.init = function(){
    this.home = new Button("Home", 10, height-60, 100, 50, function(){
        game.setScene("home");
    })
    this.newLevel = new Button("New Level", width/2-100, height/2-30, 200, 60, function(){
        levelBuilder.building = "new";
        createNewLevel.init();
    })
}
