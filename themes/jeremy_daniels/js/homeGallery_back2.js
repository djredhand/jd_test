		//start the Flux Slider
		if(!flux.browser.supportsTransitions)
		window.f = new flux.slider("#slider", {
			pagination: false,
			transitions: ["swipe"],
			delay: 4000
		});	
jQuery(document).ready(function(){
	/*
	* Flexible layout calculation
	*/
		scrollCalcLayout = function(xy){
			var width = jQuery(window).width() - jQuery("#sidebar-first").width();
			var imgRatio = (jQuery('.image1').height() ) / (jQuery('.image1').width() )
			var scrollTotalSize = width * jQuery("#scroll_thelist").children().length;
			var frameSize = jQuery("#scroll_scroller li");
			var frameHeight = jQuery(window).height();
			
			console.log("scrollCalc fired")
			console.log('width is : ' + width)
			console.log('frame height is: ' + frameHeight);
			
			jQuery(".images").css({
				width: width + "px",
				backgroundSize: width + 'px ' + frameHeight + 'px'
			})
				
			jQuery(".image1").css({
				width: width + "px",
				backgroundSize: width + 'px ' + frameHeight + 'px'
			})
			
			jQuery(".image2").css({
				width: width + "px",
				backgroundSize: width + 'px ' + frameHeight + 'px'
				})
			
			jQuery(".images").height(frameHeight + "px")
			jQuery(".image1").height(frameHeight + "px")
			jQuery(".image2").height(frameHeight + "px")
			
			jQuery("#sidebar-first").height(frameHeight);
			
			// scroll to the active item on rotation (after resizing)
			
			jQuery('#page-wrapper').css({
				width:'100%',
				height: frameHeight + 'px'
			})
		};//	end scrollCalcLayout


		jQuery(window).resize(function() {
				scrollCalcLayout();
			});
		scrollCalcLayout();
});//end doc.ready
