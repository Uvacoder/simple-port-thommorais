'use strict'

// general
import gulp from 'gulp'
import concat from 'gulp-concat'
import gutil from 'gulp-util'
import sourcemaps from 'gulp-sourcemaps'
import plumber from 'gulp-plumber'
import browserSync from 'browser-sync'

// sass
import sass from 'gulp-sass'
import sassGlob from 'gulp-sass-glob'
import autoprefixer from 'gulp-autoprefixer'
import minifycss from 'gulp-clean-css'

// js
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import merge from 'merge-stream'
import minify from 'gulp-minify'
import trim from 'gulp-trim'


// Delete Files
import del from 'del'

const reload = browserSync.reload

const dirs = {
  src: 'assets',
  dest: 'public'
}

const sassPaths = {
  src: `${dirs.src}/sass/style.scss`,
  dest: `${dirs.dest}`
}

const js = {
  src: `${dirs.src}/js`,
  classes: `${dirs.src}/js/classes`,
}

gulp.task('styles', () => {

  return gulp.src(sassPaths.src)
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(plumber( error => {
        gutil.log(error.message)
    }))
    .pipe(sass.sync())
    .pipe(autoprefixer())
    .pipe(minifycss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(sassPaths.dest))

})


gulp.task('scripts', () => {

  const customJs = gulp.src([`${js.src}/**/*.js`, `!${js.src}/avendor/**`])
    .pipe(concat('z.js'))
    // .pipe(babel({
    //   ignore: 'gulpfile.babel.js',
    //   presets: ['es2015']
    // }))
    .pipe(gulp.dest(`${js.src}/avendor/`))

  const mergeJs = gulp.src([`${dirs.src}/js/avendor/**/*.js`])
    .pipe(concat('app.js'))
    //.pipe(uglify())
      // .pipe(minify({
      //     ext:{
      //         src:'-debug.js',
      //         min:'.js'
      //     },
      //     ignoreFiles: ['.combo.js']
      // }))
      // .pipe(trim())
      .pipe(gulp.dest(`${dirs.dest}`))

  return merge(customJs, mergeJs)

})

gulp.task('delete', () => {
  return del(['**/*/.DS_Store', '.DS_Store'])
})

gulp.task('browser-sync', () => {

  const files = [
    'public/*.css',
    'public/*.js',
    './*.php',
    '*/*.php',
    './*.html',
    '*/*.html'
  ]

  browserSync.init(files, {

    notify: true,
    server: {
      baseDir: "./"
    }

  })

})

gulp.task('watch', ['browser-sync'], () =>{

  gulp.watch(`${dirs.src}/sass/**/*.scss`, ['styles'])
  gulp.watch([`${js.src}/**/*.js`, `!${js.src}/avendor/**`], ['scripts'])

})


gulp.task('default', ['styles', 'watch', 'delete', 'browser-sync'])
