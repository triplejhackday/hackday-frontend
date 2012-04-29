"use strict";

/* Media namespace */

var media = {
	baseurl: 'http://triplejgizmo.abc.net.au/hottest100/json/media/index.php',
	
	update: function(artist) {
		var $elem = media.$elem.find('ul');
		$elem.empty();
		var query = media.baseurl + '?artist=' + encodeURIComponent(artist);
		$.ajax({
			dataType: 'jsonp',
			url: query,
			success: function(data) {
				if(data.length>0) {
					$(data).each(function() {
						var id = this.media_id;
						var url = this.url;
						var title = this.title;
						var date = this.date;
						var type = this.type;
						var img = media.getLargeImage(this.image);
						
						var $title = $('<p/>').addClass('title').append($('<a/>').text(title).attr('href',url).attr('target','_blank'));
						var $date = $('<p/>').addClass('date').text(date);
						var $img = $('<img/>').attr('src',img).addClass('bg').error(function() {
						    $img.hide();
						});
						var $overlay = $('<div/>').append($title,$date).addClass('overlay');
						var $media = media.getMedia(type,url);
						var $li = $('<li/>').append($img,$overlay).addClass(media.getMediaClass(type));
						$elem.append($li);
					});
					helper.showTab(media.$elem);
				} else {
					helper.hideTab(media.$elem);
				}
			},
			error: function() {
				console.log('error!');
			}
		});
	},
	
	getMedia: function(type,id,url) {
		var $media = $('<div/>');
		/*
		if(type=="a") {
			$media.addClass('simple-mp3').addId(')
			<div class="simple-mp3">
			<p class="audio-artist">Damn Terran</p>
			<p class="audio-track"><a href="http://mpegmedia.abc.net.au/triplej/newmusic/damn_terran/rebels.mp3">Rebels</a></p>
			</div>

		}
		*/
	
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