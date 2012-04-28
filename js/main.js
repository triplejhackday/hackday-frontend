$(document).ready(function() {
	helper.getElems();
    playout.init();
});


var helper = {
	default_album_image: 'http://www.abc.net.au/triplej/albums/default/covers/100.jpg',
	
	getElems: function() {
		playout.$elem = $('#play-history');
		hottest100.$elem = $('#hottest100');
		media.$elem = $('#media');
		featurealbums.$elem = $('#featurealbums');
	},
	
	update: function() {
		helper.artist = playout.getCurrentArtist();
		helper.track = playout.getCurrentTrack();
		hottest100.update(helper.artist);
		media.update(helper.artist);
		featurealbums.update(helper.artist);
	}
	
};