var $,
    fs   = require('fs'),
    del  = require('del'),
    gulp = require('gulp'),
    path = require('path'),
    vinylPaths = require('vinyl-paths'),
    gulpLoadPlugins = require('gulp-load-plugins');

$    = gulpLoadPlugins();

gulp.task('default', ['copy', 'js', 'inject-css']);

// Transpile all JS to ES5.
gulp.task('js', function () {
  gulp.src(['app/**/*.{js,html}'])
      .pipe($.sourcemaps.init())
      .pipe($.if('*.html', $.crisper())) // Extract JS from .html files
      .pipe($.if('*.js', $.babel()))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('.tmp/'))
      .pipe(gulp.dest('dist/'));
});

gulp.task('watch', ['copy', 'js', 'inject-css'], function () {
  gulp.watch(['app/**/*.{js,html}'], ['js']);
  gulp.watch(['app/scss/*.scss'], ['inject-css']);
});

gulp.task('sass', function () {
  gulp.src('./app/scss/**/*.scss')
      .pipe($.sass().on('error', $.sass.logError))
      .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy', function () {
  gulp.src('assets/img/*.*')
      .pipe(gulp.dest('./dist/img'));
});

var clean = require('gulp-clean');

gulp.task('inject-css', ['js', 'sass'], function () {
  gulp.src('dist/html/**/*.html')
      .pipe($.tap(function (file, t) {
        var filename = path.basename(file.path).replace(/html$/, 'css');

        return gulp.src(file.path)
            .pipe($.replace(/\/\* inject:css \*\//, function () {
                  var style = fs.readFileSync('./dist/css/' + filename, 'utf8');
                  return style;
                }))
            .pipe(clean())
            //.pipe(vinylPaths(del.sync))
            .pipe(gulp.dest('./dist/html'));
      }));
});
