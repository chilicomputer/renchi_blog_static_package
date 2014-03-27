define([
    'text!app/tpls/postList.html',
    'theme/postList',
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

        exports.init   = init;
        exports.render = render;
    };

    var init = function( view ) {

        $view = $( view );
    };

    var render = function( data ) {

        $view.html( tpl( data ) );
    };

    main();
    return exports;
});