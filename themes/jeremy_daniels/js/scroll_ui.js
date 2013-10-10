jQuery(document).ready(function($){

	var sroll_prev = $('#scroll_prev');
	var scroll_next = $('#scroll_next');
	var arr_left = $('#arr_left');
	var arr_right = $('#arr_right')

	function mouse_leave(){
			arr_left.attr('src','themes/jeremy_daniels/images/blank.png');
			arr_right.attr('src','themes/jeremy_daniels/images/blank.png')
	}

	$('#scroll_thelist')
		.mouseenter(function(){
			arr_left.attr('src','themes/jeremy_daniels/images/arr_left_up.png');
			arr_right.attr('src','themes/jeremy_daniels/images/arr_right_up.png');
	})
		.mouseleave(function(){
			mouse_leave();
		})

	$('#scroll_prev')
		.mouseenter(function(){
			arr_left.attr('src','themes/jeremy_daniels/images/arr_left_over.png');
			arr_right.attr('src','themes/jeremy_daniels/images/arr_right_up.png');
		})
		.mouseleave(function(){
			mouse_leave();
		})
	$('#scroll_next')
		.mouseenter(function(){
			arr_left.attr('src','themes/jeremy_daniels/images/arr_left_up.png');
			arr_right.attr('src','themes/jeremy_daniels/images/arr_right_over.png');
		})
		.mouseleave(function(){
			mouse_leave();
		})

})
