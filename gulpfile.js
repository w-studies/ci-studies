import gulp from 'gulp'
import babel from 'gulp-babel'
import bs from 'browser-sync'
import csso from 'gulp-csso'

import sourcemaps from 'gulp-sourcemaps'
import rename from 'gulp-rename'
import path from 'path'
import uglify from 'gulp-uglify'
import gulp_uglify_es from 'gulp-uglify-es'

import gulpSass from 'gulp-sass'
import dartSass from 'sass'

const sass = gulpSass(dartSass)

const browserSync = bs.create()
const reload = browserSync.reload

const uglify_es = gulp_uglify_es.default

// LOCAL URL
const local_url = 'localhost/studies/ci/ci4.2.11/public_html/'

// ASSETS FOLDER
const _assetsFolder = './public_html/assets/'
const _cssFolder = _assetsFolder + 'css/'
const _jsFolder = _assetsFolder + 'js/',
  _jsSources = './sources/js/'

// iniciar sincronização do browser
function startBrowserSync() {
  browserSync.init({
    proxy: local_url,
    baseDir: './ci/',
    open: true,
    notify: false,
    browser: 'chrome'
  })
}

/**
 * SASS
 * @returns {*}
 */
const gulpSASS = (sources, destiny) => {
  // define onde os maps serão salvos
  let mapsDir = destiny ? '../../maps/' : '../maps/'

  return (
    gulp
      .src(sources)
      // inicia a criação do mapa
      .pipe(sourcemaps.init({ loadMaps: true }))
      // executa o sass compiler
      .pipe(sass().on('error', sass.logError))

      // renomeia
      .pipe(
        rename(function (file) {
          file.dirname = ''
          file.basename = path.parse(sources).name
          file.extname = '.css'
        })
      )

      // salva o mapa
      .pipe(sourcemaps.write(mapsDir))

      // salva o arquivo css
      .pipe(
        gulp.dest(_cssFolder + destiny, {
          overwrite: true
        })
      )

      // dispara o browserSync
      .pipe(browserSync.stream())
  )
}

// individual js files
function js_files() {
  return (
    gulp
      .src('./sources/js/files/**/*.js')
      .pipe(uglify_es())
      .pipe(
        babel({
          minified: true,
          comments: false,
          presets: ['@babel/preset-env']
        })
      )
      .pipe(sourcemaps.init())
      .pipe(uglify())
      // salva o mapa
      .pipe(sourcemaps.write('../maps'))
      .pipe(gulp.dest(_jsFolder))
      // dispara o browserSync
      .pipe(browserSync.stream())
  )
}

/**
 * ADMIN.JS
 * @returns {*|void}
 */
function admin_file() {
  return (
    gulp
      .src('./sources/js/files/admin.js')
      .pipe(uglify_es())
      .pipe(
        babel({
          minified: true,
          comments: false,
          presets: ['@babel/preset-env']
        })
      )
      .pipe(sourcemaps.init())
      .pipe(uglify())
      // salva o mapa
      .pipe(sourcemaps.write('../maps'))
      .pipe(gulp.dest(_jsFolder))
      // dispara o browserSync
      .pipe(browserSync.stream())
  )
}

/**
 * GULP JS
 * @param sources
 * @param destiny
 * @returns {*|void}
 */
const gulpJS = (sources, destiny) => {
  // define onde os maps serão salvos
  let mapsDir = destiny ? '../../maps/' : '../maps/'

  return (
    gulp
      .src(sources)
      .pipe(
        babel({
          comments: false,
          presets: ['@babel/preset-env']
        })
      )
      // salva o mapa
      .pipe(sourcemaps.write(mapsDir))
      .pipe(
        uglify({
          compress: {
            drop_console: true
          }
        })
      )
      .pipe(gulp.dest(_jsFolder))
      // dispara o browserSync
      .pipe(browserSync.stream())
  )
}

// watch all
function watch_all() {
  //run once
  // js_files();

  // individual js files watch
  // gulp.watch('./sources/js/files/**/*.js', js_files);
  gulp.watch('./sources/js/files/admin.js', admin_file)

  // const AjaxSearchDatatables = gulp.watch([
  //    _jsSources + 'files/ajax-search-datatables.js'
  // ]);

  const js_main = gulp.watch([_jsSources + 'files/main.js'])

  // watch .scss files
  const layoutCSS = gulp.watch(['./sources/scss/layout.scss'])

  // layoutCSS STYLE
  layoutCSS.on('change', function (path) {
    console.log(`File ${path} was changed`)
    gulpSASS('./sources/scss/layout.scss', '')
  })

  // JS MAIN
  js_main.on('change', function (path) {
    console.log(`File ${path} was changed`)
    gulpJS('./' + path, '')
  })

  // RELOAD BROWSER
  // watch .php files
  gulp.watch(['./ci/app/**/*.php']).on('change', browserSync.reload)
}

function noMaps(done) {
  gulp
    .src([
      './sources/js/files/main.js',
      './sources/js/files/sic-user.js',
      './sources/js/files/sic-cadastro.js',
      './sources/js/files/admin.js',
      _jsSources + 'files/solicitacoes',
      _jsSources + 'files/ajax-search-datatables.js'
    ])
    .pipe(
      babel({
        comments: false,
        presets: ['@babel/preset-env']
      })
    )
    .pipe(
      uglify({
        compress: {
          drop_console: true
        }
      })
    )
    .pipe(gulp.dest(_jsFolder))

  done()
}

// gulp default
gulp.task('default', gulp.parallel([startBrowserSync, watch_all]))

// gulp nomaps
gulp.task('nomaps', noMaps)
