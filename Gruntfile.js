module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // Copy.
    copy: {
      dev: {
        expand: true,
        cwd: 'assets/',
        src: 'js/**',
        dest: 'public/'
      }
    },

    // Sass.
    sass: {
      dev: {
        options: {
          sourceComments: true,
          outputStyle: 'expanded',
          imagePath: '../',
        },
        expand: true,
        cwd: 'assets/sass',
        src: ['**/*.scss'],
        dest: 'public/css',
        ext: '.css'
      },
    },

    // Watch.
    watch: {
      sass: {
        files: ['assets/sass/**/*.scss'],
        tasks: ['sass']
      },
      js: {
        files: ['assets/js/**/*.js'],
        tasks: ['copy']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: ['public/**/*']
      }
    }
  });

  grunt.registerTask('build', ['sass', 'copy']);
  grunt.registerTask('default', ['build', 'watch']);
};
