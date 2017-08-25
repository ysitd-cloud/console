const merge = require('webpack-merge');
const base = require('./webpack.base.conf');

module.exports = merge.smart(base, {
  entry: {
    app: ['./src/view/clientEntry.js'],
  },
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {
                  targets: {
                    browsers: ['last 2 Firefox version', 'last 2 Chrome versions'],
                    uglify: true,
                  },
                  modules: false,
                }],
              ],
              plugins: [
                'syntax-dynamic-import',
                'transform-runtime',
              ],
            },
          },
        ],
      },
    ],
  },
});
