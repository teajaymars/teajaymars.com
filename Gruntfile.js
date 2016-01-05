module.exports = function(grunt){
  debug = false;

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  var myPkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: myPkg,
    clean: [
      "static/gen/",
    ],
    coffee: {
      app: {
        files: {
          "static/gen/app.js" : "app.coffee"
        },
        options: { 
          sourceMap: debug,
        }
      }
    },
    less: {
      app: {
        files: {
          "static/gen/app.css" : "app.less"
        },
        options: {
          sourceMap: debug,
          sourceMapFileInline: true,
          outputSourceFiles: true,
        }
      }
    },
    watch: {
      less: {
        files: "**/*.less",
        tasks: "less:app"
      },
      coffee: {
        files: "**/*.coffee",
        tasks: "coffee"
      }
    }
  });

  grunt.registerTask('default', [
    "clean",
    "less",
    "coffee"
  ]);
};
