// array of points that the player can move between 
var points = [];

var score;

function round2(x)
{
    return Math.ceil(x/2)*2;
}

/*Each object in the game is assigned one of three positions 
  on screen that are based on a fraction of the size of the screen*/
points[0] = round2(window.innerWidth * Math.abs(0.1));
points[1] = round2(window.innerWidth * Math.abs(0.5));
points[2] = round2(window.innerWidth * Math.abs(0.9));

// enemy array
var enemies = [];

//var wavesArray = [];

var isAlive = true;
var min = 1;
var max= 3;
var randomSpawn;

var randomWave;
var timer;
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

var deathCount = 0;
var currentWave = 1;


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
	timer = 0;
	enemies.length = 100;

	for (var i=0; i < enemies.length; i++)
	{
		// spawn initial enemies off of screen
		enemies[i] = new Enemy(3000, 1111, rgb(255,255,255));
		enemies[i].respawn = false;
		enemies[i].enemyAlive = true;
		timer++;
	}


	xP = points[1];
	yP = window.innerHeight * Math.abs(0.66);


	// initialising player
	app.plyr = new Player(xP,yP);
	app.plyr.draw(ctx);

	//Creates a new bullet that is assigned to the player position (Including an offset)
	bullet = new Bullet(xP + 25, yP + 5, rgb(128,128,128));

	/*  Gives the Hostages different position 
	 *  Their y remains the same for all three
	 *  their x is split into thirds across the screen 
	 */
	var hX = 100;
	var hY = window.innerHeight * Math.abs(0.9); /*(800)*/
	score = 0;

	for(var i = 1; i < 4; i++)
	{
		if(i == 1)
		{
			hX = window.innerWidth * Math.abs(0.1);
		}
		else if(i == 2)
		{
			hX = window.innerWidth * Math.abs(0.5);
		}
		else if(i == 3)
		{
			hX = window.innerWidth * Math.abs(0.9);
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
	GameOver();
	ctx.clearRect(0,0,canvas.width, canvas.height);

	enemies[i] = new Enemy(x,y, rgb(255,255,255));

	Spawns();

	/* Increases the waves in the game after
	*  a certain amount of deaths
	*/
	if (currentWave == 1)
	{
		if (deathCount <= 5)
		{
			Wave1();
			
		}
		else if (deathCount >5)
		{
			currentWave = 2;
		}
	}
	else if (currentWave == 2)
	{
		if (deathCount <= 45)
		{
			Wave2();
		}
		else if (deathCount > 45)
		{
			currentWave = 3;
		}
	}
	else if (currentWave == 3)
	{
		if (deathCount <= 100)
		{
			Wave3();
		}
	}
	
	timer++;
	
	//Draws multiple enemies on screen
	for (var i=0; i < enemies.length; i++)
	{
		// if the timer is greater than the timerValue from Waves()
		if (timer >= timerValue)
		{
			if (enemies[i].respawn == true)
			{
				timer = 0;

				enemies[i] = new Enemy(x,y, rgb(255,255,255));
				enemies[i].respawn = false;
				enemies[i].enemyAlive = true;
			}

			if (enemies[i].respawn == false)
			{
				if (enemies[i].y > (window.innerHeight) + 100) // if the enemy goes beyond a certain point
				{
					enemies[i].respawn = true;
				}	
			}
		}
		if (enemies[i].enemyAlive == true)
		{
			enemies[i].Move();
			enemies[i].draw(ctx);
		}
	}
	
	// this is what is used to move to player
	app.plyr.PlayerMove();

	//// FOR WHEN PLAYER IS MOVING LEFT
	if (app.plyr.targetLeft == true)
	{
		if (app.plyr.x <= points[0] || app.plyr.x == points[1] || app.plyr.x == points[2])
		{
			// moves to point[X] and the player is halted 
			app.plyr.speed = 0;
		}
	}
		
	//// FOR WHEN PLAYER IS MOVING RIGHT
	if (app.plyr.targetRight == true)
	{
		if (app.plyr.x == points[0] || app.plyr.x == points[1] || app.plyr.x >= points[2])
		{
			// moves to point[X] and the player is halted 
			app.plyr.speed = 0;
		}
	}

	///////////////////////////
	//Bullet
	//////////////////////////
	/* 
	*  The bullet will become alive when 
	*  the player clicks the left mouse button
	*/
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
	//The bullet becomes false if it reaches the top of the screen 
	if(bulletAlive === false)
	{
		bullet.y = app.plyr.y + 5;
		bullet.x = app.plyr.x + 25;
	}
	// The bullet is given a speed at which to move up the screen
	if(bulletMove === true)
	{
		bullet.y -= 20;
	}

	/* 
	* Checks if any of the hostages have collided 
	* with any of the enemeies 
	* in which case the hostage will die
	*/
	for (var j = 0; j < enemies.length; j++)
	{
		for (var i = 1; i < 4; i++)
		{
			if (hostage[i].hAlive == true)
			{
				if (enemies[j].checkCollision(hostage[i]))
				{
					hostageCount = hostageCount - 1;
					if (score > 0)
					{
						score -=50;
					}
					hostage[i].hAlive = false;
				}
				hostage[i].draw(ctx);
			}
		}
	}

	/* 
	* Checks if the player have collided 
	* with any of the enemeies 
	* in which case the players score will decrease 
	*/
	for (var i = 0; i < enemies.length; i++)
	{
		if (enemies[i].enemyAlive == true)
		{
			if (enemies[i].checkCollision(app.plyr))
			{
				enemies[i].enemyAlive = false;
				enemies[i].respawn = true;

				if (score > 0)
				{
					score -=50;
				}
			}		
		}
	}	

	/* 
	* Checks if the bulets have collided 
	* with any of the enemeies 
	* in which case the enemy will die
	*/
	for (var i = 0; i < enemies.length; i++)
	{
		if ((enemies[i].enemyAlive) == true && (enemies[i].y > -50))
		{
			if (enemies[i].checkCollision(bullet))
			{
				if ((app.plyr.y + 5) != bullet.y)
				{
					enemies[i].enemyAlive = false;
					console.log("is enemy alive", enemies[i].alive);
					score +=50;
					deathCount++;
				}
			}
			
		}
			
	}

	//Indicates to the player what wave they are currently on
	ctx.save();
	ctx.fillStyle = rgb(100,0,100);
	ctx.font = 'italic 40pt Calibri';
	ctx.textBaseline = "top";
	ctx.fillText("Wave: ", window.innerWidth * Math.abs(0.7),window.innerHeight * Math.abs(0.1));
	ctx.restore();

	// If all the hostages have been killed the game will end 
	if(hostageCount == 0)
	{
		levelEnd = true;
		console.log("GAME OVER");
	}
	if (levelEnd == false)
	{
		levelScore();
	}
	if(levelEnd == true)
	{
		GameOver();
		levelScore();


		gameOverTimer--;
		hostageCount = 3;
	}
	//This resets the game following the gameover
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



function Wave1() 
{
	//Controlls the waves for the game which includes the time between each wave
	randomWave = Math.floor(Math.random() * (max - min + 1)) + min;
	if (randomWave == 1)
	{
		// Time Interval 1
		timerValue = 400;
	}
	if (randomWave == 2)
	{
		// Time Interval 2
		timerValue = 300;
	}
	if (randomWave == 3)
	{
		// Time Interval 3
		timerValue = 500;
	}	
	ctx.save();
	ctx.fillStyle = rgb(100,0,100);
	ctx.font = 'italic 40pt Calibri';
	ctx.textBaseline = "top";
	ctx.fillText(currentWave, window.innerWidth * Math.abs(0.85),window.innerHeight * Math.abs(0.1));
	ctx.restore();


}

function Wave2() 
{
	randomWave = Math.floor(Math.random() * (max - min + 1)) + min;
	if (randomWave == 1)
	{
		// Time Interval 1
		timerValue = 200;
	}
	if (randomWave == 2)
	{
		// Time Interval 2
		timerValue = 100;
	}
	if (randomWave == 3)
	{
		// Time Interval 3
		timerValue = 300;
	}	
	ctx.save();
	ctx.fillStyle = rgb(100,0,100);
	ctx.font = 'italic 40pt Calibri';
	ctx.textBaseline = "top";
	ctx.fillText(currentWave, window.innerWidth * Math.abs(0.85),window.innerHeight * Math.abs(0.1));
	ctx.restore();
}




function Wave3() 
{
	randomWave = Math.floor(Math.random() * (max - min + 1)) + min;
	if (randomWave == 1)
	{
		// Time Interval 1
		timerValue = 50;
	}
	if (randomWave == 2)
	{
		// Time Interval 2
		timerValue = 200;
	}
	if (randomWave == 3)
	{
		// Time Interval 3
		timerValue = 100;
	}	
	ctx.save();
	ctx.fillStyle = rgb(100,0,100);
	ctx.font = 'italic 40pt Calibri';
	ctx.textBaseline = "top";
	ctx.fillText(currentWave, window.innerWidth * Math.abs(0.85),window.innerHeight * Math.abs(0.1));
	ctx.restore();
}


/*
* Spawns enemies
* @param {var} null  
* @return {number} 
*/

function Spawns()
{
	randomSpawn = Math.floor(Math.random() * (max - min + 1)) + min;
	// Position 1
	if (randomSpawn == 1)
	{
		x = window.innerWidth * Math.abs(0.1);
		y = -(window.innerHeight * Math.abs(0.1));
	}
	// Position 2
	if (randomSpawn == 2)
	{
		x = window.innerWidth * Math.abs(0.5);
		y = -(window.innerHeight * Math.abs(0.1));
	}
	// Position 3
	if (randomSpawn == 3)
	{
		x = window.innerWidth * Math.abs(0.9);
		y = -(window.innerHeight * Math.abs(0.1));
	}	
}

// Indicates to the player what their score is
function levelScore()
{
	ctx.save();
	ctx.fillStyle = rgb(100,0,100);
	ctx.font = 'italic 40pt Calibri';
	ctx.textBaseline = "top";
	ctx.fillText(score, window.innerWidth * Math.abs(0.2),window.innerHeight * Math.abs(0.1));
	ctx.restore();

	ctx.save();
	ctx.fillStyle = rgb(100,0,100);
	ctx.font = 'italic 40pt Calibri';
	ctx.textBaseline = "top";
	ctx.fillText("Score: ", window.innerWidth * Math.abs(0.05),window.innerHeight * Math.abs(0.1));
	ctx.restore();
}
 
//When the player has lost they will be shown a game over text
function GameOver()
{
	ctx.save();
	ctx.fillStyle = rgb(100,0,100);
	ctx.font = 'italic 40pt Calibri';
	ctx.textBaseline = "top";
	ctx.fillText("gameOver",window.innerWidth * Math.abs(0.05),window.innerHeight * Math.abs(0.5));
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

