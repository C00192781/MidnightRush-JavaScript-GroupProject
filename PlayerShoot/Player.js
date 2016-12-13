

function Player(x, y , colour)
{
	this.x = x;
	this.y = y;
	this.colour = colour;
	this.width = 100; //50
	this.height = 100;
}

/**Drtaws a square
* @param {var} ctx - 
* @return {number} 

*/
Player.prototype.draw=function(ctx) 
{
	ctx.fillStyle = this.colour;
	ctx.fillRect(this.x, this.y, this.width, this.height);
	
}

function keyDownHandler(e) 
{
 	if (e.keyCode == '38') 
 	{
 	   //up arrow
 	   app.player.y -= 10;
 	}
 	else if (e.keyCode == '40') 
 	{
	   //down arrow
	   app.player.y += 10;
 	}
 	else if (e.keyCode == '37') 
 	{
 	      //left arrow  
 	      app.player.x -= 10;   
	}
 	else if (e.keyCode == '39') 
 	{
 	      //right arrow
 	      app.player.x += 10;
 	}
 	app.player.draw(ctx);
}

Player.prototype.CheckCollision = function(e)
{
	var collides = false;
	//console.log("Check Collision");

	if((this.x < e.x + e.width) &&
	   (this.x + this.width > e.x) &&
	   (this.y + this.height > e.y) &&
	   (this.y < e.y + e.height))
	{
		console.log("Successful Collision");
		collides = true;
	} 

	return collides;
}