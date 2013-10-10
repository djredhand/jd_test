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


;

(function ($) {
  Drupal.Panels = {};

  Drupal.Panels.autoAttach = function() {
    if ($.browser.msie) {
      // If IE, attach a hover event so we can see our admin links.
      $("div.panel-pane").hover(
        function() {
          $('div.panel-hide', this).addClass("panel-hide-hover"); return true;
        },
        function() {
          $('div.panel-hide', this).removeClass("panel-hide-hover"); return true;
        }
      );
      $("div.admin-links").hover(
        function() {
          $(this).addClass("admin-links-hover"); return true;
        },
        function(){
          $(this).removeClass("admin-links-hover"); return true;
        }
      );
    }
  };

  $(Drupal.Panels.autoAttach);
})(jQuery);
;
(function ($) {

Drupal.toolbar = Drupal.toolbar || {};

/**
 * Attach toggling behavior and notify the overlay of the toolbar.
 */
Drupal.behaviors.toolbar = {
  attach: function(context) {

    // Set the initial state of the toolbar.
    $('#toolbar', context).once('toolbar', Drupal.toolbar.init);

    // Toggling toolbar drawer.
    $('#toolbar a.toggle', context).once('toolbar-toggle').click(function(e) {
      Drupal.toolbar.toggle();
      // Allow resize event handlers to recalculate sizes/positions.
      $(window).triggerHandler('resize');
      return false;
    });
  }
};

/**
 * Retrieve last saved cookie settings and set up the initial toolbar state.
 */
Drupal.toolbar.init = function() {
  // Retrieve the collapsed status from a stored cookie.
  var collapsed = $.cookie('Drupal.toolbar.collapsed');

  // Expand or collapse the toolbar based on the cookie value.
  if (collapsed == 1) {
    Drupal.toolbar.collapse();
  }
  else {
    Drupal.toolbar.expand();
  }
};

/**
 * Collapse the toolbar.
 */
Drupal.toolbar.collapse = function() {
  var toggle_text = Drupal.t('Show shortcuts');
  $('#toolbar div.toolbar-drawer').addClass('collapsed');
  $('#toolbar a.toggle')
    .removeClass('toggle-active')
    .attr('title',  toggle_text)
    .html(toggle_text);
  $('body').removeClass('toolbar-drawer').css('paddingTop', Drupal.toolbar.height());
  $.cookie(
    'Drupal.toolbar.collapsed',
    1,
    {
      path: Drupal.settings.basePath,
      // The cookie should "never" expire.
      expires: 36500
    }
  );
};

/**
 * Expand the toolbar.
 */
Drupal.toolbar.expand = function() {
  var toggle_text = Drupal.t('Hide shortcuts');
  $('#toolbar div.toolbar-drawer').removeClass('collapsed');
  $('#toolbar a.toggle')
    .addClass('toggle-active')
    .attr('title',  toggle_text)
    .html(toggle_text);
  $('body').addClass('toolbar-drawer').css('paddingTop', Drupal.toolbar.height());
  $.cookie(
    'Drupal.toolbar.collapsed',
    0,
    {
      path: Drupal.settings.basePath,
      // The cookie should "never" expire.
      expires: 36500
    }
  );
};

/**
 * Toggle the toolbar.
 */
Drupal.toolbar.toggle = function() {
  if ($('#toolbar div.toolbar-drawer').hasClass('collapsed')) {
    Drupal.toolbar.expand();
  }
  else {
    Drupal.toolbar.collapse();
  }
};

Drupal.toolbar.height = function() {
  var height = $('#toolbar').outerHeight();
  // In IE, Shadow filter adds some extra height, so we need to remove it from
  // the returned height.
  if ($('#toolbar').css('filter').match(/DXImageTransform\.Microsoft\.Shadow/)) {
    height -= $('#toolbar').get(0).filters.item("DXImageTransform.Microsoft.Shadow").strength;
  }
  return height;
};

})(jQuery);
;
