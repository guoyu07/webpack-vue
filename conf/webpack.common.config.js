const fs                = require('fs-extra');
const path              = require('path');
const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const {
  ROOT_PATH,
  APP_PATH,
  DIST_PATH,
  DOMAIN_MODULES,
}                       = require('./config');

const { plugins, entries }    = require('./webpack.plugins.config.js');

let moduleList = [];
DOMAIN_MODULES.forEach((elem) => {
  if ('' !== elem.path) {
    moduleList.push(elem.path);
  }
});

let aliasList = {};
aliasList = {
  vue   : 'vue/dist/vue.common.js',
  assets: path.join(ROOT_PATH, 'src/assets/'),
}

moduleList.forEach(function (elem) {
  const SPRITE_DIR = `${APP_PATH}/${elem}`;
  if (fs.existsSync(SPRITE_DIR) && fs.lstatSync(SPRITE_DIR).isDirectory()) {
    aliasList[`~${elem}/store`] = path.join(APP_PATH, `${elem}/store/`);
  }
});

const config = {
  entry : entries,
  output: {
    path: DIST_PATH,
    filename: '[name].[hash:8].js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.vue', '.js'],
    alias: aliasList,
    modules: [path.join(ROOT_PATH, 'node_modules')],
  },

  resolveLoader: {
    modules: [path.join(ROOT_PATH, 'node_modules')],
  },

  externals: {

  },

  cache  : true,
  module : {
    rules: [
      {
        test    : /\.(css|scss)$/,
        use     : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use     : [
            {
              loader: 'css-loader',
              options: {
                minimize: process.env.DEVELOP ? false : true,
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                includePaths: [
                  path.join(ROOT_PATH, 'src'),
                ]
              }
            },
          ],
        }),
        exclude   : /node_modules/,
        include   : APP_PATH,
      },
      {
        test      : /\.(png|jpg|gif)$/,
        use       : 'url-loader?limit=10000&name=[hash:8].[name].[ext]'
      },
      {
        test    : /\.(js|jsx)$/,
        use     : ['HappyPack/loader?id=js', 'eslint-loader'],
        exclude : /node_modules/,
        include : APP_PATH,
      },
      {
        test    : /\.jade$/,
        use     : ['jade-loader'],
        include : APP_PATH,
      },
      {
        test    : /\.vue$/,
        use     : ['vue-loader'],
        include : APP_PATH,
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVELOP__ : !!process.env.DEVELOP,
      __PRODUCT__ : !!process.env.PRODUCT,
      __UNITEST__ : !!process.env.UNITEST,
    }),
  ].concat(plugins)
};

module.exports = config;