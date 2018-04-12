const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const outputPath = path.resolve(__dirname, '../IdentityServer4React/wwwroot')

console.log(outputPath)

module.exports = {
  entry: './src/index.js',
  output: {
    path: outputPath,
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      inject: false,
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
}
