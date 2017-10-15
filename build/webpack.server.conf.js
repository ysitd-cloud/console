const merge = require('webpack-merge');
const base = require('./webpack.base.conf');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = merge.smart(base, {
  entry: './src/frontend/serverEntry.js',
  plugins: [
    new VueSSRServerPlugin(),
  ],
  target: 'node',
  output: {
    libraryTarget: 'commonjs2',
  },
  devtool: 'source-map',
  externals: nodeExternals({
    whitelist: /\.(css|vue|styl)$/,
  }),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                ['env', {
                  targets: {
                    node: 'current',
                  },
                }],
                'stage-2',
              ],
              plugins: [
                'syntax-dynamic-import',
                'syntax-object-rest-spread',
              ],
            },
          },
        ],
      },
    ],
  },
});
