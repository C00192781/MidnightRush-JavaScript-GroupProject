// Creates a bullet class with a size and position
function Bullet(x, y , colour)
{
	this.x = x;
	this.y = y;
	this.colour = colour;
	this.width = 10;
	this.height = 10;
}

/**Draws a square
* @param {var} ctx - 
* @return {number} 

*/
Bullet.prototype.draw=function(ctx) 
{
	ctx.fillStyle = this.colour;
	ctx.fillRect(this.x, this.y, 10, 10);	
}
// Checks if there is any collision between the bullet and an object
Bullet.prototype.CheckBulletCollision = function(e)
{
	var bulletCollides = false;

	if((this.x < e.x + e.width) &&
	   (this.x + this.width > e.x) &&
	   (this.y + this.height > e.y) &&
	   (this.y < e.y + e.height))
	{
		//Outputs a message to check if collision was successful
		console.log("Successful Bullet Collision");
		bulletCollides = true;
	} 

	return bulletCollides;
}