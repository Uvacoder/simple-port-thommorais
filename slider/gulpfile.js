var gulp = require('gulp')
var uglify = require('gulp-uglify')
var babel = require('gulp-babel')
var concat = require('gulp-concat')
var sass = require('gulp-sass')
var cleanCSS = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps')
var browserSync = require('browser-sync').create()
var reload = browserSync.reload
var neat = require('node-neat').includePaths

var src = {
    html: './',
    js: 'assets/javascripts/**/*.js',
    scss: 'assets/stylesheets/style.scss',
    dist: 'public/'
}

gulp.task('scripts', function () {
  return gulp.src([src.js])
    .pipe(babel({
      ignore: 'gulpfile.babel.js'
    }))
    //.pipe(uglify())      
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest(src.dist))
})

// Compile sass into CSS
gulp.task('sass', function() {

  return gulp.src(src.scss)
    .pipe(sass({
        includePaths: ['styles'].concat(neat)
    }))
    .on('error', sass.logError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(src.dist))

})


// Static Server + watching css/html files
gulp.task('server', function() {

    browserSync.init({server: "./"})
    gulp.watch(['*.html' ,'public/*.css', 'public/*.js']).on('change', browserSync.reload)
})

// default
gulp.task('default', ['sass', 'scripts', 'server'], function() {
    gulp.watch('assets/javascripts/**/*.js', ['scripts'])
    gulp.watch('assets/stylesheets/**/*.scss', ['sass'])
})
