const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const production = process.env.NODE_ENV === 'production'

module.exports = {
  entry: `${__dirname}/app/entry.js`,
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/build`
  },
  plugins: [
    new HTMLPlugin({
      template: `${__dirname}/app/index.html`
    }),
    new webpack.DefinePlugin({
      __API_URL__: JSON.stringify(process.env.API_URL),
      __DEBUG__: JSON.stringify(!production)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(jpg|jpeg|svg|bmp|tiff|gif|png)$/,
        loader: 'file-loader'
      }
    ]
  },
};
