
//Loads in the play image
var playImg = new Image();   // Create new img element
playImg.addEventListener("load", function() 
{
		
}, false);
playImg.src = 'play.png'; // Set source path


//Loads in the quit image
var quitImg = new Image();   // Create new img element
quitImg.addEventListener("load", function() 
{
		
}, false);
quitImg.src = 'quit.png'; // Set source path

function Menu(){
	
}

Menu.prototype.init=function()
{

}
Menu.prototype.draw=function(ctx) 
{
	document.body.style.backgroundImage = "url('menu back.png')"; 
	ctx.drawImage(playImg, 150, 500);	
	ctx.drawImage(quitImg, 150, 700);
}

/*function for rgb for convenience*/
function rgb(r, g, b) { 
	return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';
}

/*helper function*/
function clamp(value, min, max){ 
	if(max<min) { 
		var temp = min; 
		min = max; 
		max = temp; 
	}
	return Math.max(min, Math.min(value, max)); 
}

