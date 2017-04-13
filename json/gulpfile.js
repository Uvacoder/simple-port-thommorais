var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

var sourcemaps = require('gulp-sourcemaps');

var reload = browserSync.reload;

var src = {
    html: './',
    js: 'js/*.js'
};

// Compile JS into
gulp.task('js', function() {
    gulp.src(src.js)
    .pipe(babel({
        // ignore: 'gulpfile.babel.js'
        "presets": ["es2015"]
    }))
    
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./'))
})




// Static Server + watching scss/html files
gulp.task('server', function() {

    browserSync.init({server: "./"})
    gulp.watch(['js/*.js']).on('change', browserSync.reload)
})

// default
gulp.task('default', ['js', 'server'], function() {

    gulp.watch('js/*.js', ['js'])
})
