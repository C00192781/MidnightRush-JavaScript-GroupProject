//app = [];

//var message = {};

var isTouch = 'ontouchstart' in window;
var bulletCount = 0;
var gamePlayMusic = new Audio('Audio/SweetDreamsInst.ogg');
var gunShoot = new Audio('Audio/gunShoot.ogg');

var mes = {};

function TouchTest(){
	var ctx;
}


// used to detect a touch device
TouchTest.prototype.is_touch_device=function()
{
	 return isTouch;  
}

// used to detect touch
TouchTest.prototype.onTouchStart=function(e)
{
    touches = e.touches; 
    touchXPos = e.touches[0].clientX;
    touchYPos = e.touches[0].clientY;
   //print outs out the x and y co-ordinates
    console.log("CLICK");
    console.log("X = " + touches[0].clientX,"Y = " + touches[0].clientY);

  	 if (isMenu === true)
    {
	    	//Play Button
	    if ((touches[0].clientX >= 200 &&
	    	touches[0].clientX <= 420 &&
	    	touches[0].clientY >= 530 &&
	    	touches[0].clientY <= 585) && isGame === false && isMenu === true)
	    {
	    	console.log("Play Button Pressed");
	    	isMenu = false;
	    	menuMusic.pause();
	    	isGame = true;

	    	//Initialises the game
			app.myGame = new Game();
			app.myGame.init();
			app.myGame.update();
			// adds in background
			document.body.style.backgroundImage = "url('floorBackground.png')"; 
	    }

	    //Quit Button
	    if ((touches[0].clientX >= 210 &&
	    	touches[0].clientX <= 400 &&
	    	touches[0].clientY >= 730 &&
	    	touches[0].clientY <= 790) && isGame === false && isMenu === true)
	    {
	    	console.log("Quit Button Pressed");

	    	if (confirm("Close Window?")) {
	    		close();
	 		 }
	    }
    }
    if(isGame === true)
    {
    	bulletCount++;
    	if(bulletCount >= 2)
    	{
    		gunShoot.play();
    		bulletMove = true;
  			bulletAlive = true;
  			bulletCount = 0;
  		}
  		isMenu = false;
  		gamePlayMusic.play();
    }

    makePlayerMessage(app.plyr.x, app.plyr.y);
}


function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

function round2(x)
{
    return Math.ceil(x/2)*2;
}

// This moves the player, based on swipes
TouchTest.prototype.Move=function(e)
{
	
	var mouse = {x:0, y:0};
	mouse.x = touches[0].clientX - mouse.x;
	mouse.y = touches[0].clientY - mouse.y;

	touches = e.touches; 
	makePlayerMessage(speed);

	//SWIPE RIGHT
	if (mouse.x <= touches[0].clientX && mouse.y >= touches[0].clientY)
	{
		bulletCount = 0;
		app.plyr.targetLeft = false;
		app.plyr.targetRight = true;
		if (app.plyr.x < points[2])
		{
			app.plyr.speed = round2(window.innerWidth * (0.02));
			console.log("speed", app.plyr.speed);
			makePlayerMessage(app.plyr.x, app.plyr.y);
		}
		makePlayerMessage(speed);
	}  

	//SWIPE LEFT
	else if (mouse.x >= touches[0].clientX && mouse.y >= touches[0].clientY)
	{
		bulletCount = 0;
		app.plyr.targetLeft = true;
		app.plyr.targetRight = false;
		if (app.plyr.x > points[0])
		{
			app.plyr.speed = -(round2(window.innerWidth * (0.02)));
			console.log("speed", app.plyr.speed);
			makePlayerMessage(speed);
		}
		makePlayerMessage(speed);
	}
	makePlayerMessage(speed);	
}

// make message containing x and y positions of Player 1
function makePlayerMessage(xPlayer, yPlayer)
{
	message.data = {"speed": app.plyr.speed};
	message.type = "updatePosition";
	mes = JSON.stringify(message);
	ws.send(mes);
}

