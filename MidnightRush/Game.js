// enemy array
var enemies = [];

var isAlive = true;
var min = 1;
var max= 3;
var randomSpawn;
var randomWave;

var timer = 0;
var timerValue;


function Game(){
	
}

/*
 * Initializes the game
 * and our array of enemies
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
