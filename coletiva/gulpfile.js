var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');

var reload = browserSync.reload;

var src = {
    html: './',
    js: 'assets/javascripts/**/*.js',
    scss: 'assets/stylesheets/style.scss',
    dist: 'public/'
};

// Compile JS into
gulp.task('js', function() {

    gulp.src(src.js)
        .pipe(concat('main.js'))
        // .pipe(uglify())
        // .pipe(babel({
        //     presets: ['babili']
        // }))
        .pipe(gulp.dest('public/'))
})

// Compile sass into CSS
gulp.task('sass', function() {

  return gulp.src(src.scss)
    .pipe(sass({
        includePaths: ['styles']
    }))
    .on('error', sass.logError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(src.dist))

})


// Static Server + watching scss/html files
gulp.task('server', function() {

    browserSync.init({server: "./"})
    gulp.watch(['public/*.css', 'public/*.js']).on('change', browserSync.reload)
})

// default
gulp.task('default', ['js', 'server'], function() {

    gulp.watch('assets/javascripts/**/*.js', ['js'])
    gulp.watch('assets/stylesheets/**/*.scss', ['sass'])
})
