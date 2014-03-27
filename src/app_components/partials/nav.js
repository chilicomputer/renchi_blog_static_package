define([
    'text!app/tpls/nav.html',
    'app/utils/transition',
    'theme/nav',
    'jquery'
], function(
    tplStr,
    transition,
    dumbStyle,
    $
){
'use strict';

    var exports = {};
    var aniBusy;
    var inited;
    var $view;

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

        _listen();

        inited = true;
    };

    var geDom = function() {

        return $view;
    };

    var _handlers = {

        show: function( cb ) {

            if( $view.data( 'folded' ) ) return;
            _listeners.toggle( null, cb );
        },

        hide: function( cb ) {

            if( !$view.data( 'folded' ) ) return;
            _listeners.toggle( null, cb );
        }
    };

    var _listen = function() {

        $( 'button', $view ).click( _listeners.toggle );
    };

    var _listeners = {

        toggle: function( e, cb ) {

            if ( aniBusy ) return;

            var isFold     = $view.data( 'folded' );
            var $menu      = $( '.navbar-collapse', $view );

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
        }
    };

    main();

    return exports;
});