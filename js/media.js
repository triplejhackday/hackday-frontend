"use strict";

/* Media namespace */

var media = {
	baseurl: 'http://triplejgizmo.abc.net.au/hottest100/json/media/index.php',
	
	update: function(artist) {
		var query = media.baseurl + '?artist=' + artist;
		$.ajax({
			dataType: 'jsonp',
			url: query,
			success: function(data) {
				if(data.length>0) {
					$(data).each(function() {
						var url = this.url;
						var title = this.title;
						var description = this.description;
						var date = this.date;
						var type = this.type;
						
						var $title = $('<p/>').addClass('title').append($('<a/>').text(title + ' [' + type + ']').attr('href',url).attr('target','_blank'));
						var $date = $('<p/>').addClass('date').text(date);
						var $description = $('<p/>').addClass('description').text(description);
						var $li = $('<li/>').append($title,$date,$description);
						media.$elem.append($li);
					});
				} else {
					media.$elem.append($('<p/>').html('No results'));
				}
			},
			error: function() {
				console.log('error!');
			}
		});
	}

}