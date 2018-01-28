const merge = require('webpack-merge');
const base = require('./webpack.base.conf');

module.exports = merge.smart(base, {
  entry: {
    app: ['./src/frontend/clientEntry.js'],
    elements: ['./src/frontend/elements.js'],
  },
  output: {
    publicPath: '/',
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
