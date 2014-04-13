define([
	'app/utils/transition',
	'app/ui/dialog',
	'theme/search',
	'jquery'
], function(
	transition,
	dialog,
	dumbStyle,
	$
){
'use strict';

	var exports = {};
	var searchDialog;
	var $view;
	var $input;
	var main = function() {

		$view = $( '<div class="search"><input type="text" placeholder="search..."/></div>' );
		$input = $( 'input', $view );
		searchDialog = dialog({

			content: $view,
			yes: _watchers.search
		});

		exports.show = show;
		exports.hide = hide;
	};

	var _watchers = {

		search: function() {

			var q = $input.val().trim();

			if ( !q ) {

			    $input.addClass( 'error' );
			    return true;
			}

			$input.removeClass( 'error' );
			location.hash = '#/search/' + encodeURIComponent( q );
			return false;
		}
	};

	var show = function() {

		searchDialog.show();
	};

	var hide = function() {

		searchDialog.hide();
	};

	main();

	return exports;
});