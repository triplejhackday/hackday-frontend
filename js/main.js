$(document).ready(function() {
	helper.resize();
	helper.getElems();
	helper.addEvents();
	program.update();
    playout.init();
    setTimeout('playout.update();',helper.checkInterval);
});


var helper = {
	default_album_image: 'http://www.abc.net.au/triplej/albums/default/covers/100.jpg',
	checkInterval: 30000, 
	
	getElems: function() {
		playout.$elem = $('#play-history');
		hottest100.$elem = $('#hottest100');
		media.$elem = $('#media');
		featurealbums.$elem = $('#featurealbums');
		tweets.$elem = $('#tweets');
		program.$elem = $('#program');
	},
	
	addEvents: function() {
		playout.$elem.find('li').live('click', function(e) {
			helper.artist = $(this).find('.artist').text();
			helper.track =  $(this).find('.track').text();
			helper.trackId =  $(this).attr('id');
			playout.$elem.find('li').removeClass('active');
			$(this).addClass('active');
			helper.resetTabs();
			helper.update();
			e.preventDefault();
		});
		
		$(window).resize(function() {
			helper.resize();
		});
		
		$('#tabs').find('li').live('click', function(e) {
			$('#tabs li').removeClass('active');
			$(this).addClass('active');
			var tab = '#' + $(this).attr('data-tab');
			$('#content').scrollTo(tab, 500);
			e.preventDefault();
		});
	},
	
	resetTabs: function() {
		$('#content').scrollTo('#unearthed', 0);
		$('#tabs li').removeClass('active');
		$('#tabs li:first-child').addClass('active');
	},
	
	update: function() {
		hottest100.update(helper.artist);
		media.update(helper.artist);
		featurealbums.update(helper.artist);
		//tweets.update(helper.artist);
	},
	
	getLargeImage: function(url) {
		return url.replace('100.jpg','340.jpg');
	},
	
	resize: function() {
		var tab = '#' + $('#tabs li.active').attr('data-tab');
		$('#content').scrollTo(tab, 0);
		var window_width = $(window).width();
		var content_width = window_width - 250;
		var window_height = $(window).height();
		var content_height = window_height - 54;
		$('#content').width(content_width).height(content_height); 
		$('#content section').width(content_width - 40).height(content_height - 40); 
	}
	
};