


jQuery(document).ready(function(jQuery){
jQuery('#sidebar-first').css({
	position: 'relative',
	float: 'left'
})
function init(){
		//jQuery('#scroll_indicator li').className = "active";
		myScroll = new iScroll('scroll_wrapper', {
			snap: true,
			momentum: false,
			hScrollbar: false,
			onScrollEnd: function () {
				document.querySelector('#scroll_indicator > li.active').className = '';
				document.querySelector('#scroll_indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
			}
		 });
	
	// Event listeners for the Gallery
	jQuery('#scroll_indicator li').click(function(){
		var li = jQuery(this);
		myScroll.goToPage(li.prevAll().length, li);
		console.log('thumb clicked')
		return false;
	});
	jQuery('#scroll_next').click(function(){
		var activeItem = jQuery('ul#scroll_indicator li.active').prevAll().length;
		myScroll.scrollToPage( activeItem + 1 , 0);
		//myScroll.scrollToPage('next', 0);
		return false;
	});
	jQuery('#scroll_prev').click(function(){
		var activeItem = jQuery('ul#scroll_indicator li.active').prevAll().length;
		myScroll.scrollToPage( activeItem - 1 , 0);
		//myScroll.scrollToPage('prev', 0);
		return false;
	})
	
	/*
	* Let create the goToPage Function2
	*/
	
	iScroll.prototype.goToPage = function(thumbClicked, li){
		// get the size of the frame and multiply it by the index of the frame
	//hide the scrol by grabbing the appropriate image, create a div and show it,. 
	//have it shown until the scrolling is dione
	
		var curtain = jQuery('ul#scroll_thelist').children()[thumbClicked];
		curtain = jQuery(curtain).children('img');
		var cWidth = curtain.width();
		var cHeight = curtain.height();
		var source = curtain.attr('src');
		var clone = jQuery(new Image);
		clone.attr('src',source);
		clone.addClass('clone');
		jQuery(clone).css({
			height	: cHeight,
			width		: cWidth
		})
		jQuery('#scroll_wrapper').prepend(clone);
		
	
		var frame = jQuery('ul#scroll_thelist').children()[thumbClicked];
		var frameWidth = jQuery(frame).width() + 20;
		jQuery('ul#scroll_thelist').css({opacity: 0 },0);
		myScroll.currentPage = thumbClicked;
		myScroll.x = frameWidth * thumbClicked;
		myScroll.scrollToPage( thumbClicked, 0);
		jQuery('ul#scroll_thelist').animate({
				display: 'block'
			},500, function(){
			jQuery('.clone').remove();
				jQuery('ul#scroll_thelist').css('opacity',1);
				//webkitTransform: 'translate3d(-' + frameWidth * thumbClicked + 'px, 0px, 0px) scale(1)';
				scrollCalcLayout();
			})
		
		jQuery('ul#scroll_indicator li.active').attr('class', '');
		jQuery(li).toggleClass('active');
				
	}// end prototype
	
}//end init

/*
* Flexible layout calculation for iScroll
*/
scrollCalcLayout = function(xy){
console.log('scrollCalc custom_scroll')
		if (xy === "portrait" ){
			//var width  = 500;
			var width = jQuery('#page-wrapper').width() - jQuery('#sidebar-first').width();
			console.log('xy is portrait');
		}else if (xy === "landscape"){
			//var width = 690;
			var width = jQuery('#page-wrapper').width() - jQuery('#sidebar-first').width();
			console.log('xy is landscape');
		}else if(xy === undefined){
			var width = jQuery('#page-wrapper').width() - jQuery('#sidebar-first').width();
			console.log('xy is undefined');
		}
		
		var wrapSize = width;
		var scrollTotalSize = wrapSize * jQuery('#scroll_thelist').children().length;
		var frameSize = jQuery('#scroll_scroller li');
		var frameHeight = width / (4/3);//.5 * width //* 1.4224;//80% of the ratio of the gallery images
		//var next_prev_height = (jQuery('#page-wrapper').height() ) - (jQuery('#scroll_nav').height() );
		
		
		
		jQuery('#sidebar-first').height(frameHeight + 120);
		jQuery('#scroll_wrapper').width((wrapSize -1) + 'px');
		//jQuery('#scroll_wrapper').height(height + 'px');
		jQuery('#scroll_scroller').width(scrollTotalSize +'px');
		frameSize.width(wrapSize + 'px');
		frameSize.height(frameHeight + 'px');
		
		// scroll to the active item on rotation (after resizing)
		var li = jQuery('#scroll_indicator li.active');
		var thumbClicked = li.prevAll().length;
		jQuery('#scroll_scroller').css({
			webkitTransform: 'translate3d(-' + wrapSize * thumbClicked + 'px, 0px, 0px) scale(1)'
		});
		
	//jQuery('#scroll_prev').height(next_prev_height);
}//	end scrollCalcLayout

if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
	
	updateOrientation();
	init();
	
}else{
	scrollCalcLayout(undefined);
	init();
}

//listener for the gallery nav items to execute the gallery load
		jQuery('.gal_li').each(function(i){
			if (i ===0){
				jQuery(this).addClass('active_gallery');
			}
			jQuery(this).click(function(){
				//var page_width = (jQuery('#page-wrapper').width() - jQuery('#sidebar-first').width() ) * 0.25 ;
				//add scrollbar movement
				jQuery(".viewport .overview").css({
					left: '0px'
				});
				jQuery('.track .thumb').css({
					left: '0px'
				});
				
				jQuery(this).trigger('resize');
					//add class to active gallery
					jQuery('.gal_li').each(function(){
						jQuery(this).removeClass('active_gallery');
					});
					
					jQuery(this).toggleClass('active_gallery');
					if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
						myScroll.destroy();
						myScroll = null;
						galleryLoad.load(this.index);
						updateOrientation();
						init();
					}else{
						myScroll.destroy();
						myScroll = null;
						galleryLoad.load(this.index);
						//scrollCalcLayout(undefined);
						init();
					}
					
			});
		});
	
/* 
// portfolio page link function
*/
	function portfolio_gallery_link(){
			function page_link(gal_li){
				//trigger a click on the gallery link
				function trigger_gal(gal_li){
					jQuery(gal_li).trigger('click')
				}
				trigger_gal(gal_li);
			}//end page_link function
			
			function get_url_vars() {
				var vars = {};
				var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
					vars[key] = value;
				});
				return vars;
			}//end ger_url_vars

			//find the right gallery link to trigger
			jQuery('.gal_li').each(function(){
				var url_gallery_name = get_url_vars()["link-to"] ;
					var p = jQuery(this).children().text();
					
					if (url_gallery_name){
						if(p == url_gallery_name.replace(/-/g," ")){
							page_link(jQuery(this) );
						}
					}
			})//end .each
			
	}// end portfolio_gallery_link
	portfolio_gallery_link();
	
	
	jQuery(window).resize(function() {
		scrollCalcLayout();
		var width = jQuery(window).width()
		jQuery('.track').width(width).css({
			background: '#d1d1d1'
		})
	});
	scrollCalcLayout();
})//end doc.ready

