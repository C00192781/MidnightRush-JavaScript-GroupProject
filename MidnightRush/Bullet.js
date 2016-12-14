
function Bullet(x, y , colour)
{
	this.x = x;
	this.y = y;
	this.colour = colour;
	this.width = 10;
	this.height = 10;
}

/**Drtaws a square
* @param {var} ctx - 
* @return {number} 

*/
Bullet.prototype.draw=function(ctx) 
{
	ctx.strokeStyle = this.colour;
	ctx.strokeRect(this.x, this.y, 10, 10);	
}

Bullet.prototype.CheckBulletCollision = function(e)
{
	var bulletCollides = false;

	if((this.x < e.x + e.width) &&
	   (this.x + this.width > e.x) &&
	   (this.y + this.height > e.y) &&
	   (this.y < e.y + e.height))
	{
		console.log("Successful Bullet Collision");
		bulletCollides = true;
	} 

	return bulletCollides;
}