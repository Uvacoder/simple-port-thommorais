var gulp      = require('gulp'),
    concat    = require('gulp-concat'),
    babel     = require('gulp-babel')
    browserSync = require('browser-sync'),
    uglify      = require('gulp-uglify');
var minify = require('gulp-minify');


gulp.task('js', function(){
  return gulp.src('assets/javascripts/**/*.js')
    // .pipe(babel({
    //   ignore: 'gulpfile.babel.js'
    // }))
    // .pipe(minify())
    .pipe(concat('all.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('public/'))
})


gulp.task('server', function(){

  browserSync.init({
    server: {}
  })

  gulp.watch(['public/*.css','public/*.js','*.html']).on('change', browserSync.reload)

})


gulp.task('default',['js','server'], function(){
  gulp.watch('assets/javascripts/**/*.js', ['js'])
})
