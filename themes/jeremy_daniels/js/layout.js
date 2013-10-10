/*-------------------LAYOUT FUCNTIONS-------------------*/
  if ( navigator.userAgent.match(/iPad/i)) {
  	jQuery(document).ready(function($){
  		$('#scrollbar2').css({
  			bottom: -50
  		});
  		var timer = $.timer(function() {
                //alert('This message was sent by a timer.');
/*
                var c = $('.image-caption').clone();
                $('.image-caption').css('display','none')
                $('.caption-clone').remove();
                c.appendTo($('#sidebar-first')).attr('class','caption-clone')
                	.css({
                		display: 'block',
                		background: '#000'
                	})
*/
                	//alert( jQuery('.image-caption').length)
                	jQuery('.image-caption').each(function(){
                		jQuery(this).css({
                			marginTop: '-70px'
                		})
                	})
        });

        timer.set({ time : 150, autostart : true });
  		

       // / timer.set({ time : 5000, autostart : true });

  		
  	})
  }
/*-------------------Side Bar-------------------*/


/*-------------------NAVIGATION SNIFFERS-------------------*/

//Detect iOS browser navigators
  if ( navigator.userAgent.match(/iPad/i)) {
	updateOrientation();
  //alert(window.orientation);
	function size(orientation) {
		var viewport = document.querySelector("meta[name=viewport]");
		var screenX = jQuery(document).width(),
			  screenY = jQuery(document).height();
		if(orientation === 90 || orientation === -90){
			jQuery('#page-wrapper').animate({
				width	: "1024px"
			},500)
			viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=1');
			if (typeof scrollCalcLayout !== 'undefined'){
				scrollCalcLayout("landscape");
			}
		};
		if(orientation === 0 || orientation === 180){
			jQuery('#page-wrapper').animate({
				width	: "1024px"//width:768
			},500)
			viewport.setAttribute('content', 'width=device-width, initial-scale=1,  maximum-scale=1, user-scalable=1');
			if (typeof scrollCalcLayout !== 'undefined'){
				scrollCalcLayout("landscape");//portrait
			}
		}
		//alert(viewport.content);
		//alert("X: " + screenX + " Y: " + screenY);

		if (screenX == 320 && screenY == 396) {
			$('div#wrap').css('background-color','#f00');
		}

		else if (screenY == 320 && screenX == 396) {
			$('div#wrap').css('background-color','#0f0');
		}
	}

  function updateOrientation(){
	size(window.orientation);
  }//end updateOrientation\
  
   var viewportmeta = document.querySelector('meta[name="viewport"]');
	if (viewportmeta) {
		document.body.addEventListener('gesturestart', function () {
			viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
		}, false);
		size(window.orientation);
	};
}else if(navigator.userAgent.match(/iPhone/i)){
	var viewport = document.querySelector('meta[name="viewport"]');
	viewport.setAttribute('content', 'width=device-width, initial-scale=1,  maximum-scale=1, user-scalable=no');
}//end If detect


