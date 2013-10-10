/*
* Javascript Document
*/

jQuery(document).ready(function($){
	 
	var james = {};
	james.init = function(){
		// the vars sent from Drupal to JS
		//console.log('the vars sent from Drupal to JS: ');
		//console.log(Drupal.settings.contactSheet);
		
		// just the password
		//console.log('the page pass');
		//console.log(Drupal.settings.contactSheet.password[0].value);
		
		var images 	= $('.contact-sheet-image');
		var jsPass 	= Drupal.settings.contactSheet.password[0].value;
		
		/* JS PASS FUNCTION
		* hide the contact sheets and create and input to accept and test
		* the javascript pass for the contact sheets
		*/
		$('.node-plupload').css('display','none');
		var passDiv = $(document.createElement('div') )
		var passMessage = $(document.createElement('div') )
		var passInput = $(document.createElement('input') );
		var passSubmit = $(document.createElement('div') );
		passInput.attr({
			id			: 'passInput',
			type		: 'text',
			value	: '' 
		});
		passSubmit.attr({
			id			: 'passSubmit',
			type		: 'submit',
			value	: 'Submit'
		})
		passDiv.attr('id','passDiv');
		passSubmit.html('SUBMIT');
		passMessage.html('<h2>Please enter the password in order to view the Contact Sheet.</h2>')
		
		
		$('#main').append(passDiv);
		passDiv.append(passMessage, passInput, passSubmit);
		
		// create listener/handler for Submit
		passSubmit.click(function(){
			if ( $('#passInput').val() ===  jsPass){
					unhideContactSheet();
			}else{
				alert('Sorry, that is the wrong password')
			}
		})
		//create a listener/handler for the "enter" keyboard stroke
		passInput.keyup(function(e){
			if (e.keyCode ==13){
				if ( $('#passInput').val() ===  jsPass){
						unhideContactSheet();
				}else{
					alert('Sorry, that is the wrong password')
				}
			}
		})
		
		//focus on the password field
		passInput.focus();

		/* 
		* end JS PASS FUNCTION
		*/
		
		function unhideContactSheet(){
			// unhide the Contact Sheet and format
			$('.node-plupload').css('display','block');
			$('#page-wrapper').css({
				maxHeight: '30000px'
			})
			// hide the password form
			$('#passDiv').remove();
			
			var submitBtn = $(document.createElement('div'));
			submitBtn.attr('id','submit-button');
			submitBtn.html('Submit Changes')
			$('body').append(submitBtn);
			
			var modal = function(){
				
				//console.log(jQuery('img.contact-sheet-image'))
				jQuery('img.contact-sheet-image').click(function(){
					var img_id = '<span id="img-id">' + jQuery(this).next().next().html() + '</span>';
					var modal = jQuery('<div id="modal"></div>')
					var frame = jQuery('<div id="modal-frame"><div id="frame-close">Click to Close - X</div> ')
					var clone = jQuery(this).clone();
					clone.removeClass('contact-sheet-image');
					clone.attr({width: '', height:''})
					jQuery('body').append(clone);
					var trueWidth = jQuery(this).prev().width();
					var trueHeight = jQuery(this).prev().height();
					var cloneWidth= 700;
					var cloneHeight = 400;
					var divHeight = jQuery('#page-wrapper').height();

					modal.css({height: divHeight})
					clone.addClass('clone');
					clone.removeAttr('width');
					clone.removeAttr('height');

					// test if the picture is taller than its width
					if (trueHeight > trueWidth){
						clone.css({
							width: cloneHeight ,
							position: 'fixed'
						})
						var centerModal =(jQuery(document).width() /2 ) - (cloneHeight /2);
						frame.css({width: cloneHeight + 'px'})
					}else{
						clone.css({
							width: cloneWidth + 'px',
							position: 'fixed'
						})
						var centerModal =(jQuery(document).width() /2 ) - (cloneWidth /2);
					}
					frame.css({
						left:centerModal + 'px'
					})


					frame
						.append(img_id)
						.append(clone);
					jQuery(modal).append(frame);
					jQuery('body').append(modal)

					modal.click(function(){
						jQuery(this).remove();
					})


				})
			}// end modal

			// add a listener/handler for the submit button
			// will need to collect all note entries, create object of them (incliding the id's -> which are the db id)
			// and pass the object to the ajax call that updates the DB
			submitBtn.click(function(){
				(function(){
					var d = jQuery(document.createElement('div'));
					d.append('<image class="loading-gif" src="../themes/jeremy_daniels/images/loading.gif" />');
					jQuery('body').append(d);
				}() );
				
				var pageNotes = jQuery('.notes');
				for (i=0;i< Drupal.settings.contactSheet.image_urls.length; i++ ){
					
					var n = jQuery(pageNotes[i]).attr('value');
					Drupal.settings.contactSheet.image_urls[i].notes = n;
					
				}
				
				$.post(Drupal.settings.contactSheet.base_path + 'themes/jeremy_daniels/cotact-sheet-ajax.php', 
					{ ajax: Drupal.settings.contactSheet},
					function(data) {
						var newValues = jQuery('.notes');
				}).complete(function(){
					jQuery('.loading-gif').remove();
					alert('Your notes have been saved!')
					} );
				
			});
			var sideH = jQuery(document).height();
			jQuery('#content').css('width', '820px')
			jQuery('#sidebar-first').css('height', sideH + 'px');

			modal();
		}//end unHide contact sheet
	
		function sizeUp(){
			var sidebar = jQuery('#sidebar-first');
			var pageWrap =  jQuery('#page-wrapper');
			var contentHeight = jQuery('#content').height();
			var contactSheetWidth = (pageWrap.width() - sidebar.width() );
			var contactSheetWrapper = jQuery('#contact-sheet-wrapper');
			var contentWrap = jQuery('#content')
			sidebar.css({
				height: contentHeight
			})
			
			contentWrap.css({
				width : contactSheetWidth
			})
			
			contactSheetWrapper.css({
				width: contactSheetWidth
			})
			
		}//end sizeUp()
	
		
		jQuery(window).resize(function(){
			sizeUp();
		});
		
		// UI functions
		james.ui = function(){
			jQuery('.notes').each(function(){
				var note = jQuery(this);

				note.focus(function(){
					note.css({
						position: 'absolute',
						zIndex: '99',
						margin: '0 0 0 -101px',
						height: '240px'
					})
				});//end .focus
				note.blur(function(){
					note.css({
						position: 'relative',
						margin: '0 0 0 0',
						height: '42px',
						width: '202px'
					})
				})//end .blur
			})
		}//end james.ui
		
		//modal function
		
	}//end james.init();
	
	james.init();
	james.ui();
})//end doc.ready
