var enemyBool = false;

function Enemy(x, y , colour){
	this.x = x;
	this.y = y;
	this.colour = colour;
	this.width = 50;
	this.height = 50;
}

/** Draws a square.
 * @param {var} ctx his param is for the canvas
 */
Enemy.prototype.draw=function(ctx) {

	//ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.fillStyle = this.colour;
	ctx.fillRect(this.x, this.y, this.width, this.height);
};



Enemy.prototype.Move=function(e) 
{
	this.y += 1;
}

Enemy.prototype.checkCollision=function(e) 
{
	var collides = false;

		// do the bounding boxes overlap?
		if ((this.x < e.x + e.width) && 
		(this.x + this.width > e.x) &&
		(this.y + this.height > e.y) &&
		(this.y < e.y + e.height) )
		{
			collides = true;
			console.log("true");
		}
		return collides;
}

