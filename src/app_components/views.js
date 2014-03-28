define([
    /* partials */
    'app/partials/page',
    'app/partials/nav',
    'app/partials/foot',
    'app/partials/loader',
    'app/partials/error',
    'app/partials/tags',
    'app/partials/post',
    'app/partials/about',
    'app/partials/gotop',
    /* model */
    'app/model',
    /* otherr */
    'app/utils/uid',
    /* jquery*/
    'jquery'
], function(
    page,
    nav,
    foot,
    loader,
    error,
    tags,
    post,
    about,
    gotop,
    model,
    uid,
    $
){
'use strict';

    var exports     = {};
    var viewRootDom = $( '[app-view-outer]' );
    var viewDom     = $( '[app-view]' );
    var _viewQueues = {};
    var _firstScreenReady;
    var _timer;
    var _loading;

    var main = function() {

        _listen();

        $.extend( exports, routeHandlers );
        exports.rootDom = viewRootDom;
    };

    var _listen = function() {

        window.onresize = _listeners.setViewportSize;
        window.onorientationchange = _listeners.setViewportSize;
    };

    var _listeners = {

        setViewportSize: function() {

            viewDom.css( 'minHeight', window.innerHeight - foot.getDom()[0].offsetHeight );
        }
    };

    /**
     * helpers
     */
    var _showLoading = function() {

        _loading = true;
        _firstScreenReady && viewRootDom.addClass( 'fog' );
        _firstScreenReady && loader.show( document.body );
    };

    var _hideLoading = function() {

        _timer && clearTimeout( _timer );

        _timer = setTimeout( function() {
            _loading = false;
            viewRootDom.removeClass( 'fog' );
            loader.hide();
        }, 500 );
    };
    /**
     * view function's decorators
     */

    var _initFirstScreen = function( viewFunc ) {

        if ( !_firstScreenReady ) {

            _firstScreenReady = true;

            nav.init( viewRootDom );
            foot.init( viewRootDom );
            error.init( viewDom );
            tags.init( viewDom );
            page.init( viewDom );
            post.init( viewDom );
            about.init( viewDom );

            // if spinner keep animating, the mask can't do transtion
            $( '#spinner' ).removeClass( 'ani' );

            _listeners.setViewportSize();

            setTimeout( function() {
                $( '.views' ).addClass( 'rise' );
            }, 50 );

            setTimeout( function() {
                $( '.pic' ).addClass( 'fall' );
            }, 250 );
        }

        viewFunc.apply( null );
    };

    var _collapseNav = function( viewFunc ) {

        window.scrollTo( 0, 0 );

        viewFunc.apply();
        _loading && _hideLoading();
        setTimeout( function() {

            nav.isInited() && nav.hide();
        }, _loading ? 500 : 0 );
    };

    var _flushViews = function( dataOrPromise, viewFunc ) {

        var _qid;
        for ( _qid in _viewQueues ) {

            if ( _viewQueues.hasOwnProperty( _qid ) ) {

                _viewQueues[ _qid ]._request.canceled = true;
                delete _viewQueues[ _qid ];
            }
        }

        if ( dataOrPromise && dataOrPromise.then ) {
            // it's a promise
            dataOrPromise
                .then( function( res ) {

                    viewFunc.apply( null, [ 0, res ] );

                }, function( res ) {

                    if ( res.request && res.request.canceled ) return;
                    viewFunc.apply( null, [ res ] );

                })
                .then( function() {

                    // remove from queues
                    delete _viewQueues[ dataOrPromise._qid ];
                });
            // dataOrPromise._request.canceled = true;
            // queue the promise
            dataOrPromise._qid = uid();
            _showLoading();
            _viewQueues[ dataOrPromise._qid ] = dataOrPromise;
        }

        else {
            // it's a data already
            viewFunc.apply( null, [ 0, dataOrPromise ] );
        }
    };

    var _ifError = function( viewFunc ) {

        try {

            viewFunc.apply( null );
        }

        catch( e ) {

            if ( e.message == model.errorCode[ 'NOT_FOUND' ] ) {

                routeHandlers.notfound();
            }

            else {

                throw e;
            }
        }
    };

    /**
     * Router Handlers
     */

    var routeHandlers = {

        index: function() {

            console.log( 'index' );
            routeHandlers.page( 0 );
        },

        page: function( index ) {

            console.log( '?page=' + index );

            _ifError( function() {

                _flushViews( model.getListsByPage( index ), function( err, data ) {

                    _collapseNav( function() {

                        _initFirstScreen( function() {

                            if ( !err ) page.render( data );

                            else {

                                routeHandlers.error( err );
                            }
                       });
                   });
               });
           });
        },

        post: function( slug ) {

            console.log( '?post=' + slug );

            _ifError( function() {

                _flushViews( model.getPost( slug ), function( err, data ) {

                    _collapseNav( function() {

                        _initFirstScreen( function() {

                            if ( !err ) post.render( data );

                            else {

                                routeHandlers.error( err );
                            }
                        });
                    });
                });
            });
        },

        tags: function() {

            console.log( 'tag show' );

            _ifError( function() {

                _flushViews( model.getTags(), function( err, data ) {

                    _collapseNav( function() {

                        _initFirstScreen( function() {

                            if ( !err ) tags.render( data );

                            else {

                                routeHandlers.error( err );
                            }
                        });
                    });
                });
            });
        },

        tag: function( slug ) {

            console.log( '?tag='+ slug );

            _ifError( function() {

                _flushViews( model.getListsByTag( slug ), function( err, data ) {

                    _collapseNav( function() {

                        _initFirstScreen( function() {

                            if ( !err ) page.render( data );

                            else {

                                routeHandlers.error( err );
                            }
                        });
                    });
                });
            });
        },

        about: function() {

            console.log( 'about' );


            _flushViews( null, function( err, data ) {

                _collapseNav( function() {

                    _initFirstScreen( function() {

                        about.render();
                    });
                });
            });
        },

        search: function( key ) {

            console.log( '?q=' + key );
        },

        notfound: function() {

            console.log('404' + location.hash);
            routeHandlers.error( location.hash + ' not found' );
        },

        error: function( msg ) {

            _flushViews( null, function() {

                _collapseNav( function() {

                    _initFirstScreen( function() {

                        error.render( msg || '未知错误' );
                    });
                });
            });
        }
    };

    main();
    return exports;
});