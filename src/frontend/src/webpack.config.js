const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: './app.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  performance: {
    hints: false
  }
  ,

  devtool: 'source-maps',
  module: {
    rules: [
      {test: /\.(pdf|jpg|png|gif|svg|ico|mp4)$/,
        use: [
               {
                   loader: 'file-loader',
                   options: {
                       name: '[path][name]-[hash:8].[ext]'
                   },
               },
           ]},
      
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.s(a|c)ss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] }
    ]


  },
  devServer: {
    contentBase: path.resolve('src'),
    hot: true,
    open: true,
    port: 8000,
    historyApiFallback: true,
    watchContentBase: true
  },
  plugins: [
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      favicon: "../src/assets/favicon.ico",
      template: './index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    
  ]
}
