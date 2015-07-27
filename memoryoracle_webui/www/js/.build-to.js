gulp = require("gulp");
sourcemaps = require("gulp-sourcemaps");
traceur = require("traceur");
path = require("path");

_cwd = __dirname;

module.exports = gulp.task("javascript", function() {
   gulp.src(_cwd + "/**.js")
      .pipe(soucemaps.init())
      .pipe(traceur())
      .pipe(sourcemaps.write())
      .pipe(_cwd)
});
