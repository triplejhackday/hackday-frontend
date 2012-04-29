"use strict";

/* Feature Albums namespace */

var featurealbums = {
	baseurl: 'http://triplejgizmo.abc.net.au/featurealbums/json/index.php',
	hasContent: null,
	
	update: function(artist) {
		featurealbums.hasContent = null;
		var $elem = featurealbums.$elem.find('ul');
		$elem.empty();
		var query = featurealbums.baseurl + '?artist=' + encodeURIComponent(artist);
		$.ajax({
			dataType: 'jsonp',
			url: query,
			success: function(data) {
				if(data.length>0) {
					$(data).each(function() {
						var url = this.review_url;
						var title = this.album;
						var date = this.date;
						
						var $title = $('<p/>').addClass('title').append($('<a/>').text(title).attr('href',url).attr('target','_blank'));
						var $date = $('<p/>').addClass('date').text(date);
						var $li = $('<li/>').append($title,$date);
						$elem.append($li);
					});
					featurealbums.hasContent = true;
					helper.showTab(featurealbums.$elem);
					helper.showTab(info.$elem);
				} else {
					featurealbums.hasContent = false;
					helper.hideTab(featurealbums.$elem);
					helper.hideTab(info.$elem);
				}
			},
			error: function() {
				console.log('error!');
			}
		});
	}

}