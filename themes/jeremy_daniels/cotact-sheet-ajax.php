<?php
	if(isset($_REQUEST['ajax']) ){
	  include 'db_remote.php';
	  $imgArr = $_REQUEST['ajax']['image_urls'];
	  $query = "";
	  
	  foreach ($imgArr as &$img){
		$fid = $img['fid'];
		$title = $img['notes'];
		$query .="UPDATE field_data_field_image SET field_image_title = \"". $title ."\" WHERE field_image_fid = ".  $fid .";";
		
		mysql_query("UPDATE field_data_field_image SET field_image_title = \"". $title ."\" WHERE field_image_fid = ".  $fid .";");
		
		print_r($img['notes']);
	}//end foreach
	
	//echo($query);
	//$sqlstr_update = mysql_query($query);
	
}// end if (isset($_REQUEST) )


	
?>
