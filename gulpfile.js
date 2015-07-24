var gulp = require('gulp');
var sass = require('gulp-sass');
var traceur = require('gulp-traceur');
var bob = require('bob');
// var yaml = require('js-yaml');
// var fs = require('fs');
var sourcemaps = require('gulp-sourcemaps');

// var uglify = require('gulp-uglify');
// var stream = require('stream-combiner2');

var mapper = bob();
gulp.task('javascript', function() {
   mapper.src('js')
      .pipe(sourcemaps.init())
      .pipe(traceur())
      .pipe(sourcemaps.write())
      .pipe(mapper.dest('js'));
});

gulp.task('html', function() {
   mapper.src('html')
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write())
      .pipe(mapper.dest('html'));
});

gulp.task('default', ['javascript', 'html']);
