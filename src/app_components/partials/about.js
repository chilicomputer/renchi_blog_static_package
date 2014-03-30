define([
	'text!app/tpls/about.html',
	'theme/about',
	'jquery'
], function(
	tplStr,
	dumbStyle,
	$
){
'use strict';

	var exports = {};
	var $view;

	var main = function() {

		exports.init = init;
		exports.render = render;
	};

	var init = function( view ) {

		$view = $( view );
	};

	var render = function() {

		$view.html( tplStr );
	};

	main();
	return exports;
});