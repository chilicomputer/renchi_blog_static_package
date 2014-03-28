var express = require( 'express' );
var app     = express();
var type    = process.argv[2];

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