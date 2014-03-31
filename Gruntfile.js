module.exports = function(grunt) {
  grunt.initConfig({

    pkg:    grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %>_-_V<%= pkg.version %>_-_<%= grunt.template.today("yyyy-mm-dd") %> */\n',

    cram: {

      options: {
        grok:        'src/main.js',
        appRoot:     'src',
        output:      'dist/main.js',
        includes:    ['curl/plugin/js']
      }

    }

  });

  grunt.loadTasks('./tasks');

  grunt.registerTask('build', ['cram']);
};