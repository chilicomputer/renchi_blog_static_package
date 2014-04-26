define([
    'jquery'
], function(
    $

){
'use strict';

    var exports = {};

    var transitionEnd = function () {

        var el = document.createElement( 'div' );

        var transEndEventNames = {
            'transition':       'transitionend',
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition':    'transitionend',
            'OTransition':      'oTransitionEnd otransitionend'
        };

        for ( var name in transEndEventNames ) {

            if ( el.style[ name ] !== undefined ) {
                exports.vendor = name.replace( /transition/i, '' ).toLowerCase();
                return transEndEventNames[ name ];
            }
        }
        exports.vendor = null;
        return false;
    };


    $.fn.emulateTransitionEnd = function ( duration ) {

        var called = false;
        var $el = this;
        var callback = function () {
            if ( !called ) $( $el ).trigger( $.support.transition );
        };

        $( this ).one( $.support.transition, function () { called = true } );

        setTimeout( callback, duration );
        return this;
    };

    $( function () {
        $.support.transition = transitionEnd();
    });

    // return a numb
    return exports;
});