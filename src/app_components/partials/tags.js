define([
	'text!app/tpls/tags.html',
	'theme/tags',
	'doT',
	'jquery'
], function(
	tplStr,
	dumbStyle,
	doT,
	$
){
'use strict';

	var exports = {};
	var $view;
	var tpl = doT.template( tplStr );

	var main = function() {

		exports.init = init;
		exports.render = render;
	};

	var init = function( view ) {

		$view = $( view );
		if ( !('ontouchstart' in document.body ) ) {
			$( '<style>section.tag-list .count {visibility:hidden;}</style>' ).appendTo( $( 'head' ) );
		}
	};

	var render = function( data ) {

		$view.html( tpl( data ) );
	};

	main();
	return exports;
});