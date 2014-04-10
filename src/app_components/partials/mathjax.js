define(function(){
'use strict';

	var exports = {};
	var _queueDoms = [];
	var _configured;

	var main = function() {

		exports.queue = queue;
		exports.digest = digest;
	};

	var queue = function( dom ) {

		_queueDoms.push( dom );
	};

	var digest = function() {

		// if ( !_queueDoms.length ) return;

		curl( ['js!mathjax'] ).then( function() {

			var dom;

			if ( !_configured ) {

				window.MathJax.Hub.Config({

					'HTML-CSS': {
					    linebreaks: { automatic: true, width: 'container' }
					}
				});

				_configured = true;
			}

			while( _queueDoms.length ) {

				dom = _queueDoms.shift();

				window.MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, dom ]);
			}
		});
	};

	main();
	return exports;
});