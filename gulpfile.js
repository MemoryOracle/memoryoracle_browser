"use strict";
var gulp = require('gulp');
var gutil = require('gulp-util');
var debug = require('gulp-debug');
var sass = require('gulp-sass');
var traceur = require('gulp-traceur');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var del = require('del');
var vinyl_paths = require('vinyl-paths');

var GLOBAL_SOURCE = "memoryoracle_webui/www";
var GLOBAL_DEST = "build/www";
var TARGET = "es5";

var BUILD_PHASES = [
   [
      "clean"
   ],
   [
      "react",
      "javascript",
      "html",
      "libraries"
   ],
]

var TASKS = {
   clean: function() {
      var RELPATH = ["/", "**/*.*"];
      var SOURCE = GLOBAL_SOURCE + RELPATH[0] + RELPATH[1];
      var DEST = GLOBAL_DEST + RELPATH[0];
      return gulp.src(DEST, {read: false})
         .pipe(vinyl_paths(del));
   },
   react: function() {
      var RELPATH = ["/js/jsx/", "**/*.jsx"];
      var SOURCE = GLOBAL_SOURCE + RELPATH[0] + RELPATH[1];
      var DEST = GLOBAL_DEST + RELPATH[0];
      return gulp.src(SOURCE)
         .pipe(plumber())
         .pipe(watch(SOURCE))
         .pipe(debug({title: "react"}))
         .pipe(react({harmony: true, target: TARGET}))
         .pipe(sourcemaps.init())
         // .pipe(uglify())
         .pipe(sourcemaps.write())
         .pipe(plumber.stop())
         .pipe(gulp.dest(DEST));
   },
   javascript: function() {
      var RELPATH = ["/js/", "**/*.js"];
      var SOURCE = GLOBAL_SOURCE + RELPATH[0] + RELPATH[1];
      var DEST = GLOBAL_DEST + RELPATH[0];
      return gulp.src([traceur.RUNTIME_PATH, SOURCE])
         .pipe(plumber())
         .pipe(watch(SOURCE))
         .pipe(debug({title: "javascript"}))
         .pipe(sourcemaps.init())
         .pipe(traceur())
         .pipe(uglify())
         .pipe(sourcemaps.write())
         .pipe(plumber.stop())
         .pipe(gulp.dest(DEST));
   },
   html: function() {
      var RELPATH = ["/html/", "**/*.html"];
      var SOURCE = GLOBAL_SOURCE + RELPATH[0] + RELPATH[1];
      var DEST = GLOBAL_DEST + RELPATH[0];
      return gulp.src(SOURCE)
         .pipe(plumber())
         .pipe(watch(SOURCE))
         .pipe(debug({title: "html"}))
         .pipe(sourcemaps.init())
         .pipe(sourcemaps.write())
         .pipe(plumber.stop())
         .pipe(gulp.dest(DEST));
   },
   libraries: function() {
      var RELPATH = ["/lib/", "**/*"];
      var SOURCE = GLOBAL_SOURCE + RELPATH[0] + RELPATH[1];
      var DEST = GLOBAL_DEST + RELPATH[0];
      return gulp.src(SOURCE)
         .pipe(plumber())
         .pipe(watch(SOURCE))
         .pipe(debug({title: "libraries"}))
         .pipe(sourcemaps.init())
         .pipe(uglify())
         .pipe(sourcemaps.write())
         .pipe(plumber.stop())
         .pipe(gulp.dest(DEST));
   },
};

function build_in_phases() {
   for (var i = 0; i < BUILD_PHASES.length; i++) {
      for (var j in BUILD_PHASES[i]) {
         if( i == 0 ){
            gulp.task(BUILD_PHASES[i][j], TASKS[BUILD_PHASES[i][j]]);
         } else {
            gulp.task(BUILD_PHASES[i][j], BUILD_PHASES[i - 1], TASKS[BUILD_PHASES[i][j]]);
         }
      }
   }
}

build_in_phases();
gulp.task('default', BUILD_PHASES.slice(-1)[0]);
