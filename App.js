var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
var list=[];

const HEIGHT=800;
const WIDTH=1400;
var gameover=false;
var date=new Date();
let d;

createEntity =function(colour,size,x,y,speedX,speedY){
    var player={
        colour: colour,
        size: size,
        x: x,
        y:y,
        speedX:speedX,
        speedY:speedY,
        
    }
    list.push(player);
}

var speed=20;

enemyCreate=function()
{
    if(gameover)
    return;
    speed--;
    var r=Math.random();
    var r2=Math.random();
    createEntity("red",15,r*WIDTH,r2*HEIGHT,r*speed,r2*speed)
}

createEntity("green",10,000,000,5,5);


var update=function()
{
    for(var index=1;index<list.length;index++)
    {
        
        var i=list[index];
        if(distance(i)<=13)
        {
            gameover=true;
            d=new Date();
        }
        i.x+=i.speedX;
        i.y+=i.speedY;
        if(i.x>WIDTH-i.size||i.x<0)
            i.speedX=-i.speedX;
        if(i.y>HEIGHT-i.size||i.y<0)
            i.speedY=-i.speedY;
        
    }

    
    draw();
}


draw =function()
{
    if(gameover)
    {
        Over();
        return;
    }
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    for(var index=0;index<list.length;index++)
    {
        var i=list[index];
        ctx.fillStyle = i.colour;
        ctx.fillRect(i.x,i.y,i.size,i.size);
        ctx.fillStyle = "black";
    }  
}

distance = function (enemy) {
    let x=Math.pow(enemy.x-list[0].x,2);
    let y=Math.pow(enemy.y-list[0].y,2);
    return Math.sqrt(x+y)
}

setInterval(enemyCreate,4000);
setInterval(update,20);


window.addEventListener("keydown",function(e){
    if(e.keyCode==87)
    list[0].y-=list[0].speedY;
    else if(e.keyCode==83)
    list[0].y+=list[0].speedY;
    else if(e.keyCode==65)
    list[0].x-=list[0].speedX;
    else if(e.keyCode==68)
    list[0].x+=list[0].speedX;
    else if(e.keyCode==13)
    {
        gameover=false;
        date=new Date();
    }
})


var x=0,y=0;
x=canvas.offsetLeft;
y=canvas.offsetTop;


document.onmousemove = function(e){
    if(e.clientY-y<HEIGHT-10 && e.clientY-y>0)
    list[0].y=e.clientY-y;
    if(e.clientX-x<WIDTH-10 && e.clientX-x>0)
    list[0].x=e.clientX-x;
    
}

Over=function()
{
    ctx.font="100px Arial";
    ctx.fillText("Game Over",400,100);
    ctx.fillText("Score: "+Math.round((d-date)/1000),400,200);
    list=[];
    createEntity("green",10,000,000,5,5);
    ctx.font="50px Arial";
    ctx.fillText("Press Enter to Replay",400,600);
    speed=20;
}