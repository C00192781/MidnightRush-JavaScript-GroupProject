var speed;

var img = new Image();   // Create new img element
img.addEventListener("load", function() 
{
}, false);
img.src = 'player.png'; // Set source path


function Player(x, y , colour){
	this.x = x;
	this.y = y;
	this.width = 100;
	this.height = 100;
	this.speed = 0;
	this.targetLeft = false;
	this.targetRight = false;
}

/** Draws a square.
 * @param {var} ctx his param is for the canvas
 */
Player.prototype.draw=function(ctx) {

	//ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.drawImage(img, this.x, this.y);	
};


Player.prototype.PlayerMove=function(e) 
{
	this.x += this.speed;
}




