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

		window.onresize = _expandViewDom;
		window.onorientationchange = _expandViewDom;
		$view = $( view );
	};

	var render = function() {

		$view.html( tplStr );
		_expandViewDom();
	};

	var _expandViewDom = function() {

		$( 'section.about', $view ).css( 'minHeight', $view[0].offsetHeight );
	};

	main();
	return exports;
});