jQuery(document).ready(function(){
			var img = jQuery(".field-items img");
			var _imgRatio = (img.height()) / (img.width() );
			 
			function calcLayout(){
				var pageWidth = jQuery("#page-wrapper").width();
				var img = jQuery(".field-items img");
				var content = jQuery("#content");
				var contentHeight =  (pageWidth -  jQuery("#sidebar-first").width()) * _imgRatio
				var contentWidth = pageWidth - (jQuery("#sidebar-first").width() )
				var pageHeight = 754;
				
				jQuery("#sidebar-first").css({height:contentHeight, position: "absolute", zIndex:"99", float: "none" });
				jQuery(".field-name-field-about-image").css({margin: "0 0 0 180px"});
				jQuery(".field-name-field-about-body").css({margin: "0 0 0 180px"});
				

				img
					.attr('height',754)
					.attr('width', ( pageHeight / _imgRatio) );

				console.log(pageHeight)
				console.log(pageHeight / _imgRatio)	
			}//end calcLayout
			jQuery(window).resize(function(){
				calcLayout();
			});
			
			jQuery('#page-wrapper').trigger('resize');
			
			calcLayout();
});
