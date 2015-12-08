// image canvas --------------------------------------------
var canvas = document.getElementById('imagecanvas');
var ctx = canvas.getContext('2d');
var CUR_DATA = null;

function setup( catImg, data ){
	$($(canvas).parent().children()[1]).css('width',catImg.width+"px");
	$($(canvas).parent().children()[1]).css('height',catImg.height+"px");

	var taW = $($(canvas).parent().children()[1]).css('width');
	var taH = $($(canvas).parent().children()[1]).css('height');
	if(canvas.style.width!=taW || canvas.style.height!=taH){
		canvas.style.width = taW;
		canvas.style.height = taH;
		canvas.width = parseInt( taW.substring(0,taW.length-2) );
		canvas.height = parseInt( taH.substring(0,taH.length-2) );
		drawData( data );
	}				
}

function drawData( data, init ){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	var IMG = new Image();
	IMG.onload = function(){
		ctx.drawImage(this, 0,0,canvas.width,canvas.height);
		if(init) setup( this, data );		
	}
	IMG.src = "data:image/png;base64,"+ data;
}

function checkForErr(){
	var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
	var data = imgData.data;
	for (var i = 0; i < data.length; i++) {
		if( data[i] !== 0 ) break;
		if( i == data.length-1 ) {
			ctx.fillStyle = "#fff";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("Oh no! ur file may be corrupted :(", canvas.width/2, canvas.height/2);
		}
	};
}

function canvasUpdate(){
	// make it so that adjusting the textarea overlay also adjusts the canvas
	// ...quick GUI resize var
	// var taW = $($(canvas).parent().children()[1]).css('width');
	// var taH = $($(canvas).parent().children()[1]).css('height');
	// if(canvas.style.width!=taW || canvas.style.height!=taH){
	// 	canvas.style.width = taW;
	// 	canvas.style.height = taH;
	// 	canvas.width = parseInt( taW.substring(0,taW.length-2) );
	// 	canvas.height = parseInt( taH.substring(0,taH.length-2) );
	// 	var data = ($($('#editor').children()[1]).val()=="") ? CUR_DATA : $($('#editor').children()[1]).val();
	// 	drawData( data );					
	// }
	resizeWin( 'canvas','imagecanvas' );
} canvasUpdate();
