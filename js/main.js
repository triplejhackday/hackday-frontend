$(document).ready(function() {
	helper.resize();
	helper.getElems();
	helper.addEvents();
    playout.init();
});


var helper = {
	default_album_image: 'http://www.abc.net.au/triplej/albums/default/covers/100.jpg',
	
	getElems: function() {
		playout.$elem = $('#play-history');
		hottest100.$elem = $('#hottest100');
		media.$elem = $('#media');
		featurealbums.$elem = $('#featurealbums');
		tweets.$elem = $('#tweets');
	},
	
	addEvents: function() {
		playout.$elem.find('li').live('click', function(e) {
			helper.artist = $(this).find('.artist').text();
			helper.track =  $(this).find('.track').text();
			helper.update();
			e.preventDefault();
		});
		
		$(window).resize(function() {
			helper.resize();
		});
	},
	
	update: function() {
		hottest100.update(helper.artist);
		media.update(helper.artist);
		featurealbums.update(helper.artist);
		tweets.update(helper.artist);
	},
	
	resize: function() {
		var window_width = $(window).width();
		var content_width = window_width - 290;
		var window_height = $(window).height();
		var content_height = window_height - 94;
		$('#content').width(content_width).height(content_height); 
		
	}
	
};