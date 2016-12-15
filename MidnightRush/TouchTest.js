app = [];

var isTouch = 'ontouchstart' in window;


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
   //print outs out the x and y co-ordinates
    console.log("CLICK");
    console.log("X = " + touches[0].clientX,"Y = " + touches[0].clientY);
  	bulletMove = true;
  	bulletAlive = true;
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

///SWIPE RIGHT
	if (mouse.x <= touches[0].clientX && mouse.y >= touches[0].clientY)
	{
		app.plyr.targetLeft = false;
		app.plyr.targetRight = true;
		if (app.plyr.x < points[2])
		{
			app.plyr.speed = round2(window.innerWidth * (0.02));
		}
		
	}  

///SWIPE LEFT
	else if (mouse.x >= touches[0].clientX && mouse.y >= touches[0].clientY)
	{
		app.plyr.targetLeft = true;
		app.plyr.targetRight = false;
		if (app.plyr.x > points[0])
		{
			app.plyr.speed = -(round2(window.innerWidth * (0.02)));
		}
	}	
}



