//Initially sets the hostage to be alive 
var hAlive = true;

//Creates a function to create a player
function Hostage(x, y , colour)
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
Hostage.prototype.draw=function(ctx) 
{
	//Only draws the hostage if they are alive
	if(hAlive == true)
	{
		ctx.fillStyle = this.colour;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
