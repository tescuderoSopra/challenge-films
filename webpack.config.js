const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { createDefaultConfig } = require('@open-wc/building-webpack');

const config = createDefaultConfig({
  input: path.resolve(__dirname, './index.html'),
});

module.exports = ({ mode }) => merge(config, {
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'HTML Webpack Plugin',
      mode
    })
  ]
});