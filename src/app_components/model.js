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

    var RES_PAGES    = '/pages/';
    var RES_TAGS     = '/tags/';
    var RES_POST     = '/post/';


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
            .chain( mime )( request )
            .then( function( res ) {

                $agent.trigger( 'whenrest' );

                if ( res.status.code == 200 ) {

                    return res.entity;
                }

                else {

                    throw _parseNetError( res );
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

        exports.getListsByPage = getListsByPage;
        exports.getListsByTag  = getListsByTag;
        exports.getTags        = getTags;
        exports.getPost        = getPost;
        exports.watch          = watch;
        exports.errorCode      = ERROR_CODE;
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

        return _fetchData( { path: RES_PAGES + page } ).then( function( data ) {

            pageCache[page] = data;
            return getListsByPage( page );
        });
    };

    var getPost = function( slug ) {

        if ( !slug ) throw new Error( ERROR_CODE.NOT_FOUND );
        if ( postCache[ slug ] ) return postCache[ slug ];

        return _fetchData( { path: RES_POST + slug } ).then( function( data ) {

            postCache[ slug ] = data;
            return getPost( slug );
        });
    };

    var getTags = function() {

        if ( tagsCache ) { return tagsCache; }

        return _fetchData( { path: RES_TAGS } ).then( function( data ) {

            tagsCache = data;
            return getTags();
        });
    };

    var getListsByTag = function( slug ) {

        if ( !slug ) throw new Error( ERROR_CODE.NOT_FOUND );
        if ( tagPageCache[ slug ] ) {

            return {

                tag:   slug,
                posts: tagPageCache[ slug ],
                prev:  null,
                next:  null
            };
        }

        return _fetchData( { path: RES_TAGS + slug } ).then( function( data ) {

            tagPageCache[ slug ] = data;
            return getListsByTag( slug );
        });
    };

    var watch = function( event, handler ) {

        $agent.bind( event, handler );
    };

    main();
    return exports;
});