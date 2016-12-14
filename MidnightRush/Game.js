// array of points that the player can move between 
var points = [];
points[0] = 120;
points[1] = 450;
points[2] = 780; 



function Game(){
	
}

/*
 * Initializes the game, 
 * spawns our player at the middle point,
 * draws player
 */
Game.prototype.init=function()
{
	console.log('Initiliasing Game');


	xP = points[1];
	yP = window.innerHeight * Math.abs(0.66);

	console.log(window.innerHeight);
	

	app.plyr = new Player(xP,yP);
	app.plyr.draw(ctx);

	console.log('Initiliasing Player');	
}

/*
 * Constantly updates the game 
 * 
 */
Game.prototype.update=function()
{

	ctx.clearRect(0,0,canvas.width, canvas.height);

	console.log(app.plyr.x, "player x pos");
	
	// this is what is used to move to player
	app.plyr.PlayerMove();

	//// FOR WHEN PLAYER IS MOVING LEFT
	if (app.plyr.targetLeft == true)
	{
		if (app.plyr.x == points[0] || app.plyr.x == points[1] || app.plyr.x == points[2])
		{
			// moves to point[X] and the player is halted 
			app.plyr.speed = 0;
		}
	}
		
	//// FOR WHEN PLAYER IS MOVING RIGHT
	if (app.plyr.targetRight == true)
	{
		if (app.plyr.x == points[0] || app.plyr.x == points[1] || app.plyr.x == points[2])
		{
			// moves to point[X] and the player is halted 
			app.plyr.speed = 0;
		}
	}
	
	console.log(app.plyr.speed, "speed");
	console.log (app.plyr.targetLeft, "LEFT");
	console.log (app.plyr.targetRight, "RIGHT");

	// draws player
	app.plyr.draw(ctx);

	window.requestAnimationFrame(app.myGame.update);
}
