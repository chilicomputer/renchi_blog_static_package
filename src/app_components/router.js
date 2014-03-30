define([
	'director',
	'app/views'
], function(
	director,
	views
){
'use strict';

	var Router = director.Router;
	var routes = {
		'/':                views.index,
		'/page/:pid':       views.page,
		'/search/:q':       views.search,
		'/post/:pid':       views.post,
		'/tags':            views.tags,
		'/tags/:tag':       views.tag,
		'/about':           views.about
	};
	var router = Router( routes );
	router.notfound = views.notfound;
	router.init( '/' );
});