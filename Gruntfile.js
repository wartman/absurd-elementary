module.exports = function(grunt){

  grunt.initConfig({
    absurd: {
      task: {
        src: __dirname + "/test/absurd/index.js",
        dest: __dirname + "/test/style.css"
      }
    }
  });

  grunt.loadNpmTasks('grunt-absurd');

  grunt.registerTask('default', 'absurd');
  
}