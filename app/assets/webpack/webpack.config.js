/* eslint comma-dangle: ["error",
  {"functions": "never", "arrays": "only-multiline", "objects":
"only-multiline"} ] */

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

let DashboardPlugin;

if (devBuild) {
  DashboardPlugin = require('webpack-dashboard/plugin');
}

const config = {
  entry: {
    vendor: [
      'es5-shim/es5-shim',
      'es5-shim/es5-sham',
      'babel-polyfill',
      'jquery-ujs',
      'bootstrap',
      'jquery-form/jquery.form',
      'orgchart',
    ],
    app: [
      './src/app',
    ]
  },

  output: {
    filename: '[name]-bundle.js',
    path: path.join(__dirname, 'dist'),
  },

  resolve: {
    // extensions: ['', '.js', '.jsx'],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      components: path.resolve('./src/components')
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new ExtractTextPlugin({
      filename: 'components.css',
      disable: false,
      allChunks: true
    })
  ],
  module: {
    rules: [{
      test: require.resolve('jquery'),
      loader: 'expose-loader?$',
    }, {
      test: require.resolve('jquery'),
      loader: 'expose-loader?jQuery',
    }, {
      test: require.resolve('jquery-ujs'),
      loader: 'imports-loader?jQuery=jquery',
    }, {
      test: require.resolve('bootstrap'),
      loader: 'imports-loader?jQuery=jquery&Tether=tether',
    }, {
      test: require.resolve('react'),
      loader: 'imports-loader?shim=es5-shim/es5-shim&sham=es5-shim/es5-sham',
    }, {
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /(node_modules|bower_components)/,
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader?camelCase!sass-loader?' +
                '&includePaths[]=' + path.resolve(__dirname, '../stylesheets')
      }),
    }],
  },
};

module.exports = config;

if (devBuild) {
  config.plugins.push(
    new DashboardPlugin()
  );
  console.log('=> 🛠  Webpack dev build for Rails'); // eslint-disable-line no-console
  module.exports.devtool = 'eval-source-map';
} else {
  console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}
