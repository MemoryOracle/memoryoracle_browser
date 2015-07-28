module.exports = function(grunt) {

   // Project configuration.
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      jsdoc: {
         dist: {
            src: ['memoryoracle_webui/www/static/js/'],
            options: {
               configure: '/home/dnoland/MemoryOracle/webui/conf.json',
               jsdoc: '/usr/bin/jsdoc',
            },
         },
      },
   });

   grunt.loadNpmTasks('grunt-jsdoc');



   grunt.registerTask('default', ['jsdoc']);

};
