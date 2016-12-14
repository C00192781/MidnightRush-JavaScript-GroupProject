

function TouchTest(){
	var ctx;
}

TouchTest.prototype.is_touch_device = function() 
{
	console.log("Touch Device");
  return 'ontouchstart' in window;
}

function onTouchStart(e)
{
    touches = e.touches; 
    console.log("CLICK");
    console.log("X = " + touches[0].clientX,"Y = " + touches[0].clientY);
   //print out (x,y) co-ords of touch: touches[0].clientX contains the x position
  	bulletMove = true;
  	bulletAlive = true;
}


