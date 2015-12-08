

// GUIDE ---------------------------------------------------


var vid_srcs = ["whois","howto","definitions","politix","everyday_glitch"];
var CH = 0;

function switchChapters( c, viaguide ){
	// if( (viaguide && isOnTop('#guide')) || !(viaguide) ){
		jumpTo(0);
		CH = c;
		var check;
		switch(c){
			case 0: check = /whois/i.test(PLYR.src); break;
			case 1: check = /howto/i.test(PLYR.src); break;
			case 2: check = /definitions/i.test(PLYR.src); break;
			case 3: check = /politix/i.test(PLYR.src); break;
			case 4: check = /everyday_glitch/i.test(PLYR.src); break;
		}
		if(!check) PLYR.src = "videos/"+vid_srcs[c]+"."+USE;
		if( $('#video').css('display')=="none" ) $('#video').fadeIn();
		if( PLYR.paused ) toggleVid();
		if( $('#conditional').css('display') != "none" ) $('#conditional').css('display','none');
	// }
}

$($('#guidemenu').children()[0]).on('click',function(){ switchChapters(0, true) });
$($('#guidemenu').children()[1]).on('click',function(){ switchChapters(1, true) });
$($('#guidemenu').children()[2]).on('click',function(){ switchChapters(2, true) });
$($('#guidemenu').children()[3]).on('click',function(){ switchChapters(3, true) });
$($('#guidemenu').children()[4]).on('click',function(){ switchChapters(4, true) });


// function newBrowser( url ){
// 	$('#bframe').attr('src','');
// 	bringToFront('#browser');
// 	$('#bframe').attr('src',url);
// 	var left = window.innerWidth - $('#browser').width() - 10 + "px"
// 	$('#browser').css({
// 		'top' : "10px",
// 		'left' : left
// 	});
// 	$('#browser').fadeIn();
// }

function newBrowser( img, url, L, T, diffPos ){
	$('#bpic').attr('src','images/'+img);
	bringToFront('#browser');
	$('#browser').fadeIn(250,function(){
		b_lnk = url;
		$('#ilbrowser').css('height', $('#bpic').height()+"px");
		if(!diffPos){
			var l = (L) ? L : 0;
			var t = (T) ? T : 0;
			var left = parseInt($('#video').css('left')) + $('#video').width()*0.75 + l;
			var top = parseInt($('#video').css('top')) - $('#video').height()*0.75 + t;
			// adjust if off screen
			if(left+$('#bpic').width() >= window.innerWidth ) left = window.innerWidth-$('#bpic').width()-10;
			if( top <= 0 ) top = 10;
			$('#browser').css({
				'left' : left+'px',
				'top' : top+'px'
			});				
		} else {
			diffPos();
		}
	});
}
var b_lnk = null;
$('#ilbrowser').on('click',function(){
	if(!PLYR.paused) toggleVid();
	window.open(b_lnk, '_blank');
	window.focus();
	// window.open(b_lnk, 'browser',"status = 1, height = 250, width = 450, resizable = 0");
  	// alert('visit http://nickbriz.com/thoughtsonglitchart at home in order to fully explore all the linked URLs'); // FOR GALLERY INSTALL
});


function newNote( img, url, L, T, diffPos ){
	$('#npic').attr('src','images/'+img);
	bringToFront('#note');
	$('#note').fadeIn(250,function(){
		n_lnk = url;
		$('#ilnote').css('height', $('#npic').height()+"px");
		if(!diffPos){
			var l = (L) ? L : 0;
			var t = (T) ? T : 0;
			var left = parseInt($('#video').css('left')) - $('#npic').width()/2 + l;
			var top = parseInt($('#video').css('top')) + $('#video').height() - $('#npic').height()/2 + t;
			// adjust if off screen
			if( left <= 0 ) left = 10;
			if( top+$('#note').height() >= window.innerHeight ) top = window.innerHeight-$('#note').height() - 10;
			
			$('#note').css({
				'left' : left+'px',
				'top' : top+'px'
			});	
		} else {
			diffPos();
		}	
	});
}
var n_lnk = null;
$('#ilnote').on('click',function(){
	if(!PLYR.paused) toggleVid();
	window.open(n_lnk, '_blank');
  	window.focus();
  	// alert('visit http://nickbriz.com/thoughtsonglitchart at home in order to fully explore all the linked URLs'); // FOR GALLERY INSTALL
});


