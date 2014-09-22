var express = require( 'express' );
var app     = express();
var type    = process.argv[2];
var conf    = require( './config.json' );

app.use( function( req, res, next ) {

	var k, rule, redirect, reserved, displaced;

	for ( k in conf.rewrites ) {

		redirect = conf.rewrites[k];

		try {

			reserved = req.url.match( new RegExp( k ) );
			displaced = redirect.match( /\$\d/g );

			if ( !reserved ) throw '0';

			if ( !displaced ) {

				req.url = redirect;
				next();
			}

			else {

				displaced.forEach( function( value ) {

					var index = value.replace( '$', '' );

					if ( reserved[ index ] ) {

						redirect = redirect.replace( value,  reserved[ index ] );
					}

					else {

						throw '0';
					}
				});

				req.url = redirect;
				next();
			}
		}
		catch( e ) {

			continue;
		}
	}
	next();
});

if ( type == 'src' ) {

    app.use( function( req, res, next ) {

        res.header( 'Access-Control-Allow-Origin', '*' );
        next();
    });
    app.use( express['static']( './src' ) );
}

else {

    app.use( express['static']( './dist' ) );
}

app.listen( 80 );