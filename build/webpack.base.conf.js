const path = require('path')
const fs = require('fs')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}

const PAGES_DIR = PATHS.src
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter(fileName => fileName.endsWith('.html'))

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src,
  },
  output: {
    filename: "[name].js",
    path: PATHS.dist,
    publicPath: '/'
  },
  plugins: [
    ...PAGES.map(page => 
      new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename:`./pages/${page}`,
      inject: false
    })),
    new CopyWebpackPlugin ({
      patterns: [
        {from: `${PATHS.src}/assets/img`, to: `${PATHS.assets}img`},
        {from: `${PATHS.src}/assets/fonts`, to: `${PATHS.assets}fonts`},
        {from: `${PATHS.src}/static`, to: ``},
      ]
    })
  ]
}