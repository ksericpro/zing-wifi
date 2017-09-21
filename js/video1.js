requirejs.config({
    paths: {
		jquery: ['libs/jquery-1.11.1.min', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min'],
        bootstrap: ['libs/bootstrap.min', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min'],
		videofns: 'libs/video_fns'
    },
    shim: {
        'bootstrap':{deps: ['jquery']}
    }
});

requirejs(['jquery', 'bootstrap', 'videofns'], function($){

    // DOM ready
    $(function(){

        // Twitter Bootstrap 3 carousel plugin
        $("#element").carousel();
		
		console.log("DOM ready");
		
		//insert Message after body
		WIFI.setupMessageAndVideoDiv();
		
		// Handler for .ready() called.
		//$("#msg").html("Initialising.....");
		WIFI.setMessage("initialising...");
		
		//Load CSS
		WIFI.loadjscssFile("css/bootstrap.min.css", "css");
		WIFI.loadjscssFile("css/custom.min.css", "css");
		
		//Create Wait Dialog
		WIFI.createWaitDiv();
		
		//create Continue Dialog
		WIFI.createContinueDiv();
		
		//Check Media Exist if url_1 not exists, play url_2
		$.get(WIFI.url_1)
			.done(function() { 		
			WIFI.play_url = WIFI.url_1;
			WIFI.setMessage("playing..."+WIFI.play_url);
		}).fail(function() { 
			WIFI.play_url = WIFI.url_2;
			WIFI.setMessage("playing..."+WIFI.play_url);
		})
		
		//Check iframe support
		WIFI.supportsiframe = WIFI.elemSupportsEvent('iframe','onload');
		console.log("<iframe> features Supported="+WIFI.supportsiframe);
		
		//create video
		//WIFI.createVideo();
		
		//Setup Touch
		//WIFI.setupTouchEvent();
		/*
		//Check iframe support
		WIFI.supportsiframe = WIFI.elemSupportsEvent('iframe','onload');
		console.log("<iframe> features Supported="+WIFI.supportsiframe);
		
		//Check Media Exist if url_1 not exists, play url_2
		$.get(WIFI.url_1)
			.done(function() { 		
			WIFI.play_url = WIFI.url_1;
			WIFI.setMessage("playing..."+WIFI.play_url);
		}).fail(function() { 
			WIFI.play_url = WIFI.url_2;
			WIFI.setMessage("playing..."+WIFI.play_url);
		})
		
		//continue
		WIFI.onContinue();
		*/
		WIFI.busy();

		//load Video after freeze_time seconds
		setTimeout(WIFI.createVideo, WIFI.freeze_time);
		
		
		
    });
	
	
});

