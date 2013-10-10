<?php
include '../../sites/default/settings.php';
$host = $databases['default']['default']['host']; //database location
$user = $databases['default']['default']['username']; //database username
$pass = $databases['default']['default']['password']; //database password
$db_name = $databases['default']['default']['database']; //database name


$link = mysql_connect($host, $user, $pass);//database connection
if (!$link) {
  echo( "<P>Unable to connect to the " .
        "database server at this time.</P>" );
	}	
mysql_select_db($db_name);

?>