function doConStat( line ){
	$('#con_stat').html(line);
	bringToFront('#conditional');
	if( $('#conditional').css('display') != "block" ){
		$('#conditional').fadeIn(500,function(){
			$(this).css({
				'top' : '50px',
				'left' : window.innerWidth-$(this).width()-50+"px"
			});
		});		
	} else {
		$('#conditional').css({
			'top' : '50px',
			'left' : window.innerWidth-$('#conditional').width()-50+"px"
		});
	}
}





// VIDEDO ---------------------------------------------------

var PLYR = document.getElementById('videoplayer');

function startPiece(){
	$('#splash').fadeOut();
	// start video at center of page
	$('#video').css({
		'left': window.innerWidth/2 - $('#video').width()/2 + "px",
		'top': window.innerHeight/2 - $('#video').height()/2 + "px"
	});
	// $('#video').css({
	// 	'left': window.innerWidth/4 - $('#video').width()/2 + "px",
	// 	'top': window.innerHeight/4 - $('#video').height()/2 + "px"
	// });
	videoLoop(); // star video loop ( for resizing video && for pnts[CH] [timeline events])
	PLYR.play(); // auto play video 
	$('#video').fadeIn(); // fade in video window
}

function toggleVid(){
	if( PLYR.paused ){
		PLYR.play();
		$('#vidPlay').css({
			'background-position':'-26px 0px',
			'width':'24px'
		});
	} else {
		PLYR.pause();
		$('#vidPlay').css({
			'background-position':'0px 0px',
			'width':'25px'
		});
	} 
}

function jumpTo( sec ){
	if( CH > 4 ) CH = 4;
	for (var i = 0; i < pnts[CH].length; i++) {
		if( pnts[CH][i].type == "closer" ) pnts[CH][i].exec(); // close any open wins
		if( pnts[CH][i].time > sec ) pnts[CH][i].ran = false;  // reset anything yet to come
	};
	if(CH==2){
		// always keep conditoinal titles up in chapter2
		for (var i = 0; i < pnts[CH].length; i++) {
			if( pnts[CH][i].type == "subtitle" && pnts[CH][i].time < sec ){
				pnts[CH][i].ran = false;
				pnts[CH][i].exec();
			}
		};
	}
	PLYR.currentTime = sec;
}

function progBarUpdate( x ){
	var pos = x - $('#vidProg').offset().left;
	var per = 100 * pos / $('#vidProg').width();
	if( per > 100 ) per = 100;
	if( per < 0 ) per = 0;
	$('#vidTime').css('width',per+"%");
	jumpTo( PLYR.duration * per / 100 )
}

function videoLoop(){
	resizeWin( 'video', 'videoplayer' );
	// resizeWin( 'browser', 'bframe' );
	if( pnts[CH] > 4 ) end();
	
	for (var i = 0; i < pnts[CH].length; i++) {
		if( PLYR.currentTime >= pnts[CH][i].time && PLYR.currentTime <= pnts[CH][i].time+1 && pnts[CH][i].ran==false )
			pnts[CH][i].exec();			
	};

	if(CH==0 && PLYR.currentTime > 36 && $($('#bg').children()[1]).css('display')=="none")
		$($('#bg').children()[1]).fadeIn(); // show guide icon
	else if(CH==0 && PLYR.currentTime <= 36 && $($('#bg').children()[1]).css('display')=="block")
		$($('#bg').children()[1]).fadeOut(); // hide guide icon
	else if(CH>0 && $($('#bg').children()[1]).css('display')=="none" )
		$($('#bg').children()[1]).fadeIn(); // show guide icon

	if( (parseInt($('#conditional').css('left'))+$('#conditional').width()) > window.innerWidth-50)
		$('#conditional').css('left', window.innerWidth-$('#conditional').width()-50+"px" );

	if( CH==1 && PLYR.currentTime > 65.5 && typeof $('#bg').children()[2]==="undefined" && pnts[CH][10].ran==false ) 
		{ pnts[CH][10].ran=true; generateIcon( catJPG.name, catJPG.type, catJPG.result ); }
	else if( CH==1 && PLYR.currentTime <= 65.5 && typeof $('#bg').children()[2]!=="undefined" && pnts[CH][10].ran==true )
		{  pnts[CH][10].ran=false; $($('#bg').children()[2]).remove(); }

	requestAnimationFrame(videoLoop);
}

