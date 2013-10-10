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
			console.log("scrollCalc fired")
			var width = jQuery("#page-wrapper").width() - jQuery("#sidebar-first").width();
			var height = jQuery("#page-wrapper").height();
			var imgRatio = (jQuery('.image1').height() ) / (jQuery('.image1').width() )
			console.log('imgRatio is : ' + imgRatio)
			jQuery('.image1').css('width',width)
			console.log(jQuery('.image1'))
				if (xy === "portrait" ){
					//var width  = 500;
					var width = jQuery("#page-wrapper").width() - jQuery("#sidebar-first").width();
					//console.log("xy is portrait");
				}else if (xy === "landscape"){
					//var width = 690;
					var width = jQuery("#page-wrapper").width() - jQuery("#sidebar-first").width();
					//console.log("xy is landscape");
				}else if(xy === undefined){
					//jQuery("#page-wrapper").css('width','80%');
					//console.log("xy is undefined");
				}
				
				var wrapSize = width;
				console.log('width is : ' + width)
				var scrollTotalSize = wrapSize * jQuery("#scroll_thelist").children().length;
				var frameSize = jQuery("#scroll_scroller li");
				//var frameHeight = .5 * width * 1.4224;//80% of the ratio of the gallery images
				//var frameHeight = .5 * width * 1.4224;//80% of the ratio of the gallery images
				
				//console.log('frame height is: ' + frameHeight)
				jQuery(".images").css({
					width: "100%",
					height:height
					//backgroundSize: width + 'px ' + frameHeight + 'px'
				})
					
				jQuery(".image1").css({
					width: "100%",
					height: height
					//backgroundSize: width + 'px ' + frameHeight + 'px'
				})
				
				jQuery(".image2").css({
					width: "100%",
					height: height
					//backgroundSize: width + 'px ' + frameHeight + 'px'
					})
				
				jQuery('.fluxslider').css({
					height: '100%',
					width: '100%'
					})
				
				//jQuery(".images").height(frameHeight + "px")
				//jQuery(".image1").height(frameHeight + "px")
				//jQuery(".image2").height(frameHeight + "px")
				
				jQuery("#sidebar-first").height(height);
				
				//frameSize.width("100%");
				//frameSize.height("100%");
				
				// scroll to the active item on rotation (after resizing)
				
		};//	end scrollCalcLayout


		jQuery(window).resize(function() {
				scrollCalcLayout();
			});
		scrollCalcLayout();
		var f = document.getElementsByClassName('image1')[0];
		var width = jQuery("#page-wrapper").width() - jQuery("#sidebar-first").width();
		jQuery('#content').css('width',width)
		//f.offsetWidth = width;
});//end doc.ready
