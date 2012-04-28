$(document).ready(function() {
	helper.getElems();
    playout.init();
});


var helper = {
	default_album_image: 'http://www.abc.net.au/triplej/albums/default/covers/100.jpg',
	artist: null,
	track: null,
	
	getElems: function() {
		playout.$elem = $('#play-history');
		hottest100.$elem = $('#hottest100');
		media.$elem = $('#media');
	},
	
	update: function() {
		helper.artist = playout.getCurrentArtist();
		helper.track = playout.getCurrentTrack();
		hottest100.update(helper.artist);
		media.update(helper.artist);
	}
	
};