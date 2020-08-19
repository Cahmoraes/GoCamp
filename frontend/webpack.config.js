const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.(jpe?g|svg|png)$/i,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  }
}