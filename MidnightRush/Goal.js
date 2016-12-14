function Goal(x, y , colour)
{
	this.x = x;
	this.y = y;
	this.colour = colour;
	this.width = 50;
	this.height = 50;
}

/**Drtaws a square
* @param {var} ctx - 
* @return {number} 

*/
Goal.prototype.draw=function(ctx) 
{
	ctx.strokeStyle = this.colour;
	ctx.strokeRect(this.x, this.y, this.width, this.height);
	
}
