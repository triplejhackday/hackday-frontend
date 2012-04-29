"use strict";

/* Unearthed namespace */

var unearthed = {
	baseurl: 'http://54.248.108.172:8080/tracks/random/',
	
	update: function(artist,track) {
		var $elem = unearthed.$elem.find('ul');
		$elem.empty();
		var query = unearthed.baseurl + '?artist=' + encodeURIComponent(artist) + '&track=' + encodeURIComponent(track);
		console.log(query);
		$.ajax({
			dataType: 'jsonp',
			url: query,
			success: function(data) {
				$(data).each(function() {
					var artistUrl = this.artisturi;
					var trackUrl = this.download;
					var artist = this.artist;
					var title = this.trackname;
					
					var $title = $('<p/>').addClass('title').text(title)
					var $artist= $('<p/>').addClass('artist').text(artist);
					var $img = $('<img/>').attr('src',img).addClass('bg').error(function() {
					    $img.hide();
					});
					var $overlay = $('<div/>').append($artist,$title).addClass('overlay');
					var $li = $('<li/>').append($img,$overlay);
					$elem.append($li);
				});
			},
			error: function() {
				console.log('error!');
			}
		});
	},
	
	getMediaClass: function(char) {
		var mediaClass = "";
		if(char == 'a') { mediaClass = "audio";}
		if(char == 'p') { mediaClass = "photo";}
		if(char == 'v') { mediaClass = "video";}
		return mediaClass;
	},
	
	getLargeImage: function(url) {
		if(url.indexOf('/artists/') !== -1) {
			url = url.replace('100.jpg','340.jpg');
		}
		return url;
	},

}