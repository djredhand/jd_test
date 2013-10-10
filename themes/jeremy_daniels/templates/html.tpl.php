<?php

/**
 * @file
 * Default theme implementation to display the basic html structure of a single
 * Drupal page.
 *
 * Variables:
 * - $css: An array of CSS files for the current page.
 * - $language: (object) The language the site is being displayed in.
 *   $language->language contains its textual representation.
 *   $language->dir contains the language direction. It will either be 'ltr' or 'rtl'.
 * - $rdf_namespaces: All the RDF namespace prefixes used in the HTML document.
 * - $grddl_profile: A GRDDL profile allowing agents to extract the RDF data.
 * - $head_title: A modified version of the page title, for use in the TITLE
 *   tag.
 * - $head_title_array: (array) An associative array containing the string parts
 *   that were used to generate the $head_title variable, already prepared to be
 *   output as TITLE tag. The key/value pairs may contain one or more of the
 *   following, depending on conditions:
 *   - title: The title of the current page, if any.
 *   - name: The name of the site.
 *   - slogan: The slogan of the site, if any, and if there is no title.
 * - $head: Markup for the HEAD section (including meta tags, keyword tags, and
 *   so on).
 * - $styles: Style tags necessary to import all CSS files for the page.
 * - $scripts: Script tags necessary to load the JavaScript files and settings
 *   for the page.
 * - $page_top: Initial markup from any modules that have altered the
 *   page. This variable should always be output first, before all other dynamic
 *   content.
 * - $page: The rendered page content.
 * - $page_bottom: Final closing markup from any modules that have altered the
 *   page. This variable should always be output last, after all other dynamic
 *   content.
 * - $classes String of classes that can be used to style contextually through
 *   CSS.
 *
 * @see template_preprocess()
 * @see template_preprocess_html()
 * @see template_process()
 */ 
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN"
  "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language; ?>" version="XHTML+RDFa 1.0" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>>
<head profile="<?php print $grddl_profile; ?>">
<link rel="stylesheet" href="<?php print $GLOBALS['base_path'];?>themes/jeremy_daniels/css/shield.css" type="text/css" media="all" />
<script src="<?php print $GLOBALS['base_path'];?>themes/jeremy_daniels/js/browserdetect.js" type="text/javascript" language="javascript"></script>
<script type="text/javascript" src="<?php print $GLOBALS['base_path'];?>themes/jeremy_daniels/js/shield.js"></script>
<script type="text/javascript">
/* Select from list: Chrome, Firefox, Safari, MSIE */

</script>
<?php  if (isset($variables['user']->name) ){
	$username = $variables['user'] -> name;
	if($username == "Jeremy"){?>
		<style>
			#toolbar .toolbar-menu{display: none;}
		</style>
	<?php	
	}//end if
	}//end if issset 
  ?>
<meta name="viewport" content="width=device-width, initial-scale=1">
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>
  <?php print $styles; ?>
    
  <?php print $scripts; ?>
</head>
<body onorientationchange="updateOrientation();" class="<?php print $classes; ?>" <?php print $attributes;?>>
  <div id="skip-link">
    <a href="#main-content" class="element-invisible element-focusable"><?php print t('Skip to main content'); ?></a>
  </div>
  <?php print $page_top; ?>
  
  <?php print $page; ?>
  <?php print $page_bottom; ?>
  <div id="shieldbox"><div id="shield-active"></div></div><!-- class = shieldbox -->
  <?php  if (isset($variables['user']->name) ){
	$username = $variables['user'] -> name;
	if($username == "Jeremy"){?>
		<script>
			jQuery('#toolbar .toolbar-menu').css('display','none');
			jQuery('.tabs').css('display','none');
			jQuery('.toolbar-drawer').children('a').css('display','none');
			jQuery('div.contextual-links-wrapper').css('display','none');
		</script>
	<?php	
	}//end if
	}//end if issset 
  ?>
<script>

</script>
<div>
<?php if($variables['theme_hook_suggestions'][0] === "html__contact"){
	print_r('<script src="themes/jeremy_daniels/js/contact_page.js"></script>');
	print_r('<script src="' . base_path() . 'themes/jeremy_daniels/js/resized.js"></script>');
}; ?>
</div>
<script type="text/javascript">
 
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-33604036-1']);
  _gaq.push(['_trackPageview']);
 
  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
 
</script>
<?php
	print_r('<script src="themes/jeremy_daniels/js/jquery.timer.js"></script>');
?>
</body>
</html>
