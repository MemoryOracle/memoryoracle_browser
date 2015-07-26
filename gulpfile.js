var gulp = require('gulp');
var sass = require('gulp-sass');
var traceur = require('gulp-traceur');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var GLOBAL_SOURCE = "memoryoracle_webui/www";
var GLOBAL_DEST = "build/www";

gulp.task('javascript', function() {
   var RELPATH = ["/js/", "**/*.js"];
   var SOURCE = GLOBAL_SOURCE + RELPATH[0] + RELPATH[1];
   var DEST = GLOBAL_DEST + RELPATH[0];
   return gulp.src([traceur.RUNTIME_PATH, SOURCE])
      .pipe(sourcemaps.init())
      .pipe(traceur())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(DEST));
});

gulp.task('html', function() {
   var RELPATH = ["/html/", "**/*.html"];
   var SOURCE = GLOBAL_SOURCE + RELPATH[0] + RELPATH[1];
   var DEST = GLOBAL_DEST + RELPATH[0];
   return gulp.src(SOURCE)
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(DEST));
});

gulp.task("libraries", function() {
   var RELPATH = ["/lib/", "**/*"];
   var SOURCE = GLOBAL_SOURCE + RELPATH[0] + RELPATH[1];
   var DEST = GLOBAL_DEST + RELPATH[0];
   return gulp.src(SOURCE)
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(DEST));
})

gulp.task('default', ['javascript', 'html', 'libraries']);
