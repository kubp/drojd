var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
   // 'webpack-dev-server/client?http://localhost:8080',
    //'webpack/hot/only-dev-server',
    __dirname+'/src/entry',
  ],
  output: {
    path: __dirname + '/../www/assets',
    filename: 'min.js',
    //publicPath: 'http://localhost:8080/js/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel-loader?experimental'], exclude: /node_modules/ }
    ]
  }
}
