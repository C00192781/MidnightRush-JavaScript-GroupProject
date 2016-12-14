var count = 200;
var min = 1;
var max= 3;
var randomnumber;
var enemies = [];
var timer = 0;
var timerValue;
var enemyBool = true;

var levelEnd = false;
var gameOverTimer = 100;
var hostage = [];
var hostageCount = 3;
var hAlive = true;

function Game(){
	
}

Game.prototype.init=function()
{
	console.log('Initiliasing Game');

	var hX = 100;
	var hY = 1400; /*(800)*/

	xP = window.innerWidth * Math.abs(0.5);
	yP = window.innerHeight * Math.abs(0.5);

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

	console.log(window.innerHeight);

	for (var i=0; i <= 3; i++)
	{
		Spawns();
		enemies[i] = new Enemy(x,y, rgb(255,0,255));
		enemies[i].Move();
		enemyBool = false;

		timer++;
	}
	console.log(x,y);

	console.log('Initiliasing Player');	
};


Game.prototype.update=function()
{
	ctx.clearRect(0,0,canvas.width, canvas.height);

	timer++;
	
	for (var i=0; i <= 3; i++)
	{

		Spawns();
		Waves();
		if (enemyBool == false)
		{
			if (timer >= timerValue)
			{
			
				enemyBool = true;
				console.log("timer", timer);
				timer = 0;
	
				enemies[i] = new Enemy(x, y, rgb(255,0,255));
				//enemies[i].enemyBool = true;
				enemyBool = true;
				enemies[i].Move();
				timer = 0;
				console.log("Enemy ");
				console.log(timer);
				enemyBool = false;
			}
		} 
	}
	

	for (var j = 0; j <= 3; j++)
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
				//app.gl.draw(ctx);
				hostage[i].draw(ctx);
			}
			enemies[j].draw(ctx);
			enemies[j].Move();
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
		myGame.init();
		gameOverTimer = 100;
		levelEnd = false;
	}
	window.requestAnimationFrame(myGame.update);
};

function Spawns()
{
	randomnumber = Math.floor(Math.random() * (max - min + 1)) + min;
		if (randomnumber == 1)
		{
			x = window.innerWidth * Math.abs(0.1);
			y = window.innerHeight * Math.abs(0.1);
		}

		if (randomnumber == 2)
		{
			x = window.innerWidth * Math.abs(0.45);
			y = window.innerHeight * Math.abs(0.1);
		}

		if (randomnumber == 3)
		{
			x = window.innerWidth * Math.abs(0.8);
			y = window.innerHeight * Math.abs(0.1);
		}	
}

function Waves()
{
	randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
	if (randomNumber == 1)
	{
		timerValue = 300;
	}
	if (randomNumber == 2)
	{
		timerValue = 100
	}
	if (randomNumber == 3)
	{
		timerValue = 500;
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
