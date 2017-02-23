//Gives the player a speed to move at
var speed;

//Loads in the player image
var img = new Image();   // Create new img element
img.addEventListener("load", function() 
{
}, false);
img.src = 'player.png'; // Set source path



function Player(x, y , colour)
{


	this.x = x;
	this.y = y;
	this.width = 100; //50
	this.height = 100;
	this.speed = 0;
	this.targetLeft = false;
	this.targetRight = false;
	this.playerHealth = 100;
	this.playerAlive = true;
	this.getX =function()
	{
		return this.x;
	}
	this.getY =function()
	{
		return this.y;
	}
	this.getWidth =function()
	{
		return this.width;
	}
	this.getHeight =function()
	{
		return this.height;
	}


}

/**Drtaws a square
* @param {var} ctx - 
* @return {number} 

*/
Player.prototype.draw=function(ctx) {

	//ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.drawImage(img, this.x, this.y);	
};


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

// The player moves at a given speed
Player.prototype.PlayerMove=function(e) 
{
	this.x += this.speed;

}

// Checks if there is any collision between the player and an object
Player.prototype.CheckCollision = function(e)
{
	var collides = false;

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

//Controlls the players health
Player.prototype.PlayerHealth = function(e)
{
	ctx.fillStyle="#FF0000";
	ctx.fillRect(0,0,(playerHealth/100)*140,25);
	//For losing health
	playerHealth-=20;
	if (playerHealth <= 0)
	{
		playerAlive = false;
	} 	
}