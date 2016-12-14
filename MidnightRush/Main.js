/**
* global varaible
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
	document.body.style.backgroundImage = "url('floorBackground.png')"; //490 X 805
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	ctx = canvas.getContext("2d");

	app.myGame = new Game();
	app.myGame.init();
	app.myGame.update();
}




