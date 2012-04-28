"use strict";

/* Hottest100 namespace */

var hottest100 = {
	baseurl: 'http://triplejgizmo.abc.net.au/hottest100/json/index.php',
	
	update: function(artist) {
		var query = hottest100.baseurl + '?artist=' + artist;
		$.ajax({
			dataType: 'jsonp',
			url: query,
			success: function(data) {
				if(data.tracks) {
					$(data.tracks).each(function() {
						var artist = this.artist;
						var track = this.track;
						var position = this.position;
						var year = this.year;
						var $artist = $('<p/>').addClass('artist').text(artist);
						var $track = $('<p/>').addClass('track').text(track);
						var $position = $('<p/>').addClass('position').text(year + ": #" + position);
						var $li = $('<li/>').append($track,$artist,$position);
						hottest100.$elem.append($li);
					});
				} else {
					hottest100.$elem.append($('<p/>').html('No results'));
				}
			},
			error: function() {
				console.log('error!');
			}
		});
	}

}