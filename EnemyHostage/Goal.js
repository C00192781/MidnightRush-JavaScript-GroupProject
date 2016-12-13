

function Goal(x, y , colour){
	this.x = x;
	this.y = y;
	this.colour = colour;
	this.width = 10;
	this.height = 10;
}

/** Draws a square.
 * @param {var} ctx his param is for the canvas
 */
Goal.prototype.draw=function(ctx) {

	ctx.strokeStyle = this.colour;
	ctx.strokeRect (this.x, this.y, 10, 10);

};