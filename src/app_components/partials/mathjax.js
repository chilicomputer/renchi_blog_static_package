define(function(){
'use strict';

	var exports = {};
	var _queueDoms = [];

	var main = function() {

		exports.queue = queue;
		exports.digest = digest;
	};

	var queue = function( dom ) {

		_queueDoms.push( dom );
	};

	var digest = function() {

		curl( ['js!mathjax'] ).then( function() {

			var dom;

			while( _queueDoms.length ) {

				dom = _queueDoms.shift();

				window.MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, dom ]);
			}
		});
	};

	main();
	return exports;
});