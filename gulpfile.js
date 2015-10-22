var $,
    fs = require('fs'),
    del = require('del'),
    gulp = require('gulp'),
    path = require('path'),
    runSequence = require('run-sequence'),
    gulpLoadPlugins = require('gulp-load-plugins');

$ = gulpLoadPlugins();

gulp.task('default', ['clean'], function () {
    runSequence('copy', 'js', 'inject-css');
});

gulp.task('clean', function () {
    del.sync('./dist/');
});

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

gulp.task('watch', ['copy', 'js', 'inject-css'], function() {
    return gulp.watch(['app/**/*.{js,html}', 'app/scss/*.scss'], function () {
        runSequence('clean', 'copy', 'js', 'inject-css');
    });
});

gulp.task('sass', function() {
    return gulp.src('./app/scss/**/*.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy', function() {
    return gulp.src('assets/img/*.*')
        .pipe(gulp.dest('./dist/img'));
});

var clean = require('gulp-clean');

gulp.task('inject-css', ['sass'], function() {
    return gulp.src('./dist/html/**/*.html', {base: './dist/html'})
        .pipe($.tap(function(file, t) {
            var filename = path.basename(file.path).replace(/html$/, 'css');

            return gulp.src(file.path, {base: './dist/html'})
                .pipe($.replace(/\/\* inject:css \*\//,
                    function() {
                        var style = fs.readFileSync('./dist/css/' + filename, 'utf8');
                        return style;
                    }))
                .pipe(clean())
                .pipe(gulp.dest('./dist/html'));
        }));
});
