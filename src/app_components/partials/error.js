define([
    'theme/error',
    'jquery'
], function(
    dumbStyle,
    $
){
'use strict';

    /**
     * title
     * @created date
     * @author chillicomputer@gmail.com
     */

    var exports = {};
    var $viewDom;

    var main = function() {

        exports.init = init;
        exports.render = render;
    };

    var init = function( container ) {

        $viewDom = $( container );
    };

    var render = function( msg ) {

        $viewDom.html( '<section class="error"><h1>糟糕，程序出现了问题。</h1><span class="icon confuse"></span>'+ msg + '</section>' );
    };

    main();

    return exports;
});