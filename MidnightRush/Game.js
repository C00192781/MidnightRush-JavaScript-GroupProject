// array of points that the player can move between 
var points = [];
points[0] = 120;
points[1] = 450;
points[2] = 780; 

// enemy array
var enemies = [];

var isAlive = true;
var min = 1;
var max= 3;
var randomSpawn;
var randomWave;

var timer = 0;
var timerValue;


//var alive = true;
var count = 100;
var bulletAlive = false;
var bulletMove = false;


function Game(){
	
}

/*
 * Initializes the game
 * and our array of enemies,
 * spawns our player at the middle point,
 * draws player
 */
Game.prototype.init=function()
{
	console.log('Initiliasing Game');
	enemies.length = 5;

	for (var i=0; i < enemies.length; i++)
	{
		// spawn initial enemies off of screen
		enemies[i] = new Enemy(3000, 1111, rgb(255,255,255));
		enemies[i].enemyAlive = true;
		console.log(enemies.length, "length");
		timer++;
	}
	console.log(x,y);


	xP = points[1];
	yP = window.innerHeight * Math.abs(0.66);

	app.plyr = new Player(xP,yP);
	app.plyr.draw(ctx);

	console.log('Initiliasing Player');	

	bullet = new Bullet(xP + 25, yP + 5, rgb(255,255,255));
}

/*
 * Constantly updates the game 
 * 
 */
Game.prototype.update=function()
{

	ctx.clearRect(0,0,canvas.width, canvas.height);

	timer++;

	for (var i=0; i < enemies.length; i++)
	{

		Spawns();
		Waves();

		// if the timer is greater than the timerValue from Waves()
		if (timer >= timerValue)
		{
			if (enemies[i].enemyAlive == false)
			{
				timer = 0;

				enemies[i] = new Enemy(x,y, rgb(255,255,255));
				enemies[i].enemyAlive = true;
			}
		}

		if (enemies[i].enemyAlive == true)
		{
			if (enemies[i].y > 2100) // if the enemy goes beyond a certain point
			{
				enemies[i].enemyAlive = false;
			}	
		}
		
		console.log("1", enemies[0].y);
		console.log("2", enemies[1].y);
		console.log("3", enemies[2].y);
		console.log("4", enemies[3].y);
		console.log("5", enemies[4].y);

		enemies[i].Move();
		enemies[i].draw(ctx);
	}


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



	ctx.clearRect(0,0,canvas.width, canvas.height);

	if(alive === true)
	{
		if(app.player.CheckCollision(app.goal))
		{
			console.log("Just Checking");
			alive = false;
		}
		app.goal.draw(ctx);
	}

	///////////////////////////
	//Bullet
	//////////////////////////
	if(bulletAlive === true)
	{
		bullet.draw(ctx);

		if(bullet.CheckBulletCollision(app.goal) || bullet.y <= 0)
		{
			console.log("Success");
			bulletAlive = false;
			bulletMove = false;
			bullet.y = app.player.y + 5;
			bullet.x = app.player.x + 25;
		}
	}

	if(bulletAlive === false)
	{
		bullet.y = app.player.y + 5;
		bullet.x = app.player.x + 25;
	}

	if(bulletMove === true)
	{
		bullet.y -= 10;
	}

	// draws player
	app.plyr.draw(ctx);

	window.requestAnimationFrame(app.myGame.update);
}

/*
 * A function used for the randomly spawning 
 * enemies between 3 different positions.
 */
function Spawns()
{
	randomSpawn = Math.floor(Math.random() * (max - min + 1)) + min;
		// Position 1
		if (randomSpawn == 1)
		{
			x = window.innerWidth * Math.abs(0.1);
			y = -300;
		}
		// Position 2
		if (randomSpawn == 2)
		{
			x = window.innerWidth * Math.abs(0.45);
			y = -300;
		}
		// Position 3
		if (randomSpawn == 3)
		{
			x = window.innerWidth * Math.abs(0.8);
			y = -300;
		}	
}

/*
 * A function used for spawning 
 * enemies at 3 random spawn intervals.
 */
function Waves() 
{
	randomWave = Math.floor(Math.random() * (max - min + 1)) + min;
	if (randomWave == 1)
	{
		// Time Interval 1
		timerValue = 100;
	}
	if (randomWave == 2)
	{
		// Time Interval 2
		timerValue = 200;
	}
	if (randomWave == 3)
	{
		// Time Interval 3
		timerValue = 300;
	}	
}

function levelComplete()
{
	ctx.save();
	ctx.fillStyle = rgb(100,0,100);
	ctx.font = 'italic 40pt Calibri';
	ctx.textBaseline = "top";
	ctx.fillText("Level Complete!",500,300);
	ctx.restore();
}


/*function for rgb for convenience*/
function rgb(r, g, b) { 
	return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';
}

/*helper function*/
function clamp(value, min, max){ 
	if(max<min) { 
		var temp = min; 
		min = max; 
		max = temp; 
	}
	return Math.max(min, Math.min(value, max)); 
}

