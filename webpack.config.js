const path = require('path');
const webpack = require('webpack');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

const env = process.env.WEBPACK_BUILD || process.env.NODE_ENV || 'development';

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const outputFilename = 'video-react';
const minimizer = env === 'production' ? [new TerserPlugin()] : [];
const outputFile =
  env === 'production'
    ? `${outputFilename.toLowerCase()}.min.js`
    : `${outputFilename.toLowerCase()}.js`;

const paths = [
  '/',
  '/components/',
  '/components/player/',
  '/components/shortcut/',
  '/components/big-play-button/',
  '/components/poster-image/',
  '/components/loading-spinner/',
  '/components/control-bar/',
  '/components/play-toggle/',
  '/components/forward-control/',
  '/components/replay-control/',
  '/components/volume-menu-button/',
  '/components/playback-rate-menu-button/',
  '/components/captioned-video',
  '/customize/',
  '/customize/enable-disable-components/',
  '/customize/customize-source/',
  '/customize/customize-component/',
  '/404.html',
];

const config = {
  mode: env,
  devtool: 'source-map',
  devServer: {
    allowedHosts: 'all',
    static: {
      directory: path.join(__dirname, 'build'),
    },
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 9000,
  },
  entry: ['@babel/polyfill', './docs/lib/app'],
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve('./build'),
    libraryTarget: 'umd',
    library: 'VideoReact',
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: true }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './docs/static', to: 'assets' },
        { from: './dist', to: 'assets' },
      ]
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    new StaticSiteGeneratorPlugin({
      paths,
      globals: {
        window: {},
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
      chunkFilename: 'assets/[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(json)$/,
        use: ['json-loader?cacheDirectory'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: 'assets',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: 'assets',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.woff(2)?(\?[a-z0-9=&.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|svg)(\?[a-z0-9=&.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 30000,
              mimetype: '[name]-[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      'bootstrap-scss': path.join(
        __dirname,
        'node_modules/bootstrap/scss/bootstrap.scss'
      ),
      'video-react-scss': path.resolve('./styles/scss/video-react.scss'),
      'video-react': path.resolve('./src'),
    },
    modules: [path.resolve('./src'), 'node_modules'],
  },
  optimization: {
    noEmitOnErrors: true,
    minimizer,
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};

module.exports = config;
