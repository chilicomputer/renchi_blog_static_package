define([
	'theme/gotop',
	'tween',
	'app/utils/animationFrame',
	'jquery'
], function(
	dumbStyle,
	TWEEN,
	animationFrame,
	$
){
'use strict';

	var $view;
	var exports = {};
	var _timer;
	var _request = animationFrame.request;

	var main = function() {

		setTimeout( function() {

			$view = $( '<div class="go-top"><span class="icon"></span></div>' ).appendTo( $( 'body') );

			$view.click( function() {

				scrollToTop();
			});

			window.onscroll = function( e ) {

				if ( !$view.data( 'show' ) && window.scrollY > window.innerHeight ) {

					$view.show().data( 'show', 1 );

					if ( /Mobile/.test(navigator.userAgent) ) $view.css( 'opacity', 1 );
					else {
						_timer && clearTimeout( _timer );
						_timer = setTimeout( function() {
							$view.animate( { opacity: 1 }, 350 );
						}, 200 );
					}
				}

				if ( $view.data( 'show' ) && window.scrollY <= window.innerHeight ) {

					$view.data( 'show', 0 );

					if ( /Mobile/.test(navigator.userAgent) ) $view.hide();
					else {
						_timer && clearTimeout( _timer );
						_timer = setTimeout( function() {
							$view.animate( { opacity: 0}, 350, function() {
								$view.hide();
							});
						}, 200 );
					}
				}
			};

			exports.scrollToTop = scrollToTop;
		}, 0);
	};

	var scrollToTop = function() {

		var position = { y: window.scrollY };
		var update = function() {

			window.scrollTo( 0, position.y );
		};
		var tween = new TWEEN.Tween( position )
			.to( { y: 0 }, 600 )
			.delay( 50 )
			.easing( TWEEN.Easing.Cubic.InOut )
			.onUpdate( update );

		var animate = function() {

			position.y > 0 && _request( animate );
			TWEEN.update();
		};

		tween.start();
		animate();
	};

	main();

	return exports;
});