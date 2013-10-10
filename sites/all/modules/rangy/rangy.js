(function ($) {

/**
 * Creates a Javascript Rangy object and returns datas to PHP through Ajax.
 * @todo Remove button when clicking anywhere on the page
 * @todo Get rid of eval
 */

Drupal.behaviors.rangy = {
  attach: function (context, settings) {
    
    //Initialize module settings variables
    var prefix = '';
    if(!settings.rangy.cleanUrls){
      prefix = '?q=';
    }
    var basePath = settings.basePath;
    var rangyImage = settings.rangy.image;

    // Display button when selecting a range
    $(".rangy-enabled").once('rangy').mouseup(function() {
      if($('.rangy-button').size() == 0) {

        rangy.init();
        var sel = rangy.getSelection();
        range = sel.getRangeAt(0);

        //Get the parent with class 'rangy-enabled'
        container = range.commonAncestorContainer;
        while (($(container).attr('class') === undefined) || ($(container).attr('class').indexOf('rangy') == -1)) {
          container = $(container).parent();
        }

        if(!range.collapsed) {
          
          // Get the index of the field in the page
          index = $(".rangy-enabled").index(this);
          index++;

          //Create the button and display it through CSS
          var buttonCSS = {
            'margin' : '-30px 0 0 -20px',
            'position': 'absolute',
            'background' : 'url("' + basePath + rangyImage + '")',
            'width':'32px',
            'height':'32px',
            'cursor':'pointer'
          };
          var button = $('<span class="rangy-button"></span>').css(buttonCSS);
          var newRange = range.cloneRange();
          newRange.collapse(false);
          newRange.insertNode(button[0]);
          
        }
      }

    });

    // Sends Ajax request when clicking a button
    $(document).delegate('.rangy-button', 'click', function() {
      $('.rangy-button').remove();
      var text = range.toString();
      var selection = rangy.serializeRange(range, true, container[0]);
      var html = range.toHtml();
      var fieldHtml = container.html();

      var fiid = eval('settings.rangy.fiid'+index);
      var et = eval('settings.rangy.et'+index);
      var eid = eval('settings.rangy.eid'+index);
      var rtid = eval('settings.rangy.rtid'+index);
      var fname = eval('settings.rangy.fname'+index);

      var datas = {
        'text': text,
        'selection': selection,
        'html': html,
        'field_html': fieldHtml,
        'fiid' : fiid,
        'et' : et,
        'eid' : eid,
        'rtid' : rtid,
        'fname' : fname
      };

      $.ajax({
        async: false,
        type: 'POST',
        url: basePath + prefix +'rangy_request',
        dataType: 'script',
        data: datas,

        error: function(xhr){
          alert(Drupal.t('An HTTP error occured ('+ xhr.status +').'));
        }
      });
      
    });
    
    
  }
};

})(jQuery);
