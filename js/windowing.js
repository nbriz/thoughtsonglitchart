
// MOVE WINDOWS VIA MBAR --------------------------------------

var ctxmenu = false;;
var winX, winY, clickX, clickY;
var mouseX=0, mouseY=0;
var winDrag = false;
var winSel = null;

$('.mbar').on({
	mousedown: function(e){
		bringToFront( $(this).parent() );
		if( !winDrag ){
			winDrag = true;
			winSel = $(this).parent();
			var left = $( winSel ).css('left');
			var top = $( winSel ).css('top');
			left = parseInt( left.substring(0,left.length-2) );
			top = parseInt( top.substring(0,top.length-2) );
			clickX = e.clientX;
			clickY = e.clientY;
			winX = left;
			winY = top;					
		}
	}
});
$(document).on({
	mouseup:function(e){
		winDrag = false;
	},
	mousemove:function(e){
		if(winDrag){
			$(winSel).css({
				'left': e.clientX - (clickX - winX) + "px",
				'top' : e.clientY - (clickY - winY) + "px"
				// 'top' : 
					// Math.map(e.clientY,0,window.innerHeight,window.innerHeight,0) 
					// - ( clickY - winY ) - window.innerHeight/4 + "px"
			});
		}
		// if(hazWebGL) webglMouseMove(e); // in webgl.js
		mouseX = e.clientX - window.innerWidth/2;
		mouseY = e.clientY - window.innerHeight/2;
	}
});
$('.win').on({
	click:function(){
		bringToFront( this );
	}
});



// ZINDEX FUNCTIONS --------------------------------
// 
function bringToFront( sel ){
	var z = [];
	$.each( $('.win'), function( i, ele ){
		z.push( parseInt($(ele).css('z-index')) );
	});
	$(sel).css('z-index', z.max()+1 );
}

function isOnTop( id ){
	var z = [];
	$.each( $('.win'), function( i, ele ){
		z.push( parseInt($(ele).css('z-index')) );
	});
	if( $(id).css('z-index') == z.max() ) 
		return true;
	else 
		return false;
}


// CLOSE VIA X BUTTON -----------------------------------------
// 
$('.close').on('click',function(){
	var self = this;
	$(this).parent().parent().fadeOut(500,function(){
		if($(self).parent().parent().attr('id')=="audio"){
			source.stop(); // see audio.js
			$('#toggleAudio').html('▶');
		}
		if($(self).parent().parent().attr('id')=="video"){
			PLYR.pause();
		}		
	});

});


// RESIZE WINDOW ---------------------------------------------
// 
function resizeWin( ele, child ){
	var taW = $($('#'+ele).children()[1]).css('width');
	var taH = $($('#'+ele).children()[1]).css('height');
	var ch = document.getElementById(child);
	if(ch.style.width!=taW || ch.style.height!=taH){
		ch.style.width = taW;
		ch.style.height = taH;
		ch.width = parseInt( taW.substring(0,taW.length-2) );
		ch.height = parseInt( taH.substring(0,taH.length-2) );					
	}
	if( ele == "video"){
		var tw = Math.round($('#vidCntrls').width()*0.95 - (25+8+8) ); //25+8+8 is width+margin of play button
		if( $('#vidProg').width() != tw ){
			$('#vidProg').css('width', tw+"px" );
		}
	}
}


// OPEN VIA CLICK ------------------------------------------
// 
$('.file').on('click',function(e){
	var n = $($(this).children()[1]).text();
	var id = '#'+n;
	if(n=="video"){
		$(id).fadeIn();
		if($('#splash').css('display')!='none'){
			startPiece();
		} else {
			$('#video').fadeIn();
			toggleVid();
		}
	} 
	else if(n=="guide"){
		$(id).fadeIn();
		bringToFront( $('#guide')[0] );
	}
});

// when u click anywhere ( xcept ctxmenu ) remove ctxmenu -----
$(window).on({
	click: function(){
		if(ctxmenu){
			$('.ctxmenu').remove();
			ctxmenu = false;
		}
	}
});


// EDITOR SPECIFIX ----------------------------------------------

function saveEditor(){
	var data = $($('#editor').children()[1]).val();
	var file = $('#editor').attr('data-filename');
	drawData( data );	
	setTimeout(checkForErr,500);
	$.each( $('#bg').children(), function( i, ele ){
		if( $($(ele).children()[1]).html() == file ){
			$($(ele).children()[0]).css('background-image','url(data:image/jpeg;base64,'+data+')');
			$(ele).attr('data-b64',data);
		} 
	});

}

$('#saveEdit').on('click',saveEditor);

$($('#editor').children()[1]).css({'width':'400px','height':'450px'});


// AUDIO SPECIFIX ----------------------------------------------

$('#toggleAudio').on('click',function(){
	if( $(this).html() == '▶' ){
		$(this).html('◼');
		playAudio( $('#audio').attr('data-audio') );
	} else {
		source.stop(); // see audio.js
		$(this).html('▶');
	} 
});

$($('#editor').children()[1]).css({'width':'400px','height':'450px'});



// HOTKEYS -------------------------------------------------------------------------------------------------


document.onkeydown = overrideKeyboardEvent;
document.onkeyup = overrideKeyboardEvent;
var keyIsDown = {};
// modded via >> http://stackoverflow.com/a/10919725/1104148

function overrideKeyboardEvent(e){
	switch(e.type){
		case "keydown":
		if(!keyIsDown[e.keyCode]){
			keyIsDown[e.keyCode] = true;
			// key downs
			if(e.ctrlKey == true && e.keyCode == 83 ) saveEditor();
			if(e.keyCode == 32 ) ($('#splash').css('display')=="none") ? toggleVid() : startPiece();
			if(e.keyCode == 49 ) console.log(PLYR.currentTime);
		}
		break;
		case "keyup":
		delete(keyIsDown[e.keyCode]);
		// key ups
		break;
	}
	disabledEventPropagation(e);
}
function disabledEventPropagation(e){
	if(e){
		if(e.ctrlKey == true && e.keyCode == 83 ){
			if(e.stopPropagation) e.stopPropagation();
			else if(window.event) window.event.cancelBubble = true;
			e.preventDefault();
			return false;
		}
	}
}