$(PLYR).on({
	click:function(){
		toggleVid();
	},
	loadmetadata:function(){
		// PLYR.duration
	},
	timeupdate:function(){
		var per = 100 * PLYR.currentTime / PLYR.duration;
		$('#vidTime').css('width', per+'%');
	},
	wiating:function(){
		$('.loading').fadeIn(100);
		this.style.opacity = 0.3;
	},
	canplay:function(){
		$('.loading').fadeOut(100);
		this.style.opacity = 1;	
	},
	ended:function(){
		CH++;
		if(CH>4) end();
		else switchChapters( CH );
	}
})

// controls --------------------------------------
$('#vidCntrls').on({
	mouseover:function(){
		$('#vidCntrls').css('opacity','0.8');
	},
	mouseout:function(){
		$('#vidCntrls').css('opacity','0.2');
	}
});
$('#vidPlay').on('click',function(){
	toggleVid();
	return false;
});

var timeDrag = false;  

$('#vidProg').on('mousedown',function(e){
	timeDrag = true;
	progBarUpdate(e.pageX);
});
$(document).on({
	mouseup:function(e){
		if(timeDrag) {
			timeDrag = false;
			progBarUpdate(e.pageX);
		}
	},
	mousemove:function(e){
		if(timeDrag) progBarUpdate(e.pageX);
	}
});


// second video player 
$('#mediaplayer').on({
	ended: function(){
		$('#media').fadeOut();
		PLYR.play();
	}
})


