"use strict";

/* Playout namespace */
var playout = {
	baseurl: 'http://triplejgizmo.abc.net.au/pav-proxy/',
	plays_query: "http://triplejgizmo.abc.net.au/pav-proxy/?pass=" + pav_key + "&query=" + encodeURIComponent('plays.json?channel=4&limit=10'),

	init: function() {
		$.ajax({
			dataType: 'jsonp',
			url: playout.plays_query,
			success: function(data) {
				var $playout_ul = $('#play-history');
				console.log(data);
				$(data).each(function() {
					var artist = this.artistname;
					var track = this.title;
					var img = this.albumimage;
					if(!img) {
						img = helper.default_album_image;
					}
					var $artist = $('<p/>').addClass('artist').html(artist);
					var $track = $('<p/>').addClass('track').html(track);
					var $info = $('<div/>').append($artist,$track);
					var $img = $('<img/>').attr('src',img);
					var $li = $('<li/>').append($img,$info);
					$playout_ul.append($li);
				});
				
				$('#play-history').kwicks({  
			        max : 250,  
			        spacing : 0  
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
	}
};