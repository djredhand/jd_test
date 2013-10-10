/*-------------------Contact Page-------------------*/
jQuery(document).ready(function(){
	var contactImgSrc = jQuery('.views-field-field-contact-image .field-content img').attr('src')
	var contactBG = jQuery(document.createElement('div'));
	var contactBGImg = jQuery(document.createElement('img'));
	var sized = function (){
		var totalWidth = jQuery('#page-wrapper').width();
		var totalHeight = jQuery(document).height();
		var sideBarWidth = jQuery('#sidebar-first').width();
		var body = jQuery('#block-views-contact-page-block').width();
		var calcWidth = totalWidth - sideBarWidth;
		var contactText = jQuery('.view-id-contact_page');
		contactBGImg.attr('height',totalHeight);
		contactText.css('width', calcWidth);
	}
	
	var title_the_contact_page = function(){
		var title = jQuery('.view-content .views-field-title span').html()
		jQuery('.view-content .views-field-title').remove()
		jQuery('#contact-site-form').prepend('<h2>' + title + '</h2>');

	}

	//append the contact paragraph content to the form
	var contactP = jQuery('.view-id-contact_page p');
	contactP.remove();
	jQuery('form').append(contactP);

	contactBG.attr('id','contactBG')
	contactBGImg.attr('src', contactImgSrc)

	jQuery('.views-field-field-contact-image .field-content img').css('display','none')

	//jQuery('#block-views-contact-page-block').append(contactBG)
	console.log(contactBG);
	jQuery('#block-views-contact-page-block').css({
		background: 'url('+ contactImgSrc + ')'
	})
	contactBG.append(contactBGImg);
	title_the_contact_page();
	
	
	

	sized();

	jQuery(window).resize(function(){
		sized();
	})

})