var pnts = [
	[ // ......................................................................... whois
		{
			time: 5,
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				$('#bg').css('background-image','url(images/chicago.gif)');
			}
		},
		{
			time: 6,
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#bg').css('background-image','url(images/bg.jpg)');
			}
		},
		{
			time: 19,
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote( 'antonio.jpg', 'http://www.hellocatfood.com/');
			}
		},
		{
			time: 22,
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
			}
		},
		{
			time: 30,
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				var copy = "THOUGHTS ON GLITCH[ART]v2.0";
				var title = document.createElement('div');
					title.setAttribute('id','title');
					title.style.fontSize = window.innerWidth/(copy.length/2.5)+"px";
					title.innerHTML = copy;
				document.body.appendChild(title);
				$(title).css('margin-top',window.innerHeight/2 - $(title).height()/2 +"px");

			}
		},
		{
			time: 33,
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#title').remove();
			}
		},
		{
			time: 36,
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				var g = $($('#bg').children()[1]);
				var left = parseInt($('#video').css('left')) + $('#video').width() - ($('#guide').width()/2) + "px"
				g.fadeIn();
				$('#guide').css({
					'top' : window.innerHeight/2 - $('#guide').height()/2 + "px",
					'left' : left
				});
				g.click();
			}
		},
		{
			time: 41.2,
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				bringToFront( $('#video')[0] );
			}
		},
		{
			time: 45.8,
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('brakhage.png','https://en.wikipedia.org/wiki/Stan_Brakhage#1970s_and_1980s');
			}
		},
		{
			time: 48.9,
			ran: false,
			type: null,
			exec: function(){
				this.ran = true;
				bringToFront('#video');
			}
		},
		{
			time: 60.5,
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote( 'oldglitch.png', 'http://web.archive.org/web/20130114022824/http://www.nickbriz.com/anuhmitdata.htm' );
			}
		},
		{
			time: 68.5,
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
				$('#browser').fadeOut();
			}
		},
		{
			time: 72.5,
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('flickr.png','https://web.archive.org/web/20091224043750/http://www.flickr.com/groups/52241691728@N01');
			}
		},
		{
			time: 84.5,
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				$('#browser').fadeOut();
			}
		},
		{
			time: 85,
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('tutorial.png','https://www.youtube.com/playlist?list=PLE7F731BE271DC5D4');
			}
		},
		{
			time: 90,
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				bringToFront('#video');
			}
		},
		{
			time: 91.15,
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('satrom.jpg','http://jonsatrom.com/');
			}
		},
		{
			time: 91.75,
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('rosa.jpg','http://rosa-menkman.blogspot.com/',150);
			}
		},
		{
			time: 92.35,
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('evan.jpg','http://evanmeaney.com/',250);
			}
		},
		{
			time: 93,
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
			}
		},
		{
			time: 93,
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('glidottcslashh.png', 'http://gli.tc/h');
			}
		},
		{
			time: 98.7,
			ran: false,
			type: null,
			exec: function(){
				this.ran = true;
				bringToFront('#video');
			}
		},
		{
			time: 106,
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#browser').fadeOut();
				$('#note').fadeOut();
			}
		}

	],
	[ // .......................................................................................................................................... howto
		{
			time: 0.9,
			ran: false,
			type: null,
			exec: function(){
				this.ran = true;
				var copy = "HOW TO GLITCH ART";
				var title = document.createElement('div');
					title.setAttribute('id','title');
					title.style.fontSize = window.innerWidth/(copy.length/2.5)+"px";
					title.innerHTML = copy;
				document.body.appendChild(title);
				$(title).css('margin-top',window.innerHeight/2 - $(title).height()/2 +"px");
			}
		},
		{
			time: 2.56,
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#title').remove();
			}
		},
		{
			time: 20.73, // glitch how to
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('unfamiliar.png','#',null,null,function(){
					var left = parseInt($('#video').css('left'))+$('#video').width()/2 - $('#note').width()/2;
					var top = parseInt($('#video').css('top'))+$('#video').height() - $('#npic').height()/2 ;
					$('#note').css({
						'left' : left+'px',
						'top' : top+'px'
					});	
				});
			}
		},
		{
			time: 28.7, // how to steps
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('howto1.png','#');
			}
		},
		{
			time: 35, // how to steps
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('howto2.png','#');
			}
		},
		{
			time: 41, // how to steps
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('howto3.png','#');
			}
		},
		{
			time: 44.6, // how to steps
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('howto4.png','#');
			}
		},
		{
			time: 49.3, // how to steps
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('howto5.png','#');
			}
		},
		{
			time: 53.2, // how to steps
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('howto6.png','#');
			}
		},
		{
			time: 57.3, // how to steps
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
			}
		},
		{
			time: 65.533832, // generate at image [10]
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				if( typeof $($('#bg').children()[2]) === 'undefined' )
					generateIcon( catJPG.name, catJPG.type, catJPG.result );
			}
		},
		{
			time: 67.301179, // double click cat [11]
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				$($('#bg').children()[2]).dblclick();
				$('#canvas').css({
					'left': 100 + "px",
					'top':  50 + "px"
				});
				bringToFront('#canvas');
			}
		},
		{
			time: 71.067619, // right mouse click cat
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				genCtxMenu(
					{  clientX: 60,  clientY: 240 }, 
					catJPG.result, 
					catJPG.name, 
					$($('#bg').children()[2]).attr('id')
				);	
			}
		},
		{
			time: 77.167846, // open in audio
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				$($('.ctxmenu').children()[2]).click();
				$('#audio').css({
					'left': window.innerWidth/2 - $('#audio').width()/2 + "px",
					'top':  window.innerHeight/2 - $('#audio').height()/2 + "px"
				});
				bringToFront('#audio');
			}
		},
		{
			time: 80, // close audio
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#audio').fadeOut();
			}
		},
		{
			time: 82.900386, // open in text editor
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				genCtxMenu(
					{  clientX: 60,  clientY: 240 }, 
					catJPG.result, 
					catJPG.name, 
					$($('#bg').children()[2]).attr('id')
				);
				$($('.ctxmenu').children()[1]).click();
				$('#editor').css({
					'left': window.innerWidth - $('#editor').width() - 50 + "px",
					'top':  50 + "px"
				});
				bringToFront('#editor');
			}
		},
		{
			time: 87.967902, // edit the text ( databend )
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				databend();
			}
		},
		{
			time: 110.533539, // close all
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#canvas').fadeOut();
				$('#editor').fadeOut();
			}
		},
		{
			time: 111.300456, // return to fundamental idea
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('unfamiliar.png','#',null,null,function(){
					var left = parseInt($('#video').css('left'))+$('#video').width()/2 - $('#note').width()/2;
					var top = parseInt($('#video').css('top'))+$('#video').height() - $('#npic').height()/2 ;
					$('#note').css({
						'left' : left+'px',
						'top' : top+'px'
					});	
				});
			}
		},
		{
			time: 119, // close idea
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
			}
		}
	],
	[ // .................................................................................................................................... definitions
		{
			time: 0.86,
			ran: false,
			type: null,
			exec: function(){
				this.ran = true;
				var copy = "DEFINITIONS && CONDITIONAL STATEMENTS";
				var title = document.createElement('div');
					title.setAttribute('id','title');
					title.style.fontSize = window.innerWidth/(copy.length/2.5)+"px";
					title.innerHTML = copy;
				document.body.appendChild(title);
				$(title).css('margin-top',window.innerHeight/2 - $(title).height()/2 +"px");
			}
		},
		{
			time: 2.66,
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#title').remove();
			}
		},
		{
			time: 26.1,
			ran: false,
			type: 'subtitle',
			exec: function(){
				this.ran = true;
				doConStat('glitch != error');
			}
		},
		{
			time: 77,
			ran: false,
			type: 'subtitle',
			exec: function(){
				this.ran = true;
				doConStat('glitch == unexpected');
			}
		},
		{
			time: 96.06, // def
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('glitchdef.png','#');				
			}
		},
		{
			time: 104.23, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();			
			}
		},
		{
			time: 130, // ngram
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('ngram.png', 'https://books.google.com/ngrams/graph?content=glitch');
			}
		},
		{
			time: 135.5, // time
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('time.png','http://content.time.com/time/magazine/0,9263,7601650723,00.html');				
			}
		},
		{
			time: 143.3, // hide 'em
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
				$('#browser').fadeOut();
			}
		},
		{
			time: 148, // histories essay
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('histories.png','http://www.nickbriz.com/glitchresearch/GlitchArtHistories2011.pdf');
			}
		},
		{
			time: 158, // close histories
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
			}
		},
		{
			time: 158.2, // glitch != file
			ran: false,
			type: 'subtitle',
			exec: function(){
				this.ran = true;
				doConStat('glitch != file');
			}
		},
		{
			time: 176.3, // vernacular
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('vernacular.png','http://rosa-menkman.blogspot.no/2010/08/vernacular-of-file-formats-2-workshop.html');
			}
		},
		{
			time: 177.6, // ceibas
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('ceibas.png','http://www.evanmeaney.com/ceibas/interior/ceibasdownloads.html');
			}
		},
		{
			time: 181.8, // close 'em
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
				$('#browser').fadeOut();
			}
		},
		{
			time: 193.2, // diff apps same glitch 1
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('diff_app1.png','#');
			}
		},
		{
			time: 195.5, // diff apps same glitch 2
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('diff_app2.png','#');
			}
		},
		{
			time: 197.3, // diff apps same glitch 3
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('diff_app3.png','#');
			}
		},
		{
			time: 199, // close it
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
			}
		},
		{
			time: 228, // glitch art != glitch
			ran: false,
			type: 'subtitle',
			exec: function(){
				this.ran = true;
				doConStat('glitch art != glitch');
			}
		},
		{
			time: 232.9, // wiki def
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('wikidef.png','https://en.wikipedia.org/wiki/Glitch_art');
			}
		},
		{
			time: 243.6, // wiki old
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('wikiold.png','https://en.wikipedia.org/w/index.php?title=Glitch_art&oldid=289406555');
			}
		},
		{
			time: 249.9, // wiki new
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('wikinew.png','https://en.wikipedia.org/wiki/Glitch_art');
			}
		},
		{
			time: 256.0, // close wiki
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
				$('#browser').fadeOut();
			}
		},
		{
			time: 264.2, // wiki def
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('glitchartdef.png','#',null,null,function(){
					var left = parseInt($('#video').css('left'))+$('#video').width()/2 - $('#note').width()/2;
					var top = parseInt($('#video').css('top'))+$('#video').height() - $('#npic').height()/2 ;
					$('#note').css({
						'left' : left+'px',
						'top' : top+'px'
					});	
				});
			}
		},
		{
			time: 270.7, // close def
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
			}
		},
		{
			time: 278.434943, // art of google books
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('googlebooks.png','http://theartofgooglebooks.tumblr.com/search/glitch');
			}
		},
		{
			time: 280.901247, // glitch safari
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('glitchsafari.png','https://www.flickr.com/groups/glitchsafari/');
			}
		},
		{
			time: 282.534512, // antonio
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('antonio.jpg','#http://www.hellocatfood.com/');
			}
		},
		{
			time: 283.501043, // jeff
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('jeffdonaldson.jpg','http://www.notendo.com/');
			}
		},
		{
			time: 287.5, // databending
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('stallio.jpg','http://www.animalswithinanimals.com/stallio/');
				newBrowser('databending.png','http://blog.animalswithinanimals.com/2008/08/databending-and-glitch-art-primer-part.html');
			}
		},
		{
			time: 288.868163, // datamoshing
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('mosher.png','https://www.youtube.com/user/datamosher');
				newBrowser('datamoshing.png','https://www.youtube.com/watch?v=tYytVzbPky8');
			}
		},
		{
			time: 291.467732, // close out...
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#browser').fadeOut();
				$('#note').fadeOut();
			}
		},
		{
			time: 304.800654, // though...
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('though.png','http://www.phillipstearns.com/glitchtextiles/');
			}
		},
		{
			time: 305.533897, // awsum...
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('many.png','https://dl.dropboxusercontent.com/u/9054743/lofi%20Rosa%20Menkman%20-%20A%20Vernacular%20of%20File%20Formats.pdf');
			}
		},
		{
			time: 306.367185, // are...
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('are.png','#http://leanneeisen.com/artwork/1259114_Manitoba_Up_in_Flames.html');
			}
		},
		{
			time: 307.567389, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#browser').fadeOut();
			}
		},
		{
			time: 310.434418, // ucnv
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('ucnv.png','http://ucnv.org/');
				newBrowser('ucnv1.png','http://ucnv.org/newvulnerability/');
			}
		},
		{
			time:313.93426, //	ben 1
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('benjamingoulon.jpg','http://www.recyclism.com/');
				newBrowser('ben1.png','http://www.recyclism.com/corrupt_desktop.php');
			}
		},
		{
			time: 314.933942, // ben 2
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('ben2.png','http://www.recyclism.com/kindleglitched.php');
			}
		},
		{
			time:317.367253, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#browser').fadeOut();
				$('#note').fadeOut();
			}
		},
		{
			time: 320.70127, // psycadelic
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('psycadelic.png','http://www.eai.org/title.htm?id=14351');
			}
		},
		{
			time: 324.034022, // failure
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('failure.png','http://satromizer.com/sOS/');
			}
		},
		{
			time: 324.801301, // chance
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('chance.png','http://www.beflix.com/works/glitch.php');
			}
		},
		{
			time: 325.601573, // memory
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('memory.png','http://www.evanmeaney.com/cycle/#shannon');
			}
		},
		{
			time: 326.534498, // entropy
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('entropy.png','http://danieltemkin.com/Entropy');
			}
		},
		{
			time: 327.400326, // nostalgia
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('nostalgia.png','http://no-carrier.com/index.php?/glitchnes/');
			}
		},
		{
			time: 330.001029, // glitch karaoke
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('karaoke.png','http://glti.ch/');
			}
		},
		{
			time: 332.800371, // glitch feminism
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('feminism.png','http://rhizome.org/editorial/2013/mar/12/glitch-body-politic/');
			}
		},
		{
			time: 334, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#browser').fadeOut();
			}
		},
		{
			time: 334.5, // glitch != medium
			ran: false,
			type: 'subtitle',
			exec: function(){
				this.ran = true;
				doConStat('glitch art != a medium');
			}
		},
		{
			time: 343.367346, // gifs
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('gifs.png','http://systemsapproach.net/ANIMATEDGIFs.html');
			}
		},
		{
			time: 344.200807, // videos
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('videos.png','https://www.youtube.com/watch?v=w-F-d1JBVoQ');
			}
		},
		{
			time: 345.067632, // perform
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('perform.png','http://vaudeosignal.com/');
			}
		},
		{
			time: 346.134571, // software
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('software.png','http://www.ffd8.org/header_remix/');
			}
		},
		{
			time: 346.934593, // installations
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('installation.png','http://crackedraytube.com/');
			}
		},
		{
			time: 347.734548, // prints
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('prints.png','https://secure.flickr.com/photos/uima/14864223016/in/album-72157646286005434/');
			}
		},
		{
			time: 348.734163, // wall
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('wall.png','http://master-list2000.com/abillmiller/index.php/2013/gridworkswalldrawing4/');
			}
		},
		{
			time: 349.533959, // textiles
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('textiles.png','http://melissabarron.net/');
			}
		},
		{
			time: 350.400965, // furniture
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('furniture.png','http://animalnewyork.com/2013/good-vibrations-glitch-furniture-carved-from-wood/');
			}
		},
		{
			time: 351.5, // close 'em
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#browser').fadeOut();
			}
		},
		{
			time: 358.867065, // glitch != aesthetic
			ran: false,
			type: 'subtitle',
			exec: function(){
				this.ran = true;
				doConStat('glitch art != an aesthetic');
			}
		},
		{
			time: 364.800831, // artifacts
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('artifacts.png','http://pixlpa.com/creeper/index.html');
			}
		},
		{
			time: 366.800695, // jpeg bends
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('jpg.png','https://www.instagram.com/p/8a7IL1nSqx/');
			}
		},
		{
			time: 368.101307, // video bleeding
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('bleed.png','https://vimeo.com/76195499');
			}
		},
		{
			time: 371.000695, // zalgo
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('zalgo.png','http://thecreatorsproject.vice.com/blog/glitchr-is-the-most-interesting-artist-hacker-on-facebook');
			}
		},
		{
			time: 374.367158, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#browser').fadeOut();
			}
		},
		{
			time: 403.667044, // glith art == an ethic
			ran: false,
			type: 'subtitle',
			exec: function(){
				this.ran = true;
				doConStat('glitch art == an ethic');
			}
		},
		{
			time: 433.067226, // jodi
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('jodi.png','http://motherboard.vice.com/read/jodi-something-wrong-is-nothing-wrong');
			}
		},
		{
			time: 441.93455, // close jodi 
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
			}
		},
		{
			time: 460.56709, // satrom
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('satrom.jpg','http://jonsatrom.com/');
			}
		},
		{
			time: 472.734119, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
			}
		}
	],
	[ // ......................................................................................................................................... politix
		{
			time: 1.30136,
			ran: false,
			type: null,
			exec: function(){
				this.ran = true;
				var copy = "THE POLITIX IN/OF GLITCH";
				var title = document.createElement('div');
					title.setAttribute('id','title');
					title.style.fontSize = window.innerWidth/(copy.length/2.5)+"px";
					title.innerHTML = copy;
				document.body.appendChild(title);
				$(title).css('margin-top',window.innerHeight/2 - $(title).height()/2 +"px");
			}
		},
		{
			time: 3.46,
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#title').remove();
			}
		},
		{
			time: 8.034399, // 20111
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('politix1.png','#');
			}
		},
		{
			time: 11.968344, // uk
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('politix2.png','https://www.academia.edu/5892766/politix_in_of_glitch_art_at_Vivid_Birmingham_UK_');
			}
		},
		{
			time: 14.768299, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#browser').fadeOut();
			}
		},
		{
			time: 31.968344, // advisors
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('advisors.png','#');
			}
		},
		{
			time: 34.33458, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
			}
		},
		{
			time: 37.067482, // GCT
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('gct.png','http://nickbriz.com/glitchcodectutorial/');
			}
		},
		{
			time: 14.768299, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
			}
		},
		{
			time: 49.067891, // tactical glitches
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('rosa.jpg','http://rosa-menkman.blogspot.com/');
				newBrowser('tactical.jpg','http://www.sudlab.com/Tactical-Glitches/');
			}
		},
		{
			time: 53.467528, // sabatoge
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('cloninger.gif','http://www.lab404.com/');
				newBrowser('manifesto.png','http://booksfromthefuture.tumblr.com/post/86197395718/sabotage-glitch-politix-manualifesto');
			}
		},
		{
			time: 57.366984, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
				$('#browser').fadeOut();
			}
		},
		{
			time: 57.6673, // ellan
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('ellan.png','#');
			}
		},
		{
			time: 60.7002, // ellan 2
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('ullman.png','https://books.google.com/books?id=n6JbXgs367IC&printsec=frontcover&dq=ellan+ullman+clsoe+to+the+machine&hl=en&sa=X&ved=0ahUKEwjg9paYy8jJAhVh7YMKHa8aAVsQ6AEIKDAA#v=onepage&q&f=false');
			}
		},
		{
			time: 106.6, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
				$('#browser').fadeOut();
			}
		},
		{
			time: 117.800601, // formats
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('formats.png','#');
			}
		},
		{
			time: 120, // reorder
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				bringToFront('#video');
			}
		},
		{
			time: 126.433889, // txt
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('txt.png','#');
			}
		},{
			time: 133.067086, // pdf
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('pdf.png','#');
			}
		},
		{
			time: 152.000306, // doc
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('doc.png','#');
			}
		},
		{
			time: 162.333798, // wwf
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('wwf.png','#');
			}
		},
		{
			time: 175.4, // formats
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('formats.png','#');
			}
		},
		{
			time: 176, // formats
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				var left = parseInt($('#video').css('left'))+$('#video').width()/2 - $('#note').width()/2;
				var top = parseInt($('#video').css('top'))+$('#video').height() - $('#npic').height()/2 ;
				$('#note').css({
					'left' : left+'px',
					'top' : top+'px'
				});	
			}
		},
		{
			time: 181.034885, // reorder
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				bringToFront('#video');
			}
		},
		{
			time: 194.467102, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
			}
		},
		{
			time: 194.733905, // mcluhan
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('mcluhan.png','#');
			}
		},
		{
			time: 196.301161, // mcluhan1
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('mcluhan1.png','https://books.google.com/books/about/The_medium_is_the_massage.html?id=3sloAAAAIAAJ');
			}
		},
		{
			time: 217.734132, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
				$('#browser').fadeOut();
			}
		},
		{
			time: 266.734996, // pause
			ran: false,
			type: null,
			exec: function(){
				this.ran = true;
				PLYR.pause();
				$('#media').fadeIn(100,function(){
					$('#media').css({
						'left' : window.innerWidth/2 - $('#media').width()/2 + "px",
						'top' : window.innerHeight/2 - $('#media').height()/2 + "px"
					});
					$('#mediaplayer')[0].play();
				});
				bringToFront('#media');
			}
		},
		{
			time: 267, // apple
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('apple.png','https://www.youtube.com/watch?v=RQieoqCLWDo');
			}
		},
		{
			time: 300.867372, // apple
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('apple2.png','https://www.youtube.com/watch?v=RQieoqCLWDo');
			}
		},
		{
			time: 304.134537, // apple 2
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('apple1.png','https://www.youtube.com/watch?v=RQieoqCLWDo');
			}
		},
		{
			time: 307.333676, // apple
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('apple.png','https://www.youtube.com/watch?v=RQieoqCLWDo');
				bringToFront('#video');
			}
		},
		{
			time: 330.3675 , // apple
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('apple2.png','https://www.youtube.com/watch?v=RQieoqCLWDo');
			}
		},
		{
			time: 332.334167, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
			}
		},
		{
			time: 365.5, // nelson
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('nelson.png','https://www.youtube.com/watch?v=KdnGPQaICjk');
			}
		},
		{
			time: 379, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
			}
		},
	],
	[ // ...................................................................................................................................... everyday_glitch
		{
			time: 2,
			ran: false,
			type: null,
			exec: function(){
				this.ran = true;
				var copy = "THE PRACTICE OF EVERYDAY GLITCH";
				var title = document.createElement('div');
					title.setAttribute('id','title');
					title.style.fontSize = window.innerWidth/(copy.length/2.5)+"px";
					title.innerHTML = copy;
				document.body.appendChild(title);
				$(title).css('margin-top',window.innerHeight/2 - $(title).height()/2 +"px");
			}
		},
		{
			time: 3.7,
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#title').remove();
			}
		},
		{
			time: 4.934126, // media live
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('medialive.png','http://bmoca.org/calendar/view/public-program/medialive-2014');
			}
		},
		{
			time: 8.901292, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
			}
		},
		{
			time: 40.767165, // refrag
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('refrag.png','http://refrag.paris/');
			}
		},
		{
			time: 42.333764, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#browser').fadeOut();
			}
		},
		{
			time: 74.934126, // chaplan
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('chaplan.png','#');
			}
		},
		{
			time: 82.6, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
			}
		},
		{
			time: 94.801043, // cloninger
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('cloninger.gif','http://lab404.com/');
			}
		},
		{
			time: 100.6, // quote
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('curtquote.png','http://lab404.com/articles/commodify_your_consumption.pdf');
			}
		},
		{
			time: 139.4, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
				$('#browser').fadeOut();
			}
		},
		{
			time: 159.8, // walter benjamin
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('benjamin.png','https://www.marxists.org/reference/subject/philosophy/works/ge/benjamin.htm');
			}
		},
		{
			time: 181.4, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
			}
		},
		{
			time: 226.700285, // creators project 
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				$('#browser').fadeOut(10,function(){
					newBrowser('glitchr.jpg','http://thecreatorsproject.vice.com/blog/glitchr-is-the-most-interesting-artist-hacker-on-facebook');	
				});
				
			}
		},
		{
			time: 227.967869, // zakas
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('zakas.png','http://laimonaszakas.com/');
			}
		},
		{
			time: 229.334195, // glitchr
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newNote('glitchr.png','https://twitter.com/glitchr_');
			}
		},
		{
			time: 233.234536, // zakas quote
			ran: false,
			type: 'opener',
			exec: function(){
				this.ran = true;
				newBrowser('zakasquote.png','http://thecreatorsproject.vice.com/blog/glitchr-is-the-most-interesting-artist-hacker-on-facebook');
			}
		},
		{
			time: 249.534171, // close
			ran: false,
			type: 'closer',
			exec: function(){
				this.ran = true;
				$('#note').fadeOut();
				$('#browser').fadeOut();
			}
		},
	]
];



function end(){
 location.reload();
}


