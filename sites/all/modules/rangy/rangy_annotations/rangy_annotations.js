(function ($) {
/* 
 * Insert markup into the field when a Rangy entity is created
 */
Drupal.behaviors.rangyannotations = {
  attach: function (context, settings) {
    $(document).ready(function (){
      alert(Drupal.t('it works'));
    });
  }
};
})(jQuery);
