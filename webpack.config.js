const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')

dotenv.load()

const production = process.env.NODE_ENV === 'production'

let devEnvs = {
  __API_URL__: JSON.stringify(process.env.API_URL),
  __CLIENT_ID__: JSON.stringify(process.env.CLIENT_ID),
  __DEBUG__: JSON.stringify(!production)
}

let productionEnvs = {
  __API_URL__: JSON.stringify(process.env.API_URL_PRODUCTION),
  __DEBUG__: JSON.stringify(!production)
}

let defineEnvs = production ? productionEnvs : devEnvs

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
    new webpack.DefinePlugin(defineEnvs)
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
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
  }
};
