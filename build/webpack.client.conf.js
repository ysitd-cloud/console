const merge = require('webpack-merge');
const base = require('./webpack.base.conf');

module.exports = merge.smart(base, {
  entry: {
    app: ['./src/frontend/clientEntry.js'],
  },
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.graphql$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
});
