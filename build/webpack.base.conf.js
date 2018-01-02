const vueConf = require('./vue-loader.conf');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  plugins: [
    new ProgressBarPlugin(),
  ],
  output: {
    filename: '[name].js',
    path: `${__dirname}/../dist`,
  },
  module: {
    rules: [
      {
        test: /\.graphql$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          // eslint-disable-next-line global-require
          formatter: require('eslint-friendly-formatter'),
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConf,
      },
    ],
  },
};
