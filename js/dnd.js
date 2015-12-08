var BG = document.getElementById('bg');

/* 
var acceptedTypes = {
	'image/png': true,
	'image/jpeg': true,
	'image/gif': true
};
// acceptedTypes[file.type] === true
*/

if( 'draggable' in document.createElement('span') ){

	BG.addEventListener("dragenter", dndEnter, false);
	BG.addEventListener("dragover", dndOver, false);
	BG.addEventListener("drop", dndDrop, false);

} else {
	alert('your browser does not support drag && drop... u might wanna switch');
}


function dndEnter(e){
	// dropListing.innerHTML = '';
	this.style.opacity = 0.5;
	e.stopPropagation();
	e.preventDefault();
}
function dndOver(e){
	e.stopPropagation(); 
	e.preventDefault();
}
function dndDrop(e){
	this.style.opacity = 1;
	if( e.dataTransfer.files.length > 1 )
		alert( 'one file at a time please, ^_^' );
	else readFile( e.dataTransfer.files[0] )
	e.stopPropagation();
	e.preventDefault();
}

//
//
//

function readFile( file ){
	if (typeof FileReader !=='undefined' && file.type === "image/jpeg" && file.size <= 150000) {
		var reader = new FileReader();
		reader.onload = function (e) {
			generateIcon( file.name, file.type, e.target.result );
			// console.log(e.target.result)
		};
		reader.readAsDataURL(file);
	}  else {
		if(typeof FileReader == 'undefined') alert('loox like ur browser doesn\'t have a FileReader, might be time for an upgrade');
		else if(file.type !== "image/jpeg") alert("at the moment this demo only supports jpeg/jpg files, sorry :( ");
		else if(file.size > 150000) alert('sorry, this demo doesn\'t work well with large files, try something under 150kb')
	}
}





function generateIcon( f_name, f_type, img_src ){
	var img = new Image();
	img.onload = function(){
		var f = document.createElement('div');
			f.className = "file";
		var i = document.createElement('div');
			i.className = "icon";
			i.style.border = "2px solid #000";
			i.style.backgroundImage = "url("+this.src+")";
			i.style.backgroundSize = "50px 60px";
		var n = document.createElement('div');
			n.className = "filename";
			n.innerHTML = f_name;
		f.appendChild( i );
		f.appendChild( n );
		f.setAttribute('data-type', f_type );
		f.setAttribute('id', "ID"+Date.now() );
		BG.appendChild( f );

		// load up base64 
		var data = img_src.replace(/^data:image\/\w+;base64,/, "");
		$('#ID'+Date.now()).attr('data-b64',data);
		$($('#editor').children()[1]).val( data );
		CUR_DATA = data; // in canvas.js

		$(f).on({
			dblclick: function(){
				openFile( this.getAttribute('id') );
			},
			click: function(){
				openFile( this.getAttribute('id') );
			},
			contextmenu: function(e){
				genCtxMenu(e, img_src, f_name, this.getAttribute('id'));
				return false;
			}
		});
	}
	img.src = img_src;
}	


function openFile( id ){
	drawData( $('#'+id).attr('data-b64'), true );
	$('#canvas').fadeIn();
}

var ctxmenu = false;

function bringToFront( sel_win ){
	$.each( $('.win'), function( i, ele ){ 
		$(ele).css('z-index','1'); 
	});
	$( sel_win ).css('z-index','2');
}

function genCtxMenu(e, img_src, f_name, id){
	if(!ctxmenu){
		ctxmenu = true;
		var cm = document.createElement('div');
			cm.className = "ctxmenu";
			cm.style.left = e.clientX +"px";
			cm.style.top = e.clientY +"px";
		
		var dft = document.createElement('div');
			dft.className = "ctxitem";
			dft.innerHTML = "open with default app";
			dft.onclick = function(){
				openFile( id );
				bringToFront('#canvas');
			}

		var edt = document.createElement('div');
			edt.className = "ctxitem";
			edt.innerHTML = "open with text editor";
			edt.onclick = function(){
				$($('#editor').children()[1]).val( $('#'+id).attr('data-b64') );
				$('#editor').attr('data-filename', f_name  );
				bringToFront('#editor');
				$('#editor').fadeIn();
			}

		var adio = document.createElement('div');
			adio.className = "ctxitem";
			adio.innerHTML = "open with audio player";
			adio.onclick = function(){
				var data = img_src.replace(/^data:image\/\w+;base64,/, "");
				$('#audio').attr('data-audio', data );
				playAudio( data );
				bringToFront('#audio');
				$('#audio').fadeIn();
			}

		cm.appendChild( dft );
		cm.appendChild( edt );
		cm.appendChild( adio );
		document.body.appendChild( cm );
	}
}

