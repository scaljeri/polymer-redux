var gulp = require('gulp');
//var sass = require('gulp-sass');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();

var b = require('browserify')();

// Transpile all JS to ES5.
gulp.task('js', function() {
  return gulp.src(['app/**/*.{js,html}'])
    .pipe($.sourcemaps.init())
    .pipe($.if('*.html', $.crisper())) // Extract JS from .html files
    .pipe($.if('*.js', $.babel()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['copy', 'js', 'sass']);

gulp.task('watch', ['copy', 'js', 'sass'], function() {
  gulp.watch(['app/**/*.{js,html}'], ['js']);
  gulp.watch(['app/scss/*.scss'], ['sass']);
});

gulp.task('sass', function() {
  gulp.src('./app/scss/**/*.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy', function() {
  gulp.src('assets/img/*.*')
    .pipe(gulp.dest('./dist/img'));
});
