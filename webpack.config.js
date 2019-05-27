const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
module.exports = {
  mode: 'development',
  optimization: {
    minimize: false
  },
  entry: { 
    main: ['babel-polyfill', './src/index.js'] 
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }      
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: "source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: './.env',
    }),
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
 
};