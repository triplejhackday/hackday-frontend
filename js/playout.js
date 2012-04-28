"use strict";

/* Playout namespace */
var playout = {
	baseurl: 'http://triplejgizmo.abc.net.au/pav-proxy/',
	plays_query: "http://triplejgizmo.abc.net.au/pav-proxy/?pass=" + pav_key + "&query=" + encodeURIComponent('plays.json?channel=4&limit=14'),

	init: function() {
		
		$.ajax({
			dataType: 'jsonp',
			url: playout.plays_query,
			success: function(data) {
				console.log(data);
				var count = 0;
				var prev_track_id = "";
				$(data).each(function() {
					if(count>9) {
						return false;
					}
					
					var id = this.track_id;
					if(id != prev_track_id) {
						prev_track_id = id;
						var artist = this.artistname;
						var track = this.title;
						if(count==0) {
							helper.artist = artist;
							helper.track = track;
							helper.update();
						}
						var img = this.albumimage;
						if(!img) {
							img = helper.default_album_image;
						}
						var $artist = $('<p/>').addClass('artist').html(artist);
						var $track = $('<p/>').addClass('track').html(track);
						var $info = $('<div/>').append($artist,$track);
						var $img = $('<img/>').attr('src',img);
						var $li = $('<li/>').append($img,$info);
						playout.$elem.append($li);
						count++;
					}
				});
				
				$('#play-history').kwicks({  
			        max : 250,  
			        spacing : 0,
			        sticky: true
			    });
			},
			error: function() {
				console.log('error!');
			}
		});
	},

	update: function() {
		$.ajax({
			dataType: 'jsonp',
			url: playout.plays_query,
			success: function(data) {
				return data;
			},
			error: function() {
				console.log('error!');
			}
		});
	},
	
	getCurrentArtist: function() {
		return playout.$elem.find('li:first-child .artist').text();
	},
	
	getCurrentTrack: function() {
		return playout.$elem.find('li:first-child .track').text();
	}
	
};