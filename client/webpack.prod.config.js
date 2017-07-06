const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
require('babel-polyfill');

const VENDOR_LIBS = [
  'lodash',
  'mobile-detect',
  'normalize.css',
  'prop-types',
  'react',
  'react-bootstrap',
  'react-dom',
  'react-input-range',
  'react-redux',
  'react-sound',
  'react-tappable',
  'redux',
  'redux-thunk',
  'reselect',
  'uuid',
];

module.exports = {
  entry: {
    bundle: ['babel-polyfill', './index.jsx'],
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }],
              'stage-0',
              'react',
            ],
          },
        },
        test: /\.jsx?$/,
        exclude: /node_modules/,
      },
      {
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
        test: /\.css$/,
      },
      {
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: true,
              importLoaders: '1',
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
            },
          },
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              // Provide path to the file with resources
              // resources: './Base.scss',
              // Or array of paths (order does matter!)
              resources: ['./baseStyles/BaseVars.scss', './baseStyles/BaseMixin.scss', './baseStyles/Base.scss', './baseStyles/Global.scss'],
            },
          },
        ],
        test: /\.scss$/,
      },
      {
        // TODO
        use: 'file-loader?name=/assets/images/[name].[ext]',
        test: /\.(png|jpg)$/,
      },
    ],
  },
  plugins: [
    // Solve the issue of double importing, say like, react and redux libraries from bundle.js and vendor.js
    // (the parameter "vendor" tells webpack to only include the common chunks inside the vendor.js)
    // (the parameter "manifest" gives webpack a bit insight of the detail for preventing CommonsChunkPlugin running each time when bundle.js updates alone (while vendor.js itself stays the same))
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: './index-template.html',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        debug: false,
        postcss: [
          autoprefixer,
        ],
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
};
