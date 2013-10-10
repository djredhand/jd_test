jQuery(document).ready(function($){

	var image_wrapper = $('.contact-sheet-image-wrapper');
	image_wrapper.each(function(){
		var src_name = $(this).children('img').attr('src');
		var filename = src_name.split('/').pop().split('-original-').pop();
		//console.log(filename);
		var t = jQuery(this).children()[3];
		console.log(t)
		jQuery(t).after('<p>' + filename + '</p>' ) //.next(filename);
		//temp_name += 
	})

})
