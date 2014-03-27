define([
	'text!app/tpls/post.html',
	'theme/post',
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
	};

	var render = function( data ) {

		$view.html( tpl( data ) );
		MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, $( 'section.post')[0] ]);
	};

	main();
	return exports;
});