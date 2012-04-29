"use strict";

/* Hottest100 namespace */

var hottest100 = {
	baseurl: 'http://triplejgizmo.abc.net.au/hottest100/json/index.php',
	hasContent: null,
	
	update: function(artist) {
		hottest100.hasContent = null;
		var $elem = hottest100.$elem.find('ul');
		$elem.empty();
		var query = hottest100.baseurl + '?artist=' + encodeURIComponent(artist);
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
						var img = 'img/hottest100/' + year + '/' + position + '.jpg';
						
						var $artist = $('<p/>').addClass('artist').text(artist);
						var $track = $('<p/>').addClass('track').text(track);
						var $position = $('<p/>').addClass('position').text(year + ": #" + position);
						var $img = $('<img/>').attr('src',img).addClass('bg').error(function() {
						    $img.hide();
						});
						var $overlay = $('<div/>').append($track,$artist,$position).addClass('overlay');
						var $li = $('<li/>').append($img,$overlay);
						
						$elem.append($li);
					});
					hottest100.hasContent = true;
					helper.showTab(hottest100.$elem);
					helper.showTab(info.$elem);
				} else {
					hottest100.hasContent = false;
					helper.hideTab(hottest100.$elem);
					helper.hideTab(info.$elem);
				}
			},
			error: function() {
				console.log('error!');
			}
		});
	}

}