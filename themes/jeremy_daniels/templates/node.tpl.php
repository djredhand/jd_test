

<?php
/**
 * @file
 *  Jermey Daniels theme implementation to display a node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: An array of node items. Use render($content) to print them all,
 *   or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct url of the current node.
 * - $display_submitted: Whether submission information should be displayed.
 * - $submitted: Submission information created from $name and $date during
 *   template_preprocess_node().
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type, i.e., "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type, i.e. story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $view_mode: View mode, e.g. 'full', 'teaser'...
 * - $teaser: Flag for the teaser state (shortcut for $view_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * Field variables: for each field instance attached to the node a corresponding
 * variable is defined, e.g. $node->body becomes $body. When needing to access
 * a field's raw values, developers/themers are strongly encouraged to use these
 * variables. Otherwise they will have to explicitly specify the desired field
 * language, e.g. $node->body['en'], thus overriding any language negotiation
 * rule that was previously applied.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see template_process()
 */
?>

<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
	 <?php
		
		//Print out the type of node
		//print_r('<h1> the type is: ' . $type . '</h1>');
		//Create a hook to the Contact/Proof Galleries to fire off JS and php loaders for the content
		if ($type == 'plupload'){
			// Create a redirect becasue the cache killer does not work for anon users
			//print('<script src="' . base_path() . 'themes/jeremy_daniels/js/contact_sheet_redirect.js"></script>');

				if (user_is_logged_in() ){
				}else{
					drupal_flush_all_caches();
					cache_clear_all('*', 'cache_views_data', TRUE);
					cache_clear_all('*', 'cache_views', TRUE);
					cache_clear_all('*', 'cache_page', TRUE);
					cache_clear_all('*', 'cache_field', TRUE);
				}
			//set the base path url
			
			// KILL THE CACHE
			//drupal_flush_all_caches();
			cache_clear_all('*', 'cache_views_data', TRUE);
			cache_clear_all('*', 'cache_views', TRUE);
			cache_clear_all('*', 'cache_page', TRUE);
			cache_clear_all('*', 'cache_field', TRUE);
			
			$basePath = base_path();
			
			// Grab the page URL that has been set by the admin, 
			//this is done when creating the content in the URL field. 
			//If not specifically set, Drupal will define it for you. 
			$urlMatch = explode('/', parse_url($node_url, PHP_URL_PATH) );
			$contactSheet = array_pop($urlMatch);
			$jsPass = $content['field_password']['#items'];
			if(isset($content['field_image']) ){
				$numImages = count($content['field_image']);
			}
			$counted = 0;
			$imgUrls = array();
			
			if(isset($numImages)){
			print_r('<div class="contact-sheet-wrapper">');
				for($i=0; $i<$numImages; $i++){
					$key = $i;
					$notes = '';
					if (isset ($content['field_image'][$i]) ) {
						$img = $content['field_image'][$i]['#item'];
						$uri = ($content['field_image'][$i]['#item']['uri']);
						$resized_image = image_style_url('contact_sheet_enlarge', $uri);
						$notes = ($content['field_image'][$i]['#item']['title']);
						$imgTitle = ($content['field_image'][$i]['#item']['alt']);
						$imgFid = ($content['field_image'][$i]['#item']['fid']);
						$imgFilename = ($content['field_image'][$i]['#item']['filename']);

						$counted += 1;
						$url = file_create_url($uri);
						$imgUrls[$key] = array(
							'url' => $url,
							'fid' => $imgFid,
							'notes' => $notes
						) ;
						
						print_r('<div class="contact-sheet-image-wrapper">');
						print_r('<img title="Click to Enlarge" class="clone-image hide" src=" '. $resized_image . ' "/> ');
						print_r('<img title="Click to Enlarge" class="contact-sheet-image" src=" '. $resized_image . ' "/> ');
						print_r('<br>');
						//print_r('<span>img #' . $imgFid . '</span>');
						print_r('<br/>');
						print_r('<span>'. $imgTitle . '</span>');
						print_r('<textarea size="25" height="225" class="notes" id="' . $imgFid . '"> ' . $notes . ' </textarea>');
						print_r('</div><!--end .contact-sheet-image-wrapper-->');
					}	//end if
				}//end for
				print_r('</div><!--end .contact-sheet-wrapper-->');
			}
			
			drupal_add_js(array('contactSheet' => array(
				'page_url' 			=> $node_url,
				'contact_sheet'	=> $contactSheet,
				'num_images' 	=> $counted,
				'image_urls'		=> $imgUrls,
				'base_path'			=> $basePath,
				'password'			=> $jsPass,
			)), 'setting');
			
			print_r('<script src="' . base_path() . 'themes/jeremy_daniels/js/contact_sheet.js"></script>');
			print_r('<script src="' . base_path() . 'themes/jeremy_daniels/js/contact_sheet_img_names.js"></script>');
			
			return;
		}  
		
		if ($type == 'home_gallery'){
			$nivo_css1 = array(
			  '#tag' => 'link', // The #tag is the html tag - <link />
			  '#attributes' => array( // Set up an array of attributes inside the tag
				'href' => base_path() . 'themes/jeremy_daniels/nivo/default/default.css', 
				'rel' => 'stylesheet',
				'type' => 'text/css',
			  ),
			);
			$nivo_css2 = array(
			  '#tag' => 'link', // The #tag is the html tag - <link />
			  '#attributes' => array( // Set up an array of attributes inside the tag
				'href' => base_path() . 'themes/jeremy_daniels/nivo/bar/bar.css', 
				'rel' => 'stylesheet',
				'type' => 'text/css',
			  ),
			);
			$nivo_css3 = array(
			  '#tag' => 'link', // The #tag is the html tag - <link />
			  '#attributes' => array( // Set up an array of attributes inside the tag
				'href' => base_path() . 'themes/jeremy_daniels/nivo/dark/dark.css', 
				'rel' => 'stylesheet',
				'type' => 'text/css',
			  ),
			);
			$nivo_css4 = array(
			  '#tag' => 'link', // The #tag is the html tag - <link />
			  '#attributes' => array( // Set up an array of attributes inside the tag
				'href' => base_path() . 'themes/jeremy_daniels/nivo/light/light.css', 
				'rel' => 'stylesheet',
				'type' => 'text/css',
			  ),
			);
			
			drupal_add_html_head($nivo_css1, 'nivo1');
			drupal_add_html_head($nivo_css2, 'nivo2');
			drupal_add_html_head($nivo_css3, 'nivo3');
			drupal_add_html_head($nivo_css4, 'nivo4');	
			
			
			
			$imgLength = count($field_image);
			$base = base_path();
			$imgArr = array();
			$imgObj = array();
			print_r('<div class="slider-wrapper theme-default"><div id="homepage-slider" style="width:844px;">');
			for ($i=0;$i<$imgLength; $i++){
				$img_src = $base.'sites/default/files/'.$field_image[$i]["filename"];
				$imgArr['image'] = $img_src;
				print '<img src="'. $img_src .'" data-thumb="'. $img_src .'" />';
				array_push($imgObj, $imgArr);
			}//end for
			print_r('</div></div>');
			$all_Images = json_encode($imgObj);
			print_r('<script>var slideObj = '. $all_Images .'</script>');
			
			
			print_r('<script src="' . base_path() . 'themes/jeremy_daniels/nivo/jquery-1.9.0.min.js"></script>');
			print_r('<script src="' . base_path() . 'themes/jeremy_daniels/js/homeGallery.js"></script>');
			print_r('<script src="' . base_path() .'themes/jeremy_daniels/nivo/jquery.nivo.slider.js"></script>');
			
			
			return;
		}else{
			print_r('<script src="' . base_path() . 'themes/jeremy_daniels/js/resized.js"></script>');
		}//end if
		if ($type == 'about_page'){
			print_r('<script src="' . base_path() . 'themes/jeremy_daniels/js/about.js"></script>');
		}//end if about page
		
	?>
  <?php print render($title_prefix); ?>
  <?php if (!$page): ?>
    <h2<?php print $title_attributes; ?>>
      <a href="<?php print $node_url; ?>"><?php print $title; ?></a>
    </h2>
  <?php endif; ?>
  <?php print render($title_suffix); ?>

  <?php if ($display_submitted): ?>
    <div class="meta submitted">
      <?php print $user_picture; ?>
      <?php print $submitted; ?>
    </div>
  <?php endif; ?>

  <div class="content clearfix"<?php print $content_attributes; ?>>
    <?php
      // We hide the comments and links now so that we can render them later.
      hide($content['comments']);
      hide($content['links']);
      print render($content);
    ?>
  </div>

  <?php
    // Remove the "Add new comment" link on the teaser page or if the comment
    // form is being displayed on the same page.
    if ($teaser || !empty($content['comments']['comment_form'])) {
      unset($content['links']['comment']['#links']['comment-add']);
    }
    // Only display the wrapper div if there are links.
    $links = render($content['links']);
    if ($links):
  ?>
    <div class="link-wrapper">
      <?php print $links; ?>
    </div>
  <?php endif; ?>

  <?php print render($content['comments']); ?>

</div>
