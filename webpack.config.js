const webpack = require('webpack');

module.exports = {
  cache: true,
  context : __dirname,
  entry: {
    index: ["./src/index"],
    example: ["./src/example"]
  },
  output: {
    path: __dirname + '/public/',
    filename: "[name].js",
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['src', 'node_modules']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules|vendor/, loader: 'babel-loader' }
    ]
  }
};
