module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('cram', 'Cram runner for grunt', function() {

    var fail = function( ex ) {
      grunt.fail.warn( 'cram failed: ', ex && ex.message || ex );
      if ( ex && ex.stack ) console.log( ex.stack );
    };

    var done = this.async();

    var cram = require( 'cram/cram' );

    var options = this.options({

      appRoot: '',
      output:  '',
      configFiles: null,
      includes: [],
      excludes: []
    });

    cram( options ).then( done, fail );
  });
};