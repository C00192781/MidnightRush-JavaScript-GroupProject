// boolean for whether the enemy is alive or not
var respawn = true;
var enemyAlive = true;
var timerValue = 0;
// mimimum and maximum values to be used for spawning purposes
var min = 1;
var max= 3;
// default speed
var speed = 5;



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
};

/** 
 * Method the make the enemy move
 */
Enemy.prototype.Move=function(e) 
{
	this.y += speed;
}




