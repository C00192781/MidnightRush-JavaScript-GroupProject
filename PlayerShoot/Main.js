app = {};

var ctx;
var canvas;
var x;
var y;

function main()
{
	var test = new TouchTest();
	console.log(test.is_touch_device());
	document.addEventListener("touchstart", onTouchStart);

	canvas = document.createElement("canvas");
	document.body.appendChild(canvas);
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

		