/*-----------------GALLERY LOAD FUNCITONS--------------------*/
// order the gallery objects and fire factory methods for page
// 'json' is the var from the gallery view template
// these functions are executed before Doc.Load because
// Doc.Load handles all of the sizing and layout functions

var galleryLoad = {}

// need to know what the biggest gallery is so we can set the min width of the 
//scroll area of the scrollbar for the thumbnails
galleryLoad.scroll_size = function(){
	var arrLengthCompare = []
	function count_obj(i){
		var c = 0;
		var arr = [];
		for (obj in json[i]){
			++c;
			arr.push(c);
		}
		return arr.length;
	}
	for (i in json){
		arrLengthCompare.push(count_obj(i) );
	}
	console.log(arrLengthCompare);
	console.log(Math.max.apply( Math, arrLengthCompare) );
	var biggestGallery = Math.max.apply( Math, arrLengthCompare)
	var thumbScrollWidth = 65 * biggestGallery;
	jQuery('#scrollbar2 .overview').css('width', thumbScrollWidth + 'px')
}

galleryLoad.order = function(){
	for(i=0;i<json.length; i++){
		if(isNaN(json[i].gallery_order.value)){
			json[i].order = json.length +1;
		}else{
			json[i].order = json[i].gallery_order.value;
		}
	}
}//end .order

