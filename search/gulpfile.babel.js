'use strict'

import gulp from 'gulp'
import sass from 'gulp-sass'
import minifycss from 'gulp-minify-css'
import autoprefixer from 'gulp-autoprefixer'
import sassGlob from 'gulp-sass-glob'
import sourcemaps from 'gulp-sourcemaps'
import concat from 'gulp-concat'
import babel from 'gulp-babel'
import uglify from'gulp-uglify'
import es from 'event-stream'
import merge from 'merge-stream'
import browserSync from 'browser-sync'
import pumbler from 'gulp-plumber'


const dirs = {
  src: 'assets',
  dest: 'public'
}

const sassPaths = {
  src: `${dirs.src}/sass/style.scss`,
  dest: `${dirs.dest}`
}

gulp.task('styles', () => {

  return gulp.src(sassPaths.src)
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(pumbler())
    .pipe(sass.sync())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(minifycss())
    .pipe(gulp.dest(sassPaths.dest))

})


gulp.task('scripts', () => {
    
    const customJs = gulp.src([`${dirs.src}/js/**/*.js`, `!${dirs.src}/js/avendor/**`])
      .pipe(concat('z.js'))
      .pipe(babel({
        ignore: 'gulpfile.babel.js',
        presets: ['es2015']
      }))
      .pipe(uglify())
      .pipe(gulp.dest(`${dirs.src}/js/avendor/`))

    const mergeJs = gulp.src([`${dirs.src}/js/avendor/**`])
          .pipe(concat('app.js'))
          .pipe(uglify())
          .pipe(gulp.dest(`${dirs.dest}`))
  
      return merge(customJs, mergeJs)

})


gulp.task('browser-sync', function () {
  
  var files = [
    'public/*.css',
    'public/*.js',
    './*.php',
    '*/*.php',
    './*.html',
    '*/*.html'
  ]

  browserSync.init(files, {
      server: {
          baseDir: "./"
      }
  })

})


gulp.task('watch', ['browser-sync'], () => {

  gulp.watch(`${dirs.src}/js/**/*.js`, ['scripts', ])
  gulp.watch(`${dirs.src}/sass/**/*.scss`, ['styles'])

})

gulp.task('default', ['styles', 'scripts', 'watch'])