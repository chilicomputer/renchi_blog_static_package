define([
    'text!app/tpls/nav.html',
    'theme/nav',
    'app/partials/search',
    'jquery'
], function(
    tplStr,
    dumbStyle,
    search,
    $
){
'use strict';

    var exports = {};
    var aniBusy;
    var inited;
    var $view;
    var $input;

    var main = function() {

        exports.isInited = function() {
            return inited;
        };
        exports.init   = init;
        exports.show   = _handlers.show;
        exports.hide   = _handlers.hide;
        exports.getDom = geDom;
    };

    var init = function( container ) {

        $view = $( tplStr )
        $view.prependTo( container );
        $input = $( '[name=q]', $view );

        _listen();

        inited = true;
    };

    var geDom = function() {

        return $view;
    };

    var _handlers = {

        show: function( cb, notani ) {

            if( $view.data( 'folded' ) ) return;
            _listeners.toggle( null, cb, notani );
        },

        hide: function( cb, notani ) {

            if( !$view.data( 'folded' ) ) return;
            _listeners.toggle( null, cb, notani );
        }
    };

    var _listen = function() {

        $( 'button', $view ).click( _listeners.toggle );
        $( '#search', $view ).click( _listeners.search );
    };

    var _listeners = {

        toggle: function( e, cb, notani ) {

            var isFold     = $view.data( 'folded' );
            var $menu      = $( '.navbar-collapse', $view );

            if ( notani ) {

                $view.data( 'folded', !isFold );
                $menu.height( !isFold ? $menu[0].scrollHeight : 0  );
                return;
            }

            if ( aniBusy ) return;

            aniBusy = true;

            $menu.animate(
                { height: !isFold ? $menu[0].scrollHeight : 0 },
                350,
                'swing',
                function() {
                    aniBusy = false;
                    $view.data( 'folded', !isFold );
                    typeof cb == 'function' && cb.call( $view );
                }
            );
        },

        search: function() {

            search.show();
        }
    };

    main();

    return exports;
});