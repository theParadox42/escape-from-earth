var scripts;
var libs;

var load = {
    amount: 0,
    needed: 0
}
$.getJSON("/scripts/scripts.json", function(jsonData){
    scripts = jsonData.scripts;
    libs = jsonData.libs;

    for(var i in scripts){
        for(var j = 0; j < scripts[i].length; j ++){
            load.needed++;
            loadScript("/scripts/"+i+"/"+scripts[i][j], function(){
                load.amount ++;
                if(load.amount >= load.needed){

                    for(var i = 0; i < libs.length; i ++){
                        loadScript("/libs/"+libs[i])
                    }
                }
            });
        }
    }
});

function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var body = document.querySelector("body");
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    body.appendChild(script);
};