<?php
/**
 * @file views-view.tpl.php
 * Main view template
 *
 * Variables available:
 * - $classes_array: An array of classes determined in
 *   template_preprocess_views_view(). Default classes are:
 *     .view
 *     .view-[css_name]
 *     .view-id-[view_name]
 *     .view-display-id-[display_name]
 *     .view-dom-id-[dom_id]
 * - $classes: A string version of $classes_array for use in the class attribute
 * - $css_name: A css-safe version of the view name.
 * - $css_class: The user-specified classes names, if any
 * - $header: The view header
 * - $footer: The view footer
 * - $rows: The results of the view query, if any
 * - $empty: The empty text to display if the view is empty
 * - $pager: The pager next/prev links to display, if any
 * - $exposed: Exposed widget form/info to display
 * - $feed_icon: Feed icon to display, if any
 * - $more: A link to view more, if any
 *
 * @ingroup views_templates
 */

 $js_galleries = array();
 $js_gallery = array();
 $js_gallery_images = array();
 $gal_title = array();
 $gal_order = array();
//drupal_set_message('<pre>'. print_r( $galleries, TRUE) .'</pre>');
 for ($i=0;$i <count($galleries); $i ++){
	array_push($js_galleries, $galleries[$i]->_field_data);
 }
 
 for ($i=0;$i <count($js_galleries); $i ++){
	$gallery = $js_galleries[$i];
	$js_galleries[$i]['images'] = $gallery['nid']['entity']->field_image;
	array_push($js_gallery,$gallery['nid']['entity']->field_image);
	$gal_titile[$i]['title'] = $gallery['nid']['entity']->title;
	if (isset($gallery['nid']['entity']->field_gallery_order['und'][0]) ){
	$gal_order[$i] = $gallery['nid']['entity']->field_gallery_order['und'][0];
		//print_r($gal_order[$i]);
	}else{
		$gal_order[$i] = "undefined";
		//print_r($gal_order[$i]);
	}
 }
 for ($i=0;$i <count($js_gallery); $i ++){
	$und = $js_gallery[$i]['und'];
	array_push($js_gallery_images,$und);
}
for ($i=0;$i <count($js_gallery_images); $i ++){
	$ct = count($js_gallery_images[$i]);
	$js_gallery_images[$i]['title'] = $gal_titile[$i];
	$js_gallery_images[$i]['gallery_order'] = $gal_order[$i];
	
	for ($k=0;$k <$ct; $k ++){
		$uri = $js_gallery_images[$i][$k]['uri'];
		$js_gallery_images[$i][$k]['uri'] = base_path($uri);
		$fid = $js_gallery_images[$i][$k]['fid'];
		
	}
	
}
$json_gallery = json_encode($js_gallery_images);
$base = base_path();
echo('<script>var json = ' . $json_gallery .';</script>');
echo('<link href=" '. $base . 'themes/jeremy_daniels/css/scroll-style.css" rel="stylesheet" media="screen">');
echo('<link href=" '. $base . 'themes/jeremy_daniels/css/tinyscrollbar_styles.css" rel="stylesheet" media="screen">');
// $path = drupal_realpath($uri);
// print_r(count($js_galleries[0]['image_path']) );
// print human friendly drupal objects and arrays

?>
<div id="scroll_wrapper">
		<div id="scroll_scroller">
			<ul id="scroll_thelist">
				<li><strong>1.</strong></li>
				<li><strong>2.</strong></li>
				<li><strong>3.</strong></li>
				<li><strong>4.</strong></li>
				<li><strong>5.</strong></li>
				<li><strong>6.</strong></li>
				<li><strong>7.</strong></li>
			</ul>
		</div><!--end #scroll_scroller-->
		<div id="scroll_nav_wrap">
			<div id="scroll_prev"><img class="scroll_ui" id="arr_left" src="themes/jeremy_daniels/images/blank.png"/></div>
			<div id="scroll_next"><img class="scroll_ui" id="arr_right" src="themes/jeremy_daniels/images/blank.png"/></div>
		</div><!--end #scroll_nav_wrap-->
	</div><!--end #scroll_wrapper-->
	
	<div id="scrollbar2">
	
		<div class="viewport">
			<div class="overview" style="left: 0px; ">
				<div id="scroll_nav2">
					<ul id="scroll_indicator">
						<li class="active">1</li>
						<li>2fgdfgtdgv</li>
						<li>3</li>
						<li>4</li>
						<li>5</li>
						<li>6</li>
						<li>7</li>
					</ul>
				</div><!--end #scroll_nav-->
			</div><!--end #overview-->
		</div><!--end #viewport-->
		
		<div class="scrollbar" style="width: 236px; ">
			<div class="track" style="width: 236px; ">
				<div class="thumb" style="width: 39.33333333333333px; left: 0px; ">
					<div class="end"></div>
				</div><!--end #thumb-->
			</div><!--end #track-->
		</div><!--end #scrollbar-->
		
	</div><!--end #scrollbar2-->
	<br style="clear:both;"/>
<?php 
echo('<script src="' .  $base .'themes/jeremy_daniels/js/iscroll.js"></script>');
echo('<script src="'.  $base .'themes/jeremy_daniels/js/custom_scroll.js"></script>');
echo('<script src="'.  $base .'themes/jeremy_daniels/js/jquery.tinyscrollbar.min.js"></script>');
echo('<script src="'.  $base .'themes/jeremy_daniels/js/scroll_ui.js"></script>');
/*
<div class="<?php print $classes;?>">
  <?php print render($title_prefix); ?>
  <?php if ($title): ?>
    <?php print $title; ?>
  <?php endif; ?>
  <?php print render($title_suffix); ?>
  <?php if ($header): ?>
    <div class="view-header">
      <?php print $header; ?>
    </div>
  <?php endif; ?>

  <?php if ($exposed): ?>
    <div class="view-filters">
      <?php print $exposed; ?>
    </div>
  <?php endif; ?>

  <?php if ($attachment_before): ?>
    <div class="attachment attachment-before">
      <?php print $attachment_before; ?>
    </div>
  <?php endif; ?>

  <?php if ($rows): ?>
    <div class="view-content">
      <?php print $rows; ?>
    </div>
  <?php elseif ($empty): ?>
    <div class="view-empty">
      <?php print $empty; ?>
    </div>
  <?php endif; ?>

  <?php if ($pager): ?>
    <?php print $pager; ?>
  <?php endif; ?>

  <?php if ($attachment_after): ?>
    <div class="attachment attachment-after">
      <?php print $attachment_after; ?>
    </div>
  <?php endif; ?>

  <?php if ($more): ?>
    <?php print $more; ?>
  <?php endif; ?>

  <?php if ($footer): ?>
    <div class="view-footer">
      <?php print $footer; ?>
    </div>
  <?php endif; ?>

  <?php if ($feed_icon): ?>
    <div class="feed-icon">
      <?php print $feed_icon; ?>
    </div>
  <?php endif; ?>

</div><?php /* class view */ ?>


