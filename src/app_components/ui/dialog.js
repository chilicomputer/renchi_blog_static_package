define([
	'app/ui/overlay',
	'app/utils/transition',
	'app/utils/noop',
	'text!app/tpls/dialog.html',
	'theme/dialog',
	'jquery'
], function(
	overlay,
	transition,
	noop,
	tplStr,
	dumbStyle,
	$
){
'use strict';

	return function( opts ) {

		var conf = $.extend( {
			content: '',
			yes: noop,
			no: noop,
			yesTxt: '确定',
			noTxt: '取消'
		}, opts );

		var exports = {};
		var $view;
		var main = function() {

			$view = $( tplStr ).appendTo( $( 'body' ) );

			$( '.yes', $view ).html( conf.yesTxt );
			$( '.no', $view ).html( conf.noTxt );

			render( conf.content );

			exports.show = show;
			exports.hide = hide;
			exports.render = render;
			exports.getDom = getDom;

			_listen();
		};

		var _listen = function() {

			$( '.yes', $view ).click( _liseners.yes );
			$( '.no', $view ).click( _liseners.no );
		};

		var _liseners = {

			yes: function() {

				!conf.yes() && hide();
			},

			no:  function() {

				!conf.no() && hide();
			}
		};

		var render = function( content ) {

			$( '.content', $view ).html( '' ).append( $( content) );
		};

		var show = function() {

			overlay.show();
			$view.addClass( 'far' );
			$view.show();

			setTimeout( function() {
				$view.removeClass( 'far' );
			}, 0);
		};

		var hide = function() {

			overlay.hide();
			$view.hide();
		};

		var getDom = function() {
			return $view;
		};

		main();

		return exports;
	};
});