$(document).ready(function() {
	helper.getElems();
	helper.addClicks();
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
	
	addClicks: function() {
		playout.$elem.find('li').live('click', function(e) {
			helper.artist = $(this).find('.artist').text();
			helper.track =  $(this).find('.track').text();
			helper.update();
			e.preventDefault();
		});
	},
	
	update: function() {
		hottest100.update(helper.artist);
		media.update(helper.artist);
		featurealbums.update(helper.artist);
		tweets.update(helper.artist);
	}
	
};