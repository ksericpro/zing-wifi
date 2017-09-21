var WIFI = {}

//Constants
WIFI.url_1="resouces/sample.mp4";
WIFI.url_2="resouces/jpm-1.mp4";
WIFI.play_url = WIFI.url_2;
WIFI.freeze_time = 5000; //change to 20s
WIFI.supportsiframe = false;
WIFI.video_width = 320;
WIFI.video_height = 240;
WIFI.iframe_border_buffer = 5;
WIFI.wait_div_id = "myPleaseWait";
WIFI.wait_div = '<div class="modal fade bs-example-modal-sm" id="'
			+WIFI.wait_div_id+'" tabindex="-1"'
			+'role="dialog" aria-hidden="true" data-backdrop="static">'
			+'<div class="modal-dialog modal-sm">'
			+'<div class="modal-content">'
            +'<div class="modal-header">'
            +'    <h4 class="modal-title">'
            +' <span class="glyphicon glyphicon-time">'
            +'</span>Please Wait'
            +'</h4></div>'
            +'<div class="modal-body">'
            +'   <div class="progress">'
            +'        <div class="progress-bar progress-bar-info'
            +'progress-bar-striped active"'
            +'       style="width: 100%">'
            +'       </div>'
            +'    </div></div></div></div></div>';

WIFI.continue_div_id = "continueDialog";
WIFI.contine_div = '<div id="' + WIFI.continue_div_id +'" class="modal fade custom" role="dialog">'
			+ '<div class="modal-dialog custom">'
			+ '<div class="modal-content">'
			+ '<div class="modal-header">'
			+ '<button type="button" class="close" data-dismiss="modal">&times;</button>'
			+ '<h4 class="modal-title">Welcome to Zing Mobile</h4>'
			+ '</div>'
			+ '<div class="modal-body">'
			+ '<p>Setting Up.....</p>'
			+ '</div>'
			+ '<div class="modal-footer">'
			+ '<button type="button" class="btn btn-default" data-dismiss="modal" id="closebutton">Proceed</button>'
			+ '</div></div></div></div>';
			
WIFI.msg_id = "msg";
WIFI.video_div = "video_content_panel";
WIFI.video_id = "video";

//Busy
WIFI.busy = function() {
    //alert("busy");  
	$('#'+WIFI.wait_div_id).modal('show');
}

//Not busy
WIFI.notBusy = function() {
    //alert("not busy");  
	$('#'+WIFI.wait_div_id).modal('hide');
}

//continue
WIFI.onContinue = function()
{
	$('#'+WIFI.continue_div_id).modal('show');
}
	
//off conitnue
WIFI.offContinue = function()
{
	$('#'+WIFI.continue_div_id).modal('hide');
}

//fire event
WIFI.eventFire = function(el, etype)
{
	if (el.fireEvent) {
		el.fireEvent('on' + etype);
	} else {
		var evObj = document.createEvent('Events');
		evObj.initEvent(etype, true, false);
		el.dispatchEvent(evObj);
	}
}

WIFI.setupTouchEvent = function()
{
	window.addEventListener('touchstart', function videoStart() {
		//alert("touch start");
		console.log("Touch Start");
		WIFI.eventFire(document.getElementById(WIFI.video_id), 'play');
		var video = document.getElementById(WIFI.video_id);
		
		//if (video!=null) alert("plauingg");
		/*var video = document.getElementById(WIFI.video_id);
				video.onplay = function () {
							//do something
							$("#msg").html("video is playing automatically. ");
							if (video.paused) { video.play(); }
							else { video.play(); }
						};*/
						
		// remove from the window and call the function we are removing
		this.removeEventListener('touchstart', videoStart);
		//off dialog
		WIFI.offContinue();
	});
	//triggerEvent( window, 'touchstart' );
	$( "#closebutton" ).click(function() {
		//offContinue();
		//alert("dsd");
		WIFI.eventFire(document.getElementById(WIFI.video_id), 'play');
	});
}

