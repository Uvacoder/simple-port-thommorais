var gulp      = require('gulp'),
    print   = require('gulp-print'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel')
    browserSync = require('browser-sync');

gulp.task('js', function(){
  gulp.src('assets/javascripts/**/*.js')
    .pipe(concat('all.js'))
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
