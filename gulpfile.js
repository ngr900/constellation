var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var del = require('del');
var useref = require('gulp-useref');
var runSequence = require('run-sequence');
var babel = require('gulp-babel')
var gulpIf = require('gulp-if');
var debug = require('gulp-debug');

var distDir = 'dist';

// DEVELOPMENT //

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
});

gulp.task('watch', ['browserSync'], function () {
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/*.js', browserSync.reload);
});

// PRODUCTION //

gulp.task('js-dist', function () {
    return gulp.src('app/js/constellation.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(distDir))
});

gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref({
            force: true
        }))
        .pipe(gulpIf('*.js', babel({
            presets: ['es2015']
        })))
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('docs'))
});

gulp.task('clean:dist', function () {
    return del.sync(distDir);
});

gulp.task('clean:docs', function () {
    return del.sync('docs');
});

// DEPLOYMENT //

gulp.task('build-dist', function (callback) {
    runSequence('clean:dist', ['js-dist'],
        callback
    )
})

gulp.task('build-docs', function (callback) {
    runSequence('clean:docs', ['useref'],
        callback
    )
})

gulp.task('build', function (callback) {
    runSequence('build-dist', 'build-docs',
        callback
    )
})

function swallowError(error) {
    console.log(error.toString())
    this.emit('end')
}