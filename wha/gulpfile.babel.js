'use strict'

import gulp from 'gulp'
import sass from 'gulp-sass'
import minifycss from 'gulp-minify-css'
import autoprefixer from 'gulp-autoprefixer'
import sassGlob from 'gulp-sass-glob'
import sourcemaps from 'gulp-sourcemaps'
import pumbler from 'gulp-plumber'


const dirs = {
  src: './',
  dest: 'public'
}

const sassPaths = {
  src: `${dirs.src}/style.scss`,
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
   // .pipe(minifycss())
    .pipe(gulp.dest(sassPaths.dest))

})


gulp.task('watch', () => {

  gulp.watch(`${dirs.src}/**/*.scss`, ['styles'])

})

gulp.task('default', ['styles', 'watch'])