"use strict";

/* Feature Albums namespace */

var featurealbums = {
	baseurl: 'http://triplejgizmo.abc.net.au/featurealbums/json/index.php',
	
	update: function(artist) {
		var query = featurealbums.baseurl + '?artist=' + artist;
		$.ajax({
			dataType: 'jsonp',
			url: query,
			success: function(data) {
				console.log(data);
				if(data.length>0) {
					$(data).each(function() {
						var url = this.review_url;
						var title = this.album;
						var date = this.date;
						
						var $title = $('<p/>').addClass('title').append($('<a/>').text(title).attr('href',url).attr('target','_blank'));
						var $date = $('<p/>').addClass('date').text(date);
						var $li = $('<li/>').append($title,$date);
						featurealbums.$elem.append($li);
					});
				} else {
					featurealbums.$elem.append($('<p/>').html('No results'));
				}
			},
			error: function() {
				console.log('error!');
			}
		});
	}

}