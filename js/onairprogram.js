"use strict";

/* Program namespace */

var program = {
	baseurl: 'json/onair_program.php',
	
	update: function() {
		var query = program.baseurl;
		$.ajax({
			dataType: 'jsonp',
			url: query,
			success: function(data) {
				if(data) {
					var img = data.img;
					var title = data.program;
					program.$elem.find('img').attr('src',img);
					program.$elem.find('p').text(title);
				}
			},
			error: function(a,b,c) {
				console.log('error!');
			}
		});
	}

}