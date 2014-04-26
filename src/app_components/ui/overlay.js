define([
	'app/utils/transition',
	'jquery'
], function(
	transition,
	$
){
'use strict';

	var exports = {};
	var $mask;
	var $root;

	var main = function() {

		$root = $( '[app-view-outer]' );

		$mask = $( '<div>' );
		$mask.css({
			position: 'absolute',
			zIndex: 9000,
			width: '100%',
			height: '100%',
			top: 0,
			background: 'rgba(0,0,0,0.4)'
		});

		exports.show = show;
		exports.hide = hide;
	};

	var show = function() {

		$mask.appendTo( $( 'body' ) );
		$( 'html,body' ).css({
			'overflow': 'hidden',
			'height': '100%'
		});

		if ( transition.vendor !== null ) {
			$root.css( transition.vendor + 'TransformOrigin', '50% 0%' );
			$root.css( transition.vendor + 'Transform', 'scale(1.3)' );
			$root.css( transition.vendor + 'Filter', 'blur(4px)' );
		}
	};

	var hide = function() {

		$mask.remove();
		$( 'html,body' ).css({
			'overflow': '',
			'height': ''
		});
		$root.css( transition.vendor + 'TransformOrigin', '' );
		$root.css( transition.vendor + 'Transform', '' );
		$root.css( transition.vendor + 'Filter', '' );
	};

	main();

	return exports;
});