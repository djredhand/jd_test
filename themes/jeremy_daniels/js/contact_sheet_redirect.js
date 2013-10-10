var original_url = window.location.href.split('?');
var time = (new Date).getTime();
var new_location = original_url[0] + '?time=' +time;
if (original_url.length > 1){
	old_time = original_url[1].split('=')[1];
	new_time = (new Date).getTime();
	if ((new_time - old_time) > 45000){
		new_location = original_url[0] + '?time=' +new_time;
		window.location = new_location;
	}else if(new_time - old_time == "NAN"){
		new_location = original_url[0] + '?time=' +new_time;
	}	

}else{
	window.location = new_location;
}
