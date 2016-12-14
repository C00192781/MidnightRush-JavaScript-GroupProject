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


var alive = true;
var count = 100;
var bulletAlive = false;
var bulletMove = false;

var levelEnd = false;
var gameOverTimer = 100;
var hostage = [];
var hostageCount = 3;
var hAlive = true;


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


	var hX = 100;
	var hY = window.innerHeight * Math.abs(0.9); /*(800)*/


	for(var i = 1; i < 4; i++)
	{
		if(i == 1)
		{
			hX = window.innerWidth * Math.abs(0.1)
		}
		else if(i == 2)
		{
			hX = window.innerWidth * Math.abs(0.45);
		}
		else if(i == 3)
		{
			hX = window.innerWidth * Math.abs(0.8);
		}
		hostage[i] = new Hostage(hX, hY, rgb(255,0,0));
		console.log("Hostage Initialized");
		hostage[i].hAlive = true;
	}
}

/*
 * Constantly updates the game 
 * 
 */
Game.prototype.update=function()
{

	ctx.clearRect(0,0,canvas.width, canvas.height);

	timer++;

	console.log(app.plyr.x, "player x pos");

	Spawns();
	Waves();

	for (var i=0; i < enemies.length; i++)
	{
		// if the timer is greater than the timerValue from Waves()
		if (timer >= timerValue)
		{
			if (enemies[i].enemyAlive == false)
			{
				timer = 0;

				enemies[i] = new Enemy(x,y, rgb(255,255,255));
				enemies[i].enemyAlive = true;
			}

			if (enemies[i].enemyAlive == true)
			{
				if (enemies[i].y > 2100) // if the enemy goes beyond a certain point
				{
					enemies[i].enemyAlive = false;
				}	
			}
		}
		enemies[i].Move();
		enemies[i].draw(ctx);

		console.log("EEENENENENENENENENENEMIES", enemies[0].x, enemies[0].y);
	}
	
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


	


	/*if(alive === true)
	{
		if(app.player.CheckCollision(app.goal))
		{
			console.log("Just Checking");
			alive = false;
		}
		app.goal.draw(ctx);
	}*/

	///////////////////////////
	//Bullet
	//////////////////////////
	if(bulletAlive === true)
	{
		bullet.draw(ctx);

		if(bullet.y <= 0)
		{
			console.log("Success");
			bulletAlive = false;
			bulletMove = false;
			bullet.y = app.plyr.y + 5;
			bullet.x = app.plyr.x + 25;
		}
	}

	if(bulletAlive === false)
	{
		bullet.y = app.plyr.y + 5;
		bullet.x = app.plyr.x + 25;
	}

	if(bulletMove === true)
	{
		bullet.y -= 10;
	}


	for (var j = 0; j < enemies.length; j++)
	{
		for (var i = 1; i < 4; i++)
		{
			if (hostage[i].hAlive == true)
			{
				if (enemies[j].checkCollision(hostage[i]))
				{
					console.log("SUCCESSFUL COLLISION");
					hostageCount = hostageCount - 1;
					hostage[i].hAlive = false;
				}
				hostage[i].draw(ctx);
			}
		}
	}

	if(hostageCount == 0)
	{
		levelEnd = true;
		console.log("GAME OVER");
	}
	if(levelEnd == true)
	{
		levelComplete();
		gameOverTimer--;
		hostageCount = 3;
	}
	if(gameOverTimer == 0)
	{
		app.myGame.init();
		gameOverTimer = 100;
		levelEnd = false;
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
	ctx.fillText("GAME OVER!",100,300);
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

