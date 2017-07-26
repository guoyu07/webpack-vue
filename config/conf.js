const path = require('path');

const DLIENT_PORT     = 1989;
const DOMAIN_MODULES  = [
  {
    type      : 'cdn',
    domain    : 'cdn.m.eg.com',
  },
  {
    type      : 'proxy',
    proxy     : '127.0.0.1',
    proxyPort : DLIENT_PORT,
    entries   : ['index'],
    domain    : ['dev.m.eg.com'],
  },
];

function resolve (dir) {
  return dir ? path.join(__dirname, '..', dir) : path.join(__dirname, '../');
}

const SRC_DIR         = 'src';
const APP_DIR         = 'app';
const LOG_DIR         = 'logs';
const TEST_DIR        = 'test';
const HAPPYPACK_DIR   = '.happypack';
const WEBPACK_DIR     = '.webpack_cache';
const COMMON_DIR      = 'common';

const DIST_DIR        = 'dist';
const ASSETS_DIR      = 'assets';

const ROOT_PATH       = resolve();
const SRC_PATH        = resolve(`${SRC_DIR}`);
const APP_PATH        = resolve(`${SRC_DIR}/${APP_DIR}`);

const HAPPYPACK_PATH  = resolve(`${HAPPYPACK_DIR}`);
const WEBPACK_PATH    = resolve(`${WEBPACK_DIR}`);

const DIST_PATH       = resolve(`${DIST_DIR}`);
const ASSETS_PATH     = resolve(`${SRC_DIR}/${ASSETS_DIR}`);
const LOG_PATH        = resolve(`${LOG_DIR}`);

const ROOT_COMMON     = resolve(`${SRC_DIR}/${COMMON_DIR}`);

module.exports = {
  DLIENT_PORT,
  DOMAIN_MODULES,

  SRC_DIR,
  APP_DIR,
  TEST_DIR,
  HAPPYPACK_DIR,
  COMMON_DIR,
  DIST_DIR,
  ASSETS_DIR,

  ROOT_PATH,
  SRC_PATH,
  APP_PATH,
  HAPPYPACK_PATH,
  WEBPACK_PATH,
  DIST_PATH,
  ASSETS_PATH,
  LOG_PATH,
  ROOT_COMMON,
};