//Setup Span and Video Div
WIFI.setupMessageAndVideoDiv = function()
{
	var msgspan = document.createElement('span');
	msgspan.id =  WIFI.msg_id;
	document.body.insertBefore(msgspan, document.body.firstChild);
		
	var playdiv = document.createElement('div');
	playdiv.id = WIFI.video_div;
	document.body.insertBefore(playdiv, msgspan.nextSibling);
}

//Message
WIFI.setMessage = function(msg)
{
	$("#"+WIFI.msg_id).html(msg);
}

//Load CSS, JS 
WIFI.loadjscssFile = function(filename, filetype) {
	
	//alert(filename + " " +filetype);
    if (filetype == "js") { //if filename is a external JavaScript file
        //alert('called');
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)               
     }
     else if (filetype == "css") { //if filename is an external CSS file
		var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
     }
     if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

//Create Bootstrap DIV
WIFI.createWaitDiv = function() {
	var bdy = document.getElementsByTagName("body")[0]; // body element
	var newDiv = document.createElement("div");
	newDiv.innerHTML = WIFI.wait_div;
	// append to body
	bdy.appendChild(newDiv);
}

WIFI.createContinueDiv = function() {
	var bdy = document.getElementsByTagName("body")[0]; // body element
	var newDiv = document.createElement("div");
	newDiv.innerHTML = WIFI.contine_div;
	// append to body
	bdy.appendChild(newDiv);
}

//Supports Event
WIFI.elemSupportsEvent = function(elem,e) {
	var f = document.createElement(elem);
	if (e in f)
	{
		console.log(elem + ' supports the '+ e + ' event');
		return true;
	}
	console.log(elem + ' doesn\'t support the '+ e + ' event');
	return false;
}

//resize to content
WIFI.resizeIFrameToFitContent = function( iFrame ) {
	iFrame.width  = iFrame.contentWindow.document.body.scrollWidth + WIFI.iframe_border_buffer;
	iFrame.height = iFrame.contentWindow.document.body.scrollHeight + WIFI.iframe_border_buffer;
}
			
//Add source to Video
WIFI.addSourceToVideo = function(element, src, type) {
	var source = document.createElement('source');

	source.src = src;
	source.type = type;

	element.appendChild(source);
}
			
//Toggle control
WIFI.toggleControlsVideo = function (video) {
	if (video.hasAttribute("controls")) {
		video.removeAttribute("controls")   
	} else {
		video.setAttribute("controls","controls")   
	}
}
			
//resize video
WIFI.resizeVideo = function (video)
{
	video.width = WIFI.video_width;
	video.height = WIFI.video_height;
}

