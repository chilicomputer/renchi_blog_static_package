define([
    'rest',
    'rest/interceptor/mime',
    'jquery'
], function(
    rest,
    mime,
    $
){
'use strict';

    var exports       = {};
    var pageCache     = {};
    var postCache     = {};
    var tagPageCache = {};
    var tagsCache     = null;

    var RES_PAGES = '/pages/';
    var RES_TAGS  = '/tags/';
    var RES_POST  = '/post/';
    var RES_QUERY = '/search/';


    var total     = APP_CONFIG.total;
    var perPage   = APP_CONFIG.posts_per_page;
    var totalPage = Math.ceil( total/perPage ) - 1;

    var $agent    = $({});

    var ERROR_CODE = {

        NOT_FOUND: '4'
    };

    var _parseRespError = function( res ) {

        return 'app::' + ( res.entity.msg || res.status.text || '未知错误' );
    };

    var _parseNetError = function( res ) {

        return 'server::' + ( res.error == 'loaderror' ? '网络错误' : ( Number( res.status.code ) || '未知错误' ) );
    };

    var _fetchData = function( request ) {

        var asyncData = rest
            .chain( mime )( $.extend( request, { headers: { 'X-Requested-With': 'XMLHttpRequest' } } ) )
            .then( function( res ) {

                $agent.trigger( 'whenrest' );

                if ( res.status.code == 200 ) {

                    return res.entity;
                }

                else {

                    throw _parseRespError( res );
                }
            }, function( res ) {

                $agent.trigger( 'whenrest' );

                throw _parseNetError( res );
            });

        $agent.trigger( 'beforerest' );
        asyncData._request = request;
        return asyncData;
    };

    var main = function() {

        exports.getListsByPage  = getListsByPage;
        exports.getListsByQuery = getListsByQuery;
        exports.getListsByTag   = getListsByTag;
        exports.getTags         = getTags;
        exports.getPost         = getPost;
        exports.watch           = watch;
        exports.errorCode       = ERROR_CODE;
    };

    var getListsByPage = function( page ) {

        page = Number( page );

        if ( page > totalPage ) throw new Error( ERROR_CODE.NOT_FOUND );
        if ( pageCache[page] ) {

            return {

                posts: pageCache[page],
                prev: page > 0 ? page - 1 : null,
                next: page < totalPage ? page + 1 : null
            };
        }

        var promise = _fetchData( { path: RES_PAGES + page } );
        var anotherPromise = promise.then( function( data ) {

            pageCache[page] = data;
            return getListsByPage( page );
        });

        anotherPromise._request = promise._request;

        return anotherPromise;
    };

    var getPost = function( slug ) {

        if ( !slug ) throw new Error( ERROR_CODE.NOT_FOUND );
        if ( postCache[ slug ] ) return postCache[ slug ];

        var promise = _fetchData( { path: RES_POST + slug } );
        var anotherPromise = promise.then( function( data ) {

            postCache[ slug ] = data;
            return getPost( slug );
        });

        anotherPromise._request = promise._request;

        return anotherPromise;
    };

    var getTags = function() {

        if ( tagsCache ) { return tagsCache; }

        var promise = _fetchData( { path: RES_TAGS } );
        var anotherPromise = promise.then( function( data ) {

            tagsCache = data;
            return getTags();
        });

        anotherPromise._request = promise._request;

        return anotherPromise;
    };

    var getListsByTag = function( slug ) {

        if ( !slug ) throw new Error( ERROR_CODE.NOT_FOUND );
        if ( tagPageCache[ slug ] ) {

            return {

                tag:   decodeURIComponent( slug ),
                posts: tagPageCache[ slug ],
                prev:  null,
                next:  null
            };
        }

        var promise = _fetchData( { path: RES_TAGS + slug } );

        var anotherPromise = promise.then( function( data ) {

            tagPageCache[ slug ] = data;
            return getListsByTag( slug );
        });

        anotherPromise._request = promise._request;

        return anotherPromise;
    };

    var getListsByQuery = function( q ) {

        if ( !q ) throw new Error( ERROR_CODE.NOT_FOUND );

        var promise = _fetchData( { path: RES_QUERY + q } );

        var anotherPromise = promise.then( function( data ) {

            return {

                query: decodeURIComponent( q ),
                posts: data,
                prev: null,
                next: null
            };
        });

        anotherPromise._request = promise._request;

        return anotherPromise;
    };

    var watch = function( event, handler ) {

        $agent.bind( event, handler );
    };

    main();
    return exports;
});