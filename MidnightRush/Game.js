var alive = true;
var count = 100;
var bulletAlive = false;
var bulletMove = false;

function Game()
{


}

Game.prototype.init = function() 
{
	// body...
	console.log("Initialising Game");
	x = 250;
	y = 700;
	
	app.player = new Player(x, y, rgb(0, 0, 255));
	app.player.draw(ctx);
	document.addEventListener("keydown", keyDownHandler);
	console.log("Player Initialized");
	
	app.goal = new Goal(250, 100, rgb(0,0,0));
	app.goal.draw(ctx);
	console.log("Goal Initialized");

	bullet = new Bullet(x + 25, y + 5, rgb(255,255,255));
};

Game.prototype.update = function()
{
	console.log("Update");

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
	app.player.draw(ctx);

	/*if(alive === false)
	{
		levelComplete();
		count--;
	}
	if(count === 0)
	{
		app.myGame.init();
		count = 100;
		alive = true;
	}*/

	window.requestAnimationFrame(app.myGame.update);
};

function levelComplete()
{
	ctx.save();
	ctx.fillStyle = rgb(100,0,100);
	ctx.font = 'italic 40pt Calibri';
	ctx.textBaseline = "top";
	ctx.fillText("Level Complete!",500,300);
	ctx.restore();
}

