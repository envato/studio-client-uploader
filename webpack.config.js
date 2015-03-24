var webpack = require('webpack');

module.exports = {
  cache: true,
  context : __dirname,
  entry: ['./src/index.jsx'],
  output: {
    path: __dirname + '/public/',
    libraryTarget: 'amd',
    filename: 'index.js'
  },
  externals: {
    "react": true,
    "object-assign": true,
    "flux": true,
    "eventemitter3": true,
    "node-uuid": true
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['src', 'node_modules']
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules|vendor/, loader: 'babel-loader' },
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};
