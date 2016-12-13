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
	//creates a new canvas element
	canvas = document.createElement("canvas");
	// adds the canvas element tot the document
	document.body.appendChild(canvas);
	// adds in background
	document.body.style.backgroundImage = "url('floorBackground.png')"; //490 X 805
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	ctx = canvas.getContext("2d");

	app.myGame = new Game();
	app.myGame.init();
	app.myGame.update();
}




