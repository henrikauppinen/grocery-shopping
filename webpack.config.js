const path = require('path')

module.exports = {
  context: __dirname,
  entry: './js/index.js',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  devServer: {
    publicPath: '/public/',
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}
