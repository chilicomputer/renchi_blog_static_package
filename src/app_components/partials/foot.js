define([
    'text!app/tpls/foot.html',
    'theme/foot',
    'jquery'
], function(
    footTplStr,
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
    var $foot;

    var main = function() {

        exports.init   = init;
        exports.getDom = getDom;
    };

    var init = function( container ) {

        $foot = $( footTplStr ).appendTo( container );
    };

    var getDom = function() {

        return $foot;
    };

    main();

    return exports;
});