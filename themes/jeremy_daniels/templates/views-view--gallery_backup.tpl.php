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
 print_r('code here...');
 $js_galleries = array();
 $js_gallery = array();
 $js_gallery_images = array();
 $js = array();
 $gal_title = array();
 $gal_order = array();
 for ($i=0;$i <count($galleries); $i ++){
	array_push($js_galleries, $galleries[$i]->_field_data);
 }
 
 for ($i=0;$i <count($js_galleries); $i ++){
	$gallery = $js_galleries[$i];
	$js_galleries[$i]['images'] = $gallery['nid']['entity']->field_image;
	array_push($js_gallery,$gallery['nid']['entity']->field_image);
	$gal_titile[$i]['title'] = $gallery['nid']['entity']->title;
	$gal_order[$i]['gallery_order'] = $gallery['nid']['entity']->field_gallery_order;
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
		$fid = $js_gallery_images[$i][$k]['fid'];
		$js[$i]['image'.$k]= $uri;
		$js[$i]['fid' . $k]= $fid;
	}
	
}
$json_gallery = json_encode($js_gallery_images);
print_r('<script>var json = ' . $json_gallery .';</script>');
// $path = drupal_realpath($uri);
// print_r(count($js_galleries[0]['image_path']) );
 // print human friendly drupal objects and arrays
//drupal_set_message('<pre>'. print_r($galleries, TRUE) .'</pre>');
?>
<script>
console.log(json);
for (i=0;i<json.length;i++){
	var gal = json[i].gallery_order;
	var index = (gal.gallery_order['und']);
	console.log(index);
}
</script>
<?php /*
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


