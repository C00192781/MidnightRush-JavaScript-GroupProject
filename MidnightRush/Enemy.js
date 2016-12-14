// boolean for whether the enemy is alive or not
var enemyAlive = true;
var timerValue =0;
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
	ctx.fillStyle = this.colour;
	ctx.fillRect(this.x, this.y, 100, 100);
};

/** 
 * Method the make the enemy move
 */
Enemy.prototype.Move=function(e) 
{
	this.y += speed;
}



