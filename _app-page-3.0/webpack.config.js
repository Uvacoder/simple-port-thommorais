const webpack = require('webpack')
const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const globImporter = require('node-sass-glob-importer')
const { Gaze } = require('gaze')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
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
    use: [{
      loader: 'css-loader',
      options: {
        url: false,
        sourceMap: true,
        minimize: true
      }
    }, {
      loader: 'postcss-loader',
      options: { sourceMap: true }
    }, {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
        importer: globImporter()
      }
    }]
  })
}

// browser sync 
const browserSync = new BrowserSyncPlugin({
  host: 'localhost',
  files: ["**/*.html", "./dist/**/*.js"],
  server: {
    baseDir: ['./']
  }
}, { reload: false })

// 
const uglifyJs = new UglifyJsPlugin({
  exclude: /\/style/,
  uglifyOptions: {
    ie8: false,
    ecma: 8
  }
})

// this just inject the css on the page and prevent webpack from reload all the browser
const gaze = new Gaze("./dist/*.css")
gaze.on('all', () => browserSync.browserSync.reload("./dist/*.css"))

// webpack configuration
module.exports = {
  entry: {
    script: path.resolve(__dirname, 'src/js/index.js'),
    style: path.resolve(__dirname, 'src/sass/style.scss'),
    // lightgallery: path.resolve(__dirname, 'src/sass/light-gallery.scss'),
    aboveTheFold: path.resolve(__dirname, 'src/sass/above-the-fold.scss')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: path.resolve(__dirname, './dist/'),
    chunkFilename: '[name].js'
  },
  module: {
    loaders: [styles, scripts]
  },
  plugins: [
    //   new webpack.DefinePlugin({
    //     'process.env.NODE_ENV': '"production"',
    //   }),
    //  new webpack.optimize.ModuleConcatenationPlugin(),
    // uglifyJs,
    extractSass,
    browserSync,
    new BundleAnalyzerPlugin()
  ],
  
  watch: true,
  devtool: "source-map"
}
