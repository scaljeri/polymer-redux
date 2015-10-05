var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();

var b = require('browserify')();

// Transpile all JS to ES5.
gulp.task('js', function () {
 return gulp.src(['app/**/*.{js,html}'])
   .pipe($.sourcemaps.init())
   .pipe($.if('*.html', $.crisper())) // Extract JS from .html files
   .pipe($.if('*.js', $.babel()))
   .pipe($.sourcemaps.write('.'))
   .pipe(gulp.dest('.tmp/'))
   .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['js'], function () {
    gulp.watch(['app/**/*.{js,html}'], ['js']);
});

gulp.task('test', ['js'], function () {
    b.transform('polymerize');
    b.add('./app/js/stock-app.js')
    b.bundle().pipe(process.stdout);
});

