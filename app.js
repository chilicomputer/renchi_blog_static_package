var express = require( 'express' );
var app     = express();

app.get( '/src/*', function( req, res, next ) {

    req.url = req.url.replace( '/src', '' );
    next();
});

app.use( express['static']( './dist' ) );
app.use( express['static']( './src' ) );

app.listen( 80 );