const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const baseConfig = require('./webpack.base.config');

const CleanPluginConfig = new CleanWebpackPlugin();


module.exports = merge(baseConfig, {
  entry: './src/main.js',
  mode: 'production',
  optimization: {
    usedExports: true,
      minimizer: [
          new TerserPlugin({
              extractComments: {
                  condition: /^\**!|@preserve|@license|@cc_on/i,
              },
              sourceMap: true, // Must be set to true if using source-maps in production
              terserOptions: {
                  output: {
                      comments: false,
                  },
                  compress: {
                      drop_console: true
                  }
              }
          })
      ]
  },
  output: {
    library: 'ngReactState',
    filename: 'ng-react-state.min.js',
    chunkFilename: '[name].[id].chunk.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
  libraryTarget: 'umd',
  umdNamedDefine: true
  },
  externals: {
    angular: 'angular', // Case matters here
    react: 'React', // Case matters here
    'react-dom': 'ReactDOM' // Case matters here
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 300000,
    maxAssetSize: 300000
  },
    devtool: false,
    plugins: [CleanPluginConfig]
});
