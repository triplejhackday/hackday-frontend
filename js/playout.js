"use strict";

/* Playout namespace */
var playout = {
	baseurl: 'http://triplejgizmo.abc.net.au/pav-proxy/',
	plays_query: "http://triplejgizmo.abc.net.au/pav-proxy/?pass=" + pav_key + "&query=" + encodeURIComponent('plays.json?channel=4&limit='),

	init: function() {
		
		$.ajax({
			dataType: 'jsonp',
			url: playout.plays_query + '14',
			success: function(data) {
				var count = 0;
				var prev_track_id = "";
				$(data).each(function() {
					if(count>9) {
						return false;
					}
					var id = this.track_id;
					if(id != prev_track_id) {
						prev_track_id = id;
						var $li = playout.formatTrack(this);
						playout.$elem.append($li);
						if(count==0) {
							helper.artist = this.artistname;
							helper.track = this.title;
							helper.trackId = id; 
							playout.$elem.find('li:first-child').addClass('active');
							helper.update();
						}
						count++;
					}
					playout.fixGradient();
				});
			},
			error: function() {
				console.log('error!');
			}
		});
	},

	update: function() {
		console.log('check playout feed');
		$.ajax({
			dataType: 'jsonp',
			url: playout.plays_query + '1',
			success: function(data) {
				var track = data[0];
				var new_id = track.track_id;
				var current_id = playout.$elem.find('li:first-child').attr('id');
				if(new_id!=current_id) {
					var $li = playout.formatTrack(track);
					playout.$elem.prepend($li);
					playout.fixGradient();
					
				}
			},
			error: function() {
				console.log('error!');
			}
		});
		setTimeout('playout.update();',helper.checkInterval);
	},
	
	formatTrack: function(item) {
		var artist = item.artistname;
		var track = item.title;
		var id = item.track_id;
		var img = item.albumimage;
		if(!img) {
			img = helper.default_album_image;
		}
		var $artist = $('<p/>').addClass('artist').html(artist);
		var $track = $('<p/>').addClass('track').html(track);
		var $info = $('<div/>').append($track, $artist);
		var $img = $('<img/>').attr('src',img);
		return $('<li/>').attr('id',id).append($img,$info);
	},
	
	getCurrentArtist: function() {
		return playout.$elem.find('li:first-child .artist').text();
	},
	
	getCurrentTrack: function() {
		return playout.$elem.find('li:first-child .track').text();
	},
	
	fixGradient: function() {
		var min = 100;
		var max = 230;
		var count = playout.$elem.find('li').length;
		var step = (max - min) / count;
		
		playout.$elem.find('li').each(function() {
			var color = 'rgb(' + min + ',' + min + ',' + min + ')';
			$(this).css('background-color',color);
			min = min + step;
		});
	}
	
};