"use strict";

/* Tweets namespace */

var tweets = {
	baseurl: 'json/tweets.php',
	
	update: function(artist) {
		var $elem = media.$elem.find('ul');
		$elem.empty();
		media.$elem.find('p.artist').remove();
		media.$elem.find('p.sentiment').remove();
		var query = tweets.baseurl + '?artist=' + encodeURIComponent(artist);
		console.log(query);
		$.ajax({
			dataType: 'jsonp',
			url: query,
			success: function(data) {
				console.log(data);
				if(data.tweets.length>0) {
					$(data.tweets).each(function() {
						/*
						var url = this.url;
						var title = this.title;
						var description = this.description;
						var date = this.date;
						var type = this.type;
						
						var $title = $('<p/>').addClass('title').append($('<a/>').text(title + ' [' + type + ']').attr('href',url).attr('target','_blank'));
						var $date = $('<p/>').addClass('date').text(date);
						var $description = $('<p/>').addClass('description').text(description);
						var $li = $('<li/>').append($title,$date,$description);
						$elem.append($li);
						*/
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