const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    publicPath: '/Tet/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new HtmlWebpackPlugin({
        title: 'TEt', 
        template: 'src/index.html',
        favicon: "src/favicon.ico" }) ,
    new WebpackPwaManifest({
      "name": "TEt",
      "short_name": "TEt",
      "description": "p019's tetris clone",
      "icons": [
        {
          src: path.resolve('src/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512]
        },
      ],
      "start_url": "index.html",
      "display": "standalone",
      "theme_color": "#292929",
      "orientation":"portrait",
      "background_color": "#292929"
  })
   ],

  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
  },
};