//Create Video
WIFI.createVideo = function()
{
	//Auto Play
	var supportsVideoElement = !!document.createElement('video').canPlayType;				
	console.log("<Video> Supported="+supportsVideoElement);
	
	if (supportsVideoElement)
	{
	
		console.log("Creating <video>");
		var temp = document.createElement('video');
		var canPlay_MP4 = temp.canPlayType('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
		var canPlay_OGV = temp.canPlayType('video/ogg; codecs="theora,vorbis"');
		var canPlay_WEMB = temp.canPlayType('video/webm; codecs="vp8,vorbis"');
					
		console.log("canPlay_MP4="+canPlay_MP4 + ", canPlay_OGV=" + canPlay_OGV + ", canPlay_WEMB=" +canPlay_WEMB );
					
		var content = '<video id="' + WIFI.video_id +'" width="'+WIFI.video_width+'" height="'+ WIFI.video_height+'" controls autoplay poster="1.jpg">'+
					'<source src="'+WIFI.play_url+'" type="video/mp4">'+
					'Your browser does not support the video tag.'+
					'</video>';
					
		//Create Video
		var video = document.createElement('video');
		video.id = WIFI.video_id;
		console.log("start playing "+WIFI.play_url);
		video.setAttribute('poster','1.jpg');
		WIFI.addSourceToVideo(video, WIFI.play_url, 'video/mp4');
		WIFI.toggleControlsVideo(video);
		WIFI.resizeVideo(video);	
	
		if(video != null)//if possibility of no video loaded in DOM
		{
			video.onplay = function () {
			//do something
			//alert("play automatically");
			WIFI.setMessage("video is playing automatically. iframe="+WIFI.supportsiframe);
			if (video.paused) { video.play(); }
			else { video.play(); }
	
			WIFI.offContinue();
			};
		}
	
		//if (!WIFI.supportsiframe)//should be !supportsiframe
		//{
			console.log("using DIV");
			document.getElementById(WIFI.video_div).appendChild(video);
			//video.pause();	
			video.play();
		/*}
		else {
			console.log("using xxxframe");
			console.log("Destroying Original player")
			$('#' + WIFI.video_id ).remove();
			console.log("Using IFrame");
			var iframe = document.createElement('iframe');		
			document.getElementById(WIFI.video_div).appendChild(iframe);
			iframe.contentWindow.document.open();
			iframe.contentWindow.document.write(content);
			iframe.contentWindow.document.close();
			WIFI.resizeIFrameToFitContent(iframe);
		}*/
	
		//Setup Touch
		WIFI.setupTouchEvent();
	}
	else {		
		WIFI.setMessage("<video> not supported");
		
	}
	
	//video.play();
	WIFI.notBusy();
	WIFI.onContinue();
}

//load video
WIFI.loadVideo = function (){
	//Auto Play
	var supportsVideoElement = !!document.createElement('video').canPlayType;
				
	console.log("<Video> Supported="+supportsVideoElement);
	//alert("<Video> Supported="+supportsVideoElement); //safari cannot
	if (supportsVideoElement)
	{
		console.log("Creating <video>");
		var temp = document.createElement('video');
		var canPlay_MP4 = temp.canPlayType('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
		var canPlay_OGV = temp.canPlayType('video/ogg; codecs="theora,vorbis"');
		var canPlay_WEMB = temp.canPlayType('video/webm; codecs="vp8,vorbis"');
					
		console.log("canPlay_MP4="+canPlay_MP4 + ", canPlay_OGV=" + canPlay_OGV + ", canPlay_WEMB=" +canPlay_WEMB );
					
		var content = '<video id="' + WIFI.video_id +'" width="'+WIFI.video_width+'" height="'+ WIFI.video_height+'" controls autoplay>'+
					'<source src="'+WIFI.play_url+'" type="video/mp4">'+
					'Your browser does not support the video tag.'+
					'</video>';
					
					
		//Create Video
		var video = document.createElement('video');
		video.id = WIFI.video_id;
		WIFI.addSourceToVideo(video, WIFI.play_url, 'video/mp4');
		WIFI.toggleControlsVideo(video);
		WIFI.resizeVideo(video);		
					
		//Add listener
		if(video != null)//if possibility of no video loaded in DOM
		{
			video.onplay = function () {
				//do something
				alert("play");
				WIFI.setMessage("video is playing automatically. iframe="+WIFI.supportsiframe);
				if (video.paused) { video.play(); }
				else { video.play(); }
			};
		}
					
		//alert("<iframe> Supported="+supportsiframe);
		//console.log("<iframe> Supported="+WIFI.supportsiframe);
		if (!WIFI.supportsiframe)//should be !supportsiframe
		{
			console.log("using DIV");
			document.getElementById(WIFI.video_div).appendChild(video);
			video.play();
		}
		else 
		{
			console.log("Destroying Original player")
			$('#' + WIFI.video_id ).remove();
			console.log("Using IFrame");
			var iframe = document.createElement('iframe');		
			document.getElementById(WIFI.video_div).appendChild(iframe);
			iframe.contentWindow.document.open();
			iframe.contentWindow.document.write(content);
			iframe.contentWindow.document.close();
			WIFI.resizeIFrameToFitContent(iframe);
		}
					
		//video.play();		
					    
		}
		else {		
			WIFI.setMessage("<video> not supported");
		}
				
		WIFI.notBusy();
		WIFI.onContinue();
}

