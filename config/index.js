
const {
  DLIENT_PORT,
  DIST_PATH,
  ASSETS_DIR
} = require('./conf');

module.exports = {
  build: {
    env: require('./prod.env'),
    assetsRoot: DIST_PATH,
    assetsSubDirectory: ASSETS_DIR,
    assetsPublicPath: '/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: DLIENT_PORT,
    autoOpenBrowser: true,
    assetsSubDirectory: ASSETS_DIR,
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false
  }
};