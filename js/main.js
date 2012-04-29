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
		info.$elem = $('#info');
		//tweets.$elem = $('#tweets');
		unearthed.$elem = $('#unearthed');
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
	
	showTab: function($elem) {
		var id = $elem.attr('id');
		if(id == 'info' && (hottest100.hasContent === null || featurealbums.hasContent === null)) {
			return;
		}
		var tab = '#tabs li[data-tab=' + $elem.attr('id') + ']';
		$(tab).show();
		$elem.show();
	},
	
	hideTab: function($elem) {
		var id = $elem.attr('id');
		var tab = '#tabs li[data-tab=' + id + ']';
		$(tab).hide();
		$elem.hide();
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
		unearthed.update(helper.artist,helper.track);
		//tweets.update(helper.artist);
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
	},
	
	getAudioPlayerEmbed: function(id,url) {
		return '<div class="simple-mp3" data-src="' + url + '" data-id="' + id + '"></div>';
	},
	
	initialiseMediaPlayers: function() {
		console.log('init players');
		helper.initialiseAudioPlayers();
	},
	
	initialiseAudioPlayers: function() {
		var jplayer_div = '<div class="jp-jplayer" id="jquery_jplayer_@X" data-src="@Z"></div><div class="jp-audio"><div id="jp_interface_@X" class="jp-interface"><ul class="jp-controls"><li><a href="#" class="jp-play" tabindex="1"></a></li><li><a href="#" class="jp-pause" tabindex="1"></a></li></ul></div></div>';
		$('div.simple-mp3').each(function() {
			mp3_src = $(this).attr('data-src');
			id = $(this).attr('data-id');
			$(this).before(jplayer_div.replace(/@X/g,id).replace(/@Z/g,mp3_src));
			$("#jquery_jplayer_" + id).jPlayer({
				ready: function () {
					var mp3_src = $(this).attr('data-src');
					if(mp3_src.indexOf('rtmp:') !== -1) {
						$(this).jPlayer("setMedia", {
							rtmpa: mp3_src
						});
					} else {
						$(this).jPlayer("setMedia", {
							mp3: mp3_src
						});
					}
				},
				play: function (event) {
					$(this).jPlayer("pauseOthers");
				},
				supplied: "mp3",
				swfPath: "js",
				preload: 'none',
				cssSelectorAncestor: "#jp_interface_" + id
			});
		});
	}
	
};