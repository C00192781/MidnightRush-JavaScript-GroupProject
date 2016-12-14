
/**
* global variable
*/
app = {};


/**
*ctx is context
*/
var ctx;
var canvas;
var x;
var y;


/*
 * This initializes the game and draws the background.
 */
function main()
{
	var tTest = new TouchTest();
	tTest.is_touch_device();

	// prints out true or false
	console.log(tTest.is_touch_device());

	// listener event for detecting a touch event
	document.addEventListener("touchstart", tTest.onTouchStart);
	document.addEventListener("touchmove", tTest.Move);

	//creates a new canvas element
	canvas = document.createElement("canvas");
	// adds the canvas element tot the document
	document.body.appendChild(canvas);
	// adds in background
	document.body.style.backgroundImage = "url('floorBackground.png')"; //490 X 805
	document.body.style.backgroundImage.width = window.innerWidth;
	document.body.style.backgroundImage.height = window.innerHeight;
	document.body.style.backgroundImage
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	ctx = canvas.getContext("2d");

	app.myGame = new Game();
	app.myGame.init();
	app.myGame.update();
}


/*function for rgb for convenience*/
function rgb(r, g, b) 
{ 
	return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';
}

/*helper function*/
function clamp(value, min, max)
{ 
	if(max<min) { 
		var temp = min; 
		min = max; 
		max = temp; 
	}
	return Math.max(min, Math.min(value, max)); 
}

		
