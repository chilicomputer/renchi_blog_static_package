module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({

    pkg:    grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %>_-_V<%= pkg.version %>_-_<%= grunt.template.today("yyyy-mm-dd") %> */\n',

    cram: {

      options: {
        grok:        'src/main.js',
        appRoot:     'src',
        output:      'dist/tmp/main.js',
        includes:    ['curl/plugin/js']
      }

    },

    clean: {

      before: ['dist'],
      after: ['dist/tmp']
    },

    copy: {

      main: {

        files: [

          {
            src:     ['src/res/*'],
            dest:    'dist/res/',
            flatten: true,
            expand: true
          }
        ]
      }
    },

    cssmin: {

      minify: {

        src: [ 'src/base.css' ],
        dest: 'dist/',
        flatten: true,
        expand: true
      }
    },

    uglify: {

      options: {

        compress: {

          drop_console: true
        }
      },

      curljs: {

        files: {
          'dist/curl.js': ['src/curl.js']
        }
      },

      mainjs: {

        files: {
          'dist/main.js': ['dist/tmp/main.js']
        }
      }
    }

  });

  grunt.loadTasks( './tasks' );

  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );

  grunt.registerTask( 'default', ['clean:before', 'copy', 'cssmin', 'uglify:curljs', 'cram', 'uglify:mainjs', 'clean:after'] );
};