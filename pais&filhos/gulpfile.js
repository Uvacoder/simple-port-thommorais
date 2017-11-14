var gulp   = require('gulp'),
    print  = require('gulp-print'),
    concat = require('gulp-concat'),
    babel  = require('gulp-babel')
    browserSync = require('browser-sync'),
    babelify = require('babelify');


  var paths = {
    dependencies: [
      // 'assets/javascripts/dependencies/jquery-ui.min.js',
      // 'assets/javascripts/dependencies/jquery.ui.touch-punch.min.js',
      // 'assets/javascripts/dependencies/html2canvas.js',
      // 'assets/javascripts/dependencies/canvas2image.js',
      // 'assets/javascripts/dependencies/jquery.ui.rotatable.min.js',
      'assets/javascripts/dependencies/swiper.js',
      'assets/javascripts/functions/*.js'
    ],

  };

gulp.task('js', function(){
  gulp.src(paths.dependencies)
    .pipe(concat('all.js'))
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('public/'))
})


gulp.task('server', function(){
  browserSync.init({

    server: {
      proxy: 'localhost/pais&filhos'
    }

  })

  gulp.watch(['public/*.css','public/*.js','*.html']).on('change', browserSync.reload)

})

gulp.task('default',['js','server'], function(){
  gulp.watch('assets/javascripts/**/*.js', ['js'])
})
