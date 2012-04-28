"use strict";

/* Tweets namespace */

var tweets = {
	baseurl: 'json/tweets.php',
	
	update: function(artist) {
		var $elem = tweets.$elem.find('ul');
		$elem.empty();
		tweets.$elem.find('p.artist').remove();
		tweets.$elem.find('p.sentiment').remove();
		var query = tweets.baseurl + '?artist=' + encodeURIComponent(artist);
		$.ajax({
			dataType: 'jsonp',
			url: query,
			success: function(data) {
				console.log(data);
				if(data.tweets.length>0) {
					var $artist = $('<p/>').addClass('artist').text(artist);
					if(data.handle) {
						var $handle = $('<a/>').addClass('handle').attr('target','_blank').attr('href','http://twitter.com/#!/'+data.handle).text(data.handle);
						$artist.append($handle);
					}
					$elem.before($artist);
				
					var sentiment = "Twitter is pretty <span>" + data.sentiment.description + "</span> about this artist.";
					var $sentiment = $('<p/>').addClass('sentiment').html(sentiment);
					$elem.before($sentiment);
				
					$(data.tweets).each(function() {
						var text = this.text;
						var id = this.id;
						var authorId = this.author.id;
						var authorName = this.author.name;
						var authorImg = this.author.img;
						var url = 'http://twitter.com/#!/' + authorId + '/status/' + id;
						
						var $img = $('<img/>').attr('src',authorImg);
						var $author = $('<p/>').addClass('author').append($img,$('<a/>').text(authorName).attr('href',url).attr('target','_blank'));
						var $text = $('<p/>').addClass('text').text(text);
						var $li = $('<li/>').append($author,$text);
						$elem.append($li);
					});
				} else {
					$elem.append($('<p/>').html('No tweets'));
				}
			},
			error: function() {
				console.log('error!');
			}
		});
	}

}