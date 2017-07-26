const _                   = require('lodash');
const fs                  = require('fs-extra');
const webpack             = require('webpack');
const HtmlWebpackPlugin   = require('html-webpack-plugin');
const CleanWebpackPlugin  = require('clean-webpack-plugin');
const ExtractTextPlugin   = require('extract-text-webpack-plugin');
const SpritesmithPlugin   = require('webpack-spritesmith');
const SpritesmithTemplate = require('spritesheet-templates');
const vueLoaderConfig     = require('./vue-loader.conf');

const {
  ROOT_PATH,
  APP_PATH,
  DIST_PATH,
  ASSETS_DIR,
  ASSETS_PATH,
  ROOT_COMMON,
  DOMAIN_MODULES,
} = require('../config/conf');


/**
 * 输出html模板文件
 */
const entries   = {};
let aliasList   = {};
let moduleList  = [];
let plugins     = [];

DOMAIN_MODULES.forEach((elem) => {
  if (elem.entries && _.isArray(elem.entries)) {
    moduleList = _.concat(moduleList, elem.entries);
  }
});

/**
 * 启用别名，方便模块引入
 */

aliasList = {
  'vue$'    : 'vue/dist/vue.esm.js',
  'assets'  : `${ASSETS_PATH}/`,
  '~common' : `${ROOT_COMMON}/`,
  '~appRoot': `${APP_PATH}/`,
};

/**
* 生成入口html文件
*/
// moduleList.forEach(function (elem) {
  const dir = `${APP_PATH}`;
  if (fs.statSync(dir).isDirectory()) {

    // 模块入口
    let bootstrapFile = `${dir}/index.js`;

    if (fs.existsSync(bootstrapFile)) {
      entries.index = bootstrapFile;
      if ('production' === process.env.NODE_ENV) {
        plugins.push(new HtmlWebpackPlugin({
          template      : `${APP_PATH}/index.html`,
          inject        : 'body',
          filename      : `${DIST_PATH}/index.html`,
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
          },
          chunksSortMode: 'dependency',
          // excludeChunks : array.without(moduleList, elem)
        }));
      }
      else {
        plugins.push(new HtmlWebpackPlugin({
          template      : `${APP_PATH}/index.html`,
          inject        : 'body',
          filename      : `${DIST_PATH}/index.html`,
          // excludeChunks : array.without(moduleList, elem)
        }));
      }
    }
  }

// });


/**
 * 生成项目雪碧图
 */
const SPRITE_DIR           = `${ASSETS_PATH}/sprites/images/`;
const SPRITE_TEMPLATE_FILE = `${ASSETS_PATH}/sprites/sprite.scss.template.handlebars`;

if (fs.existsSync(SPRITE_DIR) && fs.lstatSync(SPRITE_DIR).isDirectory() && fs.existsSync(SPRITE_TEMPLATE_FILE)) {
  let source = fs.readFileSync(SPRITE_TEMPLATE_FILE, 'utf8');
  SpritesmithTemplate.addHandlebarsTemplate('spriteScssTemplate', source);

  plugins.push(
    new SpritesmithPlugin({
      src: {
        cwd : SPRITE_DIR,
        glob: '**/*.{png,gif,jpg}',
      },
      target: {
        image: `${DIST_PATH}/assets/images/sprite.[hash:8].png`,
        css  : [
          [
            `${ASSETS_PATH}/styles/mixins/_sprite.scss`,
            {
              format: 'spriteScssTemplate',
            }
          ]
        ]
      },
      apiOptions: {
        cssImageRef: '/assets/images/sprite.[hash:8].png'
      },
      spritesmithOptions: {
        functions : true,
        padding   : 10,
      }
    })
  );
}


/**
 * 模块入口
 */
let projectDir = [];
let readDir = fs.readdirSync(APP_PATH);
readDir.forEach((name) => {
  let dir = `${APP_PATH}/${name}`;
  if (fs.statSync(dir).isDirectory()) {
    projectDir.push(name);
  }
});


module.exports = {
  entry: entries,
  output: {
    path: DIST_PATH,
    filename: '[name].[hash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.vue', '.js', '.json'],
    alias: aliasList,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test    : /\.(css|scss)$/,
        use     : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use     : [
            {
              loader: 'css-loader',
              options: {
                minimize: 'production' !== process.env.NODE_ENV ? false : true,
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
                  ROOT_PATH,
                ]
              }
            },
          ],
        }),
        include   : ROOT_PATH,
      },
      {
        test: /\.js$/,
        loader: ['babel-loader', 'eslint-loader'],
        exclude : /node_modules/,
        include : ROOT_PATH,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: `url-loader?limit=10000&name=${ASSETS_DIR}/images/[name].[hash:8].[ext]`,
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: `url-loader?limit=10000&name=${ASSETS_DIR}/fonts/[name].[hash:8].[ext]`,
      }
    ]
  },
  plugins: [

    /**
     * 清空dist目录
     */
    new CleanWebpackPlugin([
      DIST_PATH,
    ],
    {
      root      : ROOT_PATH,
      verbose   : true,
      dry       : false,
    }),

    new webpack.DefinePlugin({
      __PROJECTDIR__: JSON.stringify(projectDir)
    }),
  ].concat(plugins)
};
