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
						var mediaContent = this.content;
						if(mediaContent) {
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
							var $media = media.getMedia(type,id,mediaContent);
							var $overlay = $('<div/>').append($title,$date,$media).addClass('overlay');
							var $li = $('<li/>').append($img,$overlay).addClass(media.getMediaClass(type));
							$elem.append($li);
						}
					});
					if($elem.find('li').length == 0) {
						helper.hideTab(media.$elem);
					} else {
						helper.showTab(media.$elem);
					}
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
		if(type=="a") {
			return helper.getAudioPlayerEmbed(id,url);
		}
	
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