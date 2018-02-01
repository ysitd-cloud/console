const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const utils = require('./utils');
const base = require('./webpack.client.conf');

module.exports = merge.smart(base, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: true,
      extract: true,
    }),
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js',
  },
  resolve: {
    alias: {
      react$: 'react/umd/react.production.min.js',
      vue$: 'vue/dist/vue.esm.js',
      moment$: 'moment/min/moment-with-locales.min.js',
    },
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
        );
      },
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'],
    }),
    new AssetsWebpackPlugin({
      filename: 'assets.json',
      path: path.join(process.cwd(), 'dist'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
      sourceMap: true,
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
      },
    }),
    new VueSSRClientPlugin(),
  ],
});
