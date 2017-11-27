const webpack = require('webpack')
const path = require('path')

const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const globImporter = require('node-sass-glob-importer')


// JS
const scripts = {
  test: /\.js$/,
  loader: 'babel-loader',
  query: {
    presets: ['es2015']
  }
}

// CSS
const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  allChunks: true
})

const styles = {
  test: /\.scss$/,
  use: extractSass.extract({
    use: [
      {
        loader: "css-loader"
      }, {
        loader: "postcss-loader"
      }, {
        loader: "sass-loader",
        options: {
          importer: globImporter()
        }
      }
    ]
  })
}

// development
const browserSync = new BrowserSyncPlugin({
  host: 'localhost',
  files: ["**/*.html", "./**/*.js"],
  server: {
    baseDir: ['./']
  }
}, {reload: true})

// webpack configuration
module.exports = {
  entry: {
    app: [
     path.resolve(__dirname, 'assets/js/home.js'),
     path.resolve(__dirname, 'assets/sass/style.scss')
   ],
   solution: path.resolve(__dirname, 'assets/js/solution.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [styles, scripts]
  },
  plugins: [
    extractSass,
    browserSync
  ],
  watch: true,
  devtool: "source-map"
}
