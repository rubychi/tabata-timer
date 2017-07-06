const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
require('babel-polyfill');

module.exports = {
  entry: ['babel-polyfill', './index.jsx'],
  output: {
    path: __dirname,
    filename: '[name].js',
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
              sourceMap: true,
            },
          },
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
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
              sourceMap: true,
              modules: true,
              importLoaders: '1',
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
            },
          },
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
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
    new HtmlWebpackPlugin({
      template: './index-template.html',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        debug: true,
        postcss: [
          autoprefixer,
        ],
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
  devServer: {
    // host: '0.0.0.0',
    inline: true,
    port: 8080,
  },
  devtool: 'source-map',
};
