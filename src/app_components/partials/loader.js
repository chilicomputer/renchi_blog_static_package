define([
	'theme/loader',
	'jquery'
], function(
	dumbStyle,
	$
){
'use strict';

	var exports = {};
	var $view;

	var main = function() {

		$view = $( '<ul class="loader"><li></li><li></li><li></li><li></li><li></li><li></li></ul>' );

		exports.show = show;
		exports.hide = hide;
	};

	var show = function( container ) {

		$( container ).html( '' );
		$( container ).append( $view );
	};

	var hide = function() {

		$view.remove();
	};

	main();
	return exports;
});