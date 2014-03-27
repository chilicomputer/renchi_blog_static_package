( function( curl ) {
'use strict';

	// init curl
	curl({

		baseUrl: '/',
		packages: [

			{
				name: 'app',
				location: 'app_components'
			},

			{
				name: 'theme',
				location: 'app_components/styles',
				config: {
					moduleLoader: 'curl/plugin/css'
				}
			},

			// third-party bower components
			{
				name: 'curl',
				location: 'bower_components/curl/src/curl'
			},

			{
				name: 'when',
				location: 'bower_components/when/',
				main: 'when'
			},

			{
				name: 'rest',
				location: 'bower_components/rest/',
				main: 'rest'
			},

			{
				name: 'jquery',
				location: 'bower_components/jquery/dist',
				main: 'jquery',
				config: {
					moduleLoader: 'curl/loader/cjsm11'
				}
			},

			{
				name: 'director',
				location: 'bower_components/director/build/',
				main: 'director',
				config: {
					moduleLoader: 'curl/loader/cjsm11'
				}
			},

			{
				name: 'doT',
				location: 'bower_components/doT',
				main: 'doT'
			},

			{
				name: 'tween',
				location: 'bower_components/tween.js/src',
				main: 'Tween.js'
			}
		]
	});

	curl( ['app'] );
})( window.curl );