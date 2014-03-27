define( function() {

    var vendor = [ 'ms', 'moz', 'webkit', 'o', '' ];

    var requestAnimationFrame,
        cancelAnimationFrame;

    for ( var len = vendor.length; len--; ) {

        var _v = vendor [len];

        var attrRequest = _v ? _v + 'RequestAnimationFrame' : _v + 'requestAnimationFrame',
            attrCancel  = _v ? _v + 'CancelAnimationFrame' : _v + 'cancelAnimationFrame';

        if ( window[attrRequest] ) {

            requestAnimationFrame = window[attrRequest];
            cancelAnimationFrame = window[attrCancel];
            break;
        }
    }

    var lastTime = 0;

    if ( !requestAnimationFrame ) {

        requestAnimationFrame = function( render ) {

            var currentTime = new Date().getTime();

            var timeToWait = Math.max( 0, 16 - ( currentTime - lastTime ) );

            var timer = setTimeout( function() {

                render.call( null, currentTime + timeToWait );

            }, timeToWait);

            lastTime = currentTime + timeToWait;

            return timer;
        };
    }

    if ( !cancelAnimationFrame ) {

        cancelAnimationFrame = function( timer ) {

            clearTimeout( timer );
        };
    }

    return {

        request: requestAnimationFrame,
        cancel:  cancelAnimationFrame
    };
});