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

function main()
{
	//creates a new canvas element
	canvas = document.createElement("canvas");
	document.body.style.backgroundImage = "url('background.png')";
	// adds the canvas element tot the document
	document.body.appendChild(canvas);
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	ctx = canvas.getContext("2d");

	myGame = new Game();
	myGame.init();
	myGame.update();	
}




