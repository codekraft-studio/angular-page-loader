module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        stripBanners: true,
        banner: '/* <%= pkg.name %> - v<%= pkg.version %> by <%= pkg.author %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
      },
      dist: {
        src: ['src/<%= pkg.name %>.module.js', 'src/<%= pkg.name %>.*.js'],
        dest: 'dist/<%= pkg.name %>.js',
      }
    },

    uglify: {
      options: {
        mangle: false,
        banner: '/* <%= pkg.name %> - v<%= pkg.version %> by <%= pkg.author %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      my_target: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.registerTask('default', ['concat', 'uglify']);

};