//sort the galleries in order from the gallery order field
// in the CMS

galleryLoad.sort_by = function(){
	var sorted_gallery =[];
	var sort_order=[];
	for (i=0;i<json.length;i++){
		sort_order.push(json[i].gallery_order.value);
		}//end for
	sort_order=sort_order.sort();
	
	for (i=0;i<json.length;i++){
		for (k=0;k<json.length;k++){
			if(json[k].gallery_order.value === sort_order[i]){
			//console.log(json[i].gallery_order.value);
			//console.log(sort_order[i]);
				sorted_gallery[i] =  json[k];
			};//end if
		}//end for
	}//end for
	json=null;
	json = sorted_gallery
	return json;
}//.end sort_by

//create the navigation items for the gallery loader
galleryLoad.createNav = function(){
	var gal_ul = jQuery(document.createElement('ul'));
	gal_ul.attr('id','gal-ul');
	jQuery('#scrollbar2').append(gal_ul);
	for (i=0;i<json.length;i++){
		var gal_li = document.createElement('li');
		var gal_title = json[i].title.title;
		gal_li.index= i;
		jQuery(gal_li).attr('class','gal_li');
		jQuery(gal_li).append('<span>' + gal_title +'<span>');
		gal_ul.append(gal_li);
	}//end for
}

//create the loader for the images into the scroller
galleryLoad.load = function(navClick){
	//empty out the existing images and thumbs
	var gal_length = Object.keys(json[navClick]).length;
	var scrollList = jQuery('#scroll_thelist');
	var scrollThumbs = jQuery('#scroll_indicator');
	scrollList.empty();
	scrollThumbs.empty();
	
	
	for (i=0;i<gal_length;i++){
		
		if(json[navClick][i] !== undefined){
			var uri = json[navClick][i].uri;
			var filename = json[navClick][i].filename;
			var caption = json[navClick][i].alt;
			var gallery_image = jQuery(document.createElement('li') );
			var imgSrc = uri + 'sites/default/files/' + filename;
			var gallery_thumb = jQuery(document.createElement('li') );
			
			gallery_image.append('<img class ="gallery-image" id="gallery-image_' + i + '" src='+ imgSrc +'>');
			gallery_image.append('<div class ="image-caption">'  + caption +'</div>');
			
			gallery_thumb.css('background-image', 'url(' + imgSrc + ')');
			scrollThumbs.append(gallery_thumb);
			
			//set active thumb
			if (i===0){
				gallery_thumb.attr('class','active');
			}
			scrollList.append(gallery_image);
			
		}//end if
	}//end for
	
	jQuery('#scroll_indicator li').click(function(){
		var li = jQuery(this);
		//myScroll.goToPage(li.prevAll().length, li);	
	});
	
	if (typeof(scrollCalcLayout) === "function"){
			scrollCalcLayout(undefined);
		}		
		
	

}//end.load
	
// Execute Gallery Load Functions
var myScroll = {};//create the global myScroll object
//sort the galleries for the Porfolio page
galleryLoad.scroll_size();
galleryLoad.sort_by();
galleryLoad.createNav();
galleryLoad.load(0);


console.log(json);




