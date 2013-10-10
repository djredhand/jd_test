jQuery(document).ready(function($){
	var main_container = jQuery('#content');
	var gal_container = jQuery('#homepage-slider');
	
	main_container.css({
		position:'absolute'
	})
	/*
	for(i=0;i<slideObj.length;i++){
		var image = '<img width="844px" class="nivo-slide" src="' + slideObj[i].image + '"data-thumb="'+ slideObj[i].image +'" data-transition="fade" />';
		gal_container.append(image);
	}
	*/
	
	 $('#homepage-slider').nivoSlider({
		effect: 'fade',
        animSpeed: 1000,
        pauseTime: 3000,
        startSlide: 0,
        directionNav: false,
        controlNav: false,
        controlNavThumbs: false,
        pauseOnHover: false,
        manualAdvance: false,
        prevText: 'Prev',
        nextText: 'Next',
        randomStart: false,
        beforeChange: function(){},
        afterChange: function(){},
        slideshowEnd: function(){},
        lastSlide: function(){},
        afterLoad: function(){
			console.log('dakjdsakjdsakjdsa');
		}
	 });
	
});
