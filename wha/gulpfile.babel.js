'use strict'

import gulp from 'gulp'
import sass from 'gulp-sass'
import minifycss from 'gulp-minify-css'
import autoprefixer from 'gulp-autoprefixer'
import sassGlob from 'gulp-sass-glob'
import sourcemaps from 'gulp-sourcemaps'
import concat from 'gulp-concat'
import plumber from 'gulp-plumber'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import gutil from 'gulp-util'
import merge from 'merge-stream'


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
   // .pipe(pumbler())
    .pipe(sass.sync())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    //.pipe(minifycss())
    .pipe(gulp.dest(sassPaths.dest))

})


gulp.task('scripts', () => {

  const customJs = gulp.src([`${dirs.src}/js/**/*.js`, `!${dirs.src}/js/avendor/**`])
    .pipe(plumber(error => {
      gutil.log(error.message)
    }))
    .pipe(concat('z.js'))
    .pipe(babel({
      ignore: 'gulpfile.babel.js',
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(`${dirs.src}/js/avendor/`))

  const mergeJs = gulp.src([`${dirs.src}/js/avendor/**/*.js`])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(`${dirs.dest}`))

  return merge(customJs, mergeJs)

})


gulp.task('watch', () => {

  gulp.watch(`${dirs.src}/**/*.scss`, ['styles'])

})

gulp.task('default', ['styles', 'scripts', 'watch'])

