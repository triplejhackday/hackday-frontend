"use strict";

/* Playout namespace */
var playout = {
	baseurl: 'http://triplejgizmo.abc.net.au/pav-proxy/',
	query: encodeURIComponent('plays.json?channel=4&limit=10'),

	fetch: function() {
		var query = playout.baseurl + "?pass=" + pav_key + "&query=" + playout.query
		$.ajax({
			dataType: 'jsonp',
			url: query,
			success: function(data) {
				console.log(data);
			},
			error: function() {
				console.log('error!');
			}
		});
	}
};