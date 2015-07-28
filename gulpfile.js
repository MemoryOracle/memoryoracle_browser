/* @flow */
"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var debug = require('gulp-debug');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var del = require('del');
var vinyl_paths = require('vinyl-paths');
var babel = require('gulp-babel');

var GLOBAL_SOURCE = "memoryoracle_webui/www/static";
var GLOBAL_DEST = "build/www";
var TARGET = "es5";

var BUILD_TYPE = "development";

var BUILD_PHASES = [
   [
      "clean"
   ],
   [
      "react",
      "javascript",
      // "mainjs",
      "html",
      "libraries"
   ],
];

var MAIN_JS = GLOBAL_SOURCE + '/js/main.js';
var MAIN_JS_DEST = GLOBAL_DEST + '/js/';

var BABEL_OPTIONS = {
   plugins: ["babel-plugin-typecheck", "babel-plugin-type-assertion"],
   // plugins: ["babel-plugin-typecheck"],
   comments: true,
   // plugins: ["babel-plugin-type-assertion"],
   // blacklist: ["babel-plugin-flow-comments"],
   modules: "ignore",
};

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
         .pipe(sourcemaps.init())
         .pipe(babel(/*BABEL_OPTIONS*/))
         .pipe(react({harmony: true, target: TARGET}))
         .pipe(BUILD_TYPE === "development" ? gutil.noop() : uglify())
         .pipe(sourcemaps.write())
         .pipe(plumber.stop())
         .pipe(gulp.dest(DEST));
   },
   javascript: function() {
      var RELPATH = ["/js/", "**/*.js"];
      var SOURCE = GLOBAL_SOURCE + RELPATH[0] + RELPATH[1];
      var DEST = GLOBAL_DEST + RELPATH[0];
      var EXCLUDE = ["!" + MAIN_JS];
      return gulp.src([SOURCE].concat(EXCLUDE))
         .pipe(plumber())
         .pipe(watch(SOURCE))
         .pipe(debug({title: "javascript"}))
         .pipe(sourcemaps.init())
         .pipe(babel(/*BABEL_OPTIONS*/))
         .pipe(BUILD_TYPE === "development" ? gutil.noop() : uglify())
         .pipe(sourcemaps.write())
         .pipe(plumber.stop())
         .pipe(gulp.dest(DEST));
   },
   mainjs: function() {
      // var MAINJS_TRACEUR_OPTIONS = JSON.parse(JSON.stringify(TRACEUR_OPTIONS));
      var MAINJS_BABEL_OPTIONS = JSON.parse(JSON.stringify(BABEL_OPTIONS));
      // MAINJS_TRACEUR_OPTIONS.script = true;
      MAINJS_BABEL_OPTIONS.modules = "ignore";
      return gulp.src(MAIN_JS)
         .pipe(plumber())
         .pipe(watch(MAIN_JS))
         .pipe(debug({title: "javascript"}))
         .pipe(sourcemaps.init())
         .pipe(babel(MAINJS_BABEL_OPTIONS))
         .pipe(BUILD_TYPE === "development" ? gutil.noop() : uglify())
         .pipe(sourcemaps.write())
         .pipe(plumber.stop())
         .pipe(gulp.dest(MAIN_JS_DEST));
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
         .pipe(BUILD_TYPE === "development" ? gutil.noop() : uglify())
         .pipe(sourcemaps.write())
         .pipe(plumber.stop())
         .pipe(gulp.dest(DEST));
   },
};

function build_in_phases() {
   for (var i = 0; i < BUILD_PHASES.length; i++) {
      for (var j in BUILD_PHASES[i]) {
         if( i === 0 ){
            gulp.task(BUILD_PHASES[i][j], TASKS[BUILD_PHASES[i][j]]);
         } else {
            gulp.task(BUILD_PHASES[i][j], BUILD_PHASES[i - 1], TASKS[BUILD_PHASES[i][j]]);
         }
      }
   }
}

build_in_phases();
gulp.task('default', BUILD_PHASES.slice(-1)[0]);
