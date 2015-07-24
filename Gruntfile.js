module.exports = function(grunt) {

   // Project configuration.
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      uglify: {
         options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
         },
         build: {
            src: '<%= pkg.name %>/src/js/es5/<%= pkg.name %>.js',
            dest: '<%= pkg.name %>/build/js/es5/<%= pkg.name %>.min.js'
         }
      },
      traceur: {
         options: {
            experimental: true,

            moduleNaming: {
               stripPrefix: "<%= pkg.name %>/src/js/es5",
               addPrefix: "<%= pkg.name %>"
            },
            copyRuntime: '<%= pkg.name %>/build/js/es5'
         },
         custom: {
            files: [{
               expand: true,
               cwd: '<%= pkg.name %>/src/js/es6',
               src: ['*.js'],
               dest: '<%= pkg.name %>/src/js/es5'
            }]
         },
      },
   });


   grunt.loadNpmTasks('grunt-contrib-uglify');

   grunt.registerTask('default', ['uglify']);